import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { filter, map, mergeMap, Observable } from 'rxjs'
import { formatHungarianFullDate, formatHungarianTime, minutesToMillis } from 'src/app/date-adaptor'
import { Csapat } from 'src/app/models/csapat'
import { Foglalkozas, FoglalkozasType, Terv } from 'src/app/models/foglalkozas'
import { Layout, Theme } from 'src/app/models/state'
import { CsoportService } from 'src/app/services/csoport.service'
import { computeConsumedDuration, FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { StateService } from 'src/app/services/state.service'
import { first } from 'src/app/utils'

@Component({
    selector: 'app-munkaterv',
    templateUrl: './munkaterv.component.html',
    styleUrls: ['./munkaterv.component.scss'],
})
export class MunkatervComponent {

    Layout = Layout
    Theme = Theme

    csapat: Csapat
    start: Date
    csapatTerv$: Observable<Terv>
    children$: Observable<Foglalkozas[]>

    formatHungarianDate = formatHungarianFullDate
    formatHungarianTime = formatHungarianTime

    constructor(
        route: ActivatedRoute,
        private readonly fogSor: FoglalkozasService,
        csopSor: CsoportService,
        public state: StateService,
    ) {
        this.start = new Date(parseInt(route.snapshot.paramMap.get('start')!))

        const csapatName = route.snapshot.paramMap.get('name')!
        this.csapat = csopSor.getCsoport(csapatName) as Csapat
        state.restoreSavedSzemszog(this.csapat)

        this.fogSor.initilize(csapatName, this.start.getTime())

        this.csapatTerv$ = this.fogSor.getByType(FoglalkozasType.CsapatTerv).pipe(
            filter(fogak => fogak.length > 0),
            map(fogak => first(fogak) as Terv),
        )
        this.children$ = this.csapatTerv$.pipe(
            mergeMap(csapatTerv => this.fogSor.filterChildren(csapatTerv)),
        )
    }

    computeOszoljTime(children: Foglalkozas[]): string {
        return formatHungarianTime(
            new Date(this.start.getTime() + computeConsumedDuration(children) * minutesToMillis)
        )
    }
}
