import { Component, Input, OnInit } from '@angular/core'
import { combineLatest, map, Observable } from 'rxjs'
import { Csoport } from 'src/app/models/csapat'
import { Foglalkozas, Terv } from 'src/app/models/foglalkozas'
import { CsoportService } from 'src/app/services/csoport.service'
import { FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { StateService } from 'src/app/services/state.service'

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
        public state: StateService,
    ) {
    }

    ngOnInit(): void {
        this.csoportok$ = this.fogSor.filterChildren(this.concurrentTervek).pipe(
            map(fogak => fogak.map(fog => this.csopSor.getCsoport(fog.csoport))),
        )

        this.selectedCsoport$ = combineLatest([this.state.asObservable(), this.csoportok$]).pipe(
            map(([state, csoportok]) => {
                return csoportok.find(terv => terv.contains(state.szemszog))
            })
        )
    }

    getFoglalkozas$(csoport: Csoport): Observable<Foglalkozas> {
        return this.fogSor.filterChildren(this.concurrentTervek).pipe(
            map(fogak => fogak.filter(fog => fog.csoport === csoport.name)?.[0]),
        )
    }
}
