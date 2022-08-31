import { Component, Inject, Input, OnInit } from '@angular/core'
import { combineLatest, filter, first, flatMap, map, Observable, Subject } from 'rxjs'
import { CsoportService } from 'src/app/services/csoport.service'
import { FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { Csoport, Szemszog } from 'src/app/models/csapat'
import { Foglalkozas, Terv } from 'src/app/models/foglalkozas'
import { ensure } from 'src/app/utils'

@Component({
    selector: 'app-concurrent-tervek',
    templateUrl: './concurrent-tervek.component.html',
    styleUrls: ['./concurrent-tervek.component.scss']
})
export class ConcurrentTervekComponent implements OnInit {

    @Input() start!: Date
    @Input() concurrentTervek!: Terv
    csoportok$!: Observable<Csoport[]>

    selectedCsoport$!: Observable<Csoport|undefined>

    constructor(
        private fogSor: FoglalkozasService,
        private csopSor: CsoportService,
        @Inject(SZEMSZOG) public szemszog$: Subject<Szemszog>,
    ) {
    }

    ngOnInit(): void {
        this.csoportok$ = this.fogSor.filterChildren(this.concurrentTervek).pipe(
            map(fogak => fogak.map(fog => this.csopSor.getCsoport(fog.csoport))),
        )

        this.selectedCsoport$ = combineLatest([this.szemszog$, this.csoportok$]).pipe(
            map(([szSz, csoportok]) => {
                return csoportok.find(terv => terv.contains(szSz.csoport))
            })
        )
    }

    getFoglalkozas$(csoport: Csoport): Observable<Foglalkozas> {
        return this.fogSor.filterChildren(this.concurrentTervek).pipe(
            map(fogak => fogak.filter(fog => fog.csoport === csoport.name)?.[0]),
        )
    }
}
