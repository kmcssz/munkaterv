import { Component, Inject, Input, OnInit } from '@angular/core'
import { map, Observable, Subject } from 'rxjs'
import { CsoportService } from 'src/app/csoport.service'
import { FoglalkozasService } from 'src/app/foglalkozas.service'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { Csoport, Szemszog } from 'src/app/models/csapat'
import { Terv } from 'src/app/models/foglalkozas'
import { ensure } from 'src/app/utils'

@Component({
    selector: 'app-concurrent-tervek',
    templateUrl: './concurrent-tervek.component.html',
    styleUrls: ['./concurrent-tervek.component.scss']
})
export class ConcurrentTervekComponent implements OnInit {

    @Input() start!: Date
    @Input() concurrentTervek!: Terv
    csoportok!: Csoport[]

    selectedCsoport$!: Observable<Csoport|undefined>

    constructor(
        private fogSor: FoglalkozasService,
        private csopSor: CsoportService,
        @Inject(SZEMSZOG) public szemszog$: Subject<Szemszog>,
    ) {
    }

    ngOnInit(): void {
        this.csoportok = this.fogSor
            .getChildren(this.concurrentTervek)
            .map(fog => fog.csoport)
            .map(this.csopSor.getCsoport)

        this.selectedCsoport$ = this.szemszog$.pipe(
            map(szSz => {
                return this.csoportok.find(terv => terv.contains(szSz.csoport))
            })
        )
    }

    getFoglalkozas(csoport: Csoport) {
        return ensure(this.fogSor.getChildren(this.concurrentTervek)
            .find(fog => fog.csoport === csoport.name))
    }
}
