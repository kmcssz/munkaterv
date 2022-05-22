import { Component, Inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ReplaySubject, Subject } from 'rxjs'
import { formatHungarianDate, formatHungarianTime, minutesToMillis } from 'src/app/date-adaptor'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { CSAPATOK } from 'src/app/models/beosztas'
import { Csapat, Szemszog } from 'src/app/models/csapat'
import { CsapatTerv, Foglalkozas, Munkaterv } from 'src/app/models/foglalkozas'

@Component({
    selector: 'app-munkaterv',
    templateUrl: './munkaterv.component.html',
    styleUrls: ['./munkaterv.component.scss'],
    providers: [
        {
            provide: SZEMSZOG,
            useFactory: () => new ReplaySubject<Szemszog>(1)
        },
    ],
})
export class MunkatervComponent {

    csapat!: Csapat
    munkaterv!: Munkaterv

    formatHungarianDate = formatHungarianDate
    formatHungarianTime = formatHungarianTime

    constructor(
        private route: ActivatedRoute,
        @Inject(SZEMSZOG) private szemszog$: Subject<Szemszog>,
    ) {
        const name = this.route.snapshot.paramMap.get('name')!
        this.csapat = CSAPATOK.find(cs => cs.name === name)!
        this.changeSzemszogToCsapat()

        // TODO: Get munkaterv from DB
        this.munkaterv = new Munkaterv(
            new Date(parseInt(this.route.snapshot.paramMap.get('start')!)),
            new CsapatTerv(),
        )
    }

    changeSzemszogToCsapat() {
        this.szemszog$.next(new Szemszog(this.csapat))
    }

    computeStartTime(foglalkozas: Foglalkozas): Date {
        let timeMillis = this.munkaterv.start.getTime()
        const foglalkozasIndex = this.munkaterv.csapatTerv.foglalkozasok.findIndex(f => f === foglalkozas)
        for (let i = 0; i < foglalkozasIndex; ++i) {
            timeMillis += this.munkaterv.csapatTerv.foglalkozasok[i].duration * minutesToMillis
        }
        return new Date(timeMillis)
    }

    computeEndTime(foglalkozas: Foglalkozas): string {
        return formatHungarianTime(new Date(this.computeStartTime(foglalkozas).getTime() + foglalkozas.duration * minutesToMillis))
    }

    computeOszoljTime(): string {
        if (this.munkaterv.csapatTerv.foglalkozasok.length === 0) {
            return formatHungarianTime(this.munkaterv.start)
        }

        return this.computeEndTime(this.munkaterv.csapatTerv.foglalkozasok[this.munkaterv.csapatTerv.foglalkozasok.length - 1])
    }
}
