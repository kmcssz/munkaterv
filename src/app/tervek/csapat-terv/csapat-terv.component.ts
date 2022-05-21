import { Component, Inject, OnInit } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { CsapatFoglalkozas, Foglalkozas, Munkaterv, OrsiFoglalkozas, RajFoglalkozas, RajTerv } from '../../models/foglalkozas'
import { ActivatedRoute } from '@angular/router'
import { Csapat, CsoportType, Rang, Szemszog as Szemszog } from '../../models/csapat'
import { CSAPATOK } from '../../models/beosztas'
import { formatHungarianDate, formatHungarianTime } from '../../date-adaptor'
import { map, Observable, ReplaySubject, Subject, tap } from 'rxjs'
import { SZEMSZOG } from '../../injection-tokens'

@Component({
    selector: 'app-csapat-terv',
    templateUrl: './csapat-terv.component.html',
    styleUrls: ['./csapat-terv.component.scss'],
    providers: [
        {
            provide: SZEMSZOG,
            useFactory: () => new ReplaySubject<Szemszog>(1)
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
        @Inject(SZEMSZOG) private szemszog$: Subject<Szemszog>,
    ) {
        this.editable$ = szemszog$.pipe(
            // tap(sz => console.log('szemszog: ', sz)),
            map(szemszog => szemszog.csoport.type === CsoportType.Csapat),
            // tap(sz => console.log('enable csapat buttons: ', sz)),
        )
    }

    ngOnInit(): void {
        const name = this.route.snapshot.paramMap.get('name')!
        this.csapat = CSAPATOK.find(cs => cs.name === name)!
        this.changeSzemszogToCsapat()
        const start = this.route.snapshot.paramMap.get('start')!

        // TODO: Get this from DB
        this.munkaterv = new Munkaterv(new Date(parseInt(start)))
    }

    changeSzemszogToCsapat() {
        this.szemszog$.next(new Szemszog(this.csapat))
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.munkaterv.foglalkozasok, event.previousIndex, event.currentIndex)
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
