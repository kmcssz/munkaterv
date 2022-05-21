import { Component, Inject, InjectionToken, Input, OnInit } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { CsapatFoglalkozas, Foglalkozas, Munkaterv, OrsiFoglalkozas, RajFoglalkozas, RajTerv } from '../../models/foglalkozas'
import { ActivatedRoute } from '@angular/router'
import { Csapat, Rang } from '../../models/csapat'
import { CSAPATOK } from '../../models/beosztas'
import { formatHungarianDate, formatHungarianTime } from '../../date-adaptor'
import { BehaviorSubject, map, Observable } from 'rxjs'
import { RANG } from '../../injection-tokens'

@Component({
    selector: 'app-csapat-terv',
    templateUrl: './csapat-terv.component.html',
    styleUrls: ['./csapat-terv.component.scss'],
    providers: [
        {
            provide: RANG,
            useFactory: () => new BehaviorSubject<Rang>(Rang.CserkeszTiszt)
        },
    ],
})
export class CsapatTervComponent implements OnInit {

    csapat!: Csapat
    munkaterv!: Munkaterv

    editable$: Observable<boolean>

    Rang = Rang
    formatHungarianDate = formatHungarianDate
    formatHungarianTime = formatHungarianTime

    constructor(
        private route: ActivatedRoute,
        @Inject(RANG) public rang$: BehaviorSubject<Rang>,
    ) {
        this.editable$ = rang$.pipe(
            map(rang => rang === Rang.CserkeszTiszt),
        )
    }

    ngOnInit(): void {
        const name = this.route.snapshot.paramMap.get('name')!
        this.csapat = CSAPATOK.find(cs => cs.name === name)!
        const start = this.route.snapshot.paramMap.get('start')!

        // Get this from DB
        this.munkaterv = new Munkaterv(new Date(parseInt(start)))
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.munkaterv.foglalkozasok, event.previousIndex, event.currentIndex)
    }

    changeRang(rang: Rang) {
        this.rang$.next(rang)
    }

    addCsapatFoglalkozas() {
        this.munkaterv.foglalkozasok.push(new CsapatFoglalkozas())
    }

    addRajFoglalkozas() {
        this.munkaterv.foglalkozasok.push(new RajTerv())
    }

    computeTime(foglalkozas: Foglalkozas): string {
        const minutesToMillis = 60 * 1000
        let timeMillis = this.munkaterv.start.getTime()
        const foglalkozasIndex = this.munkaterv.foglalkozasok.findIndex(f => f === foglalkozas)
        for (let i = 0; i <= foglalkozasIndex; ++i) {
            timeMillis += this.munkaterv.foglalkozasok[i].duration * minutesToMillis
        }
        return formatHungarianTime(new Date(timeMillis))
    }
}
