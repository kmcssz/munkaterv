import { Component, Inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ReplaySubject, Subject } from 'rxjs'
import { CsoportService } from 'src/app/services/csoport.service'
import { formatHungarianDate, formatHungarianTime, minutesToMillis } from 'src/app/date-adaptor'
import { FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { Csapat, Szemszog } from 'src/app/models/csapat'
import { createTerv, FoglalkozasType, Terv } from 'src/app/models/foglalkozas'

@Component({
    selector: 'app-munkaterv',
    templateUrl: './munkaterv.component.html',
    styleUrls: ['./munkaterv.component.scss'],
    providers: [
        { provide: SZEMSZOG, useFactory: () => new ReplaySubject<Szemszog>(1) },
    ],
})
export class MunkatervComponent {

    csapat!: Csapat
    start!: Date
    csapatTerv!: Terv

    formatHungarianDate = formatHungarianDate
    formatHungarianTime = formatHungarianTime

    constructor(
        private route: ActivatedRoute,
        private fogSor: FoglalkozasService,
        private csopSor: CsoportService,
        @Inject(SZEMSZOG) private szemszog$: Subject<Szemszog>,
    ) {
        const name = this.route.snapshot.paramMap.get('name')!
        this.csapat = this.csopSor.getCsoport(name) as Csapat
        this.changeSzemszogToCsapat()

        // TODO: Get munkaterv from DB
        this.start = new Date(parseInt(this.route.snapshot.paramMap.get('start')!)),
        this.csapatTerv = createTerv(FoglalkozasType.CsapatTerv, this.csapat.name)
        this.fogSor.putFoglalkozas(this.csapatTerv)
    }

    changeSzemszogToCsapat() {
        this.szemszog$.next(new Szemszog(this.csapat, this.csapat))
    }

    computeOszoljTime(): string {
        return formatHungarianTime(
            new Date(this.start.getTime() + this.fogSor.computeConsumedDuration(this.csapatTerv) * minutesToMillis)
        )
    }
}
