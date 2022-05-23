import { Component, Inject, Input, OnInit } from '@angular/core'
import { filter, map, Observable, Subject } from 'rxjs'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { Csoport, Raj, Szemszog } from 'src/app/models/csapat'
import { ConcurrentTervek } from 'src/app/models/foglalkozas'

@Component({
    selector: 'app-concurrent-tervek',
    templateUrl: './concurrent-tervek.component.html',
    styleUrls: ['./concurrent-tervek.component.scss']
})
export class ConcurrentTervekComponent implements OnInit {

    @Input() start!: Date
    @Input() concurrentTervek!: ConcurrentTervek
    csoportok!: Csoport[]

    selectedCsoport$!: Observable<Csoport|undefined>

    constructor(
        @Inject(SZEMSZOG) public szemszog$: Subject<Szemszog>,
    ) {
    }

    ngOnInit(): void {
        this.csoportok = Array.from(this.concurrentTervek.tervek.keys())
        this.selectedCsoport$ = this.szemszog$.pipe(
            map(szSz => {
                const csoportok = Array.from(this.concurrentTervek.tervek.keys())
                return csoportok.find(terv => terv.contains(szSz.csoport))
            })
        )
    }
}
