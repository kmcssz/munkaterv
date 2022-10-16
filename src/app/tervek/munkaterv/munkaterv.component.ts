import { Component, Inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { BehaviorSubject, filter, map, mergeMap, Observable, ReplaySubject, Subject } from 'rxjs'
import { CsoportService } from 'src/app/services/csoport.service'
import { formatHungarianFullDate, formatHungarianTime, minutesToMillis } from 'src/app/date-adaptor'
import { computeConsumedDuration, FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { Csapat, Layout, Szemszog } from 'src/app/models/csapat'
import { Foglalkozas, FoglalkozasType, Terv } from 'src/app/models/foglalkozas'
import { first } from 'src/app/utils'

@Component({
    selector: 'app-munkaterv',
    templateUrl: './munkaterv.component.html',
    styleUrls: ['./munkaterv.component.scss'],
    providers: [
        { provide: SZEMSZOG, useFactory: () => new BehaviorSubject<Szemszog|undefined>(undefined) },
    ],
})
export class MunkatervComponent {

    Layout = Layout

    csapat!: Csapat
    start!: Date
    csapatTerv$: Observable<Terv>
    children$: Observable<Foglalkozas[]>
    layout$: Observable<Layout>

    formatHungarianDate = formatHungarianFullDate
    formatHungarianTime = formatHungarianTime

    constructor(
        route: ActivatedRoute,
        private readonly fogSor: FoglalkozasService,
        csopSor: CsoportService,
        @Inject(SZEMSZOG) public szemszog$: Subject<Szemszog>,
    ) {
        this.layout$ = this.szemszog$.pipe(map(szemszog => szemszog.layout))

        this.start = new Date(parseInt(route.snapshot.paramMap.get('start')!))

        const csapatName = route.snapshot.paramMap.get('name')!
        this.csapat = csopSor.getCsoport(csapatName) as Csapat

        this.szemszog$.next(new Szemszog(
            this.csapat,
            this.csapat,
            window.innerWidth < 1200 ? Layout.Mobile : Layout.Desktop,
        ))

        this.fogSor.initilize(csapatName, this.start.getTime())

        this.csapatTerv$ = this.fogSor.getByType(FoglalkozasType.CsapatTerv).pipe(
            filter(fogak => fogak.length > 0),
            map(fogak => first(fogak) as Terv),
        )
        this.children$ = this.csapatTerv$.pipe(
            mergeMap(csapatTerv => this.fogSor.filterChildren(csapatTerv)),
        )
    }

    printLayout(szemszog: Szemszog) {
        this.szemszog$.next( new Szemszog(
            szemszog.csapat,
            szemszog.csoport,
            szemszog.layout == Layout.Desktop ? Layout.Mobile : Layout.Desktop,
        ))
    }

    changeSzemszogToCsapat(szemszog: Szemszog) {
        this.szemszog$.next(new Szemszog(
            this.csapat,
            this.csapat,
            szemszog.layout,
        ))
    }

    computeOszoljTime(children: Foglalkozas[]): string {
        return formatHungarianTime(
            new Date(this.start.getTime() + computeConsumedDuration(children) * minutesToMillis)
        )
    }
}
