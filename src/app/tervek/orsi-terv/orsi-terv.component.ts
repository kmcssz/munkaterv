import { Component, Inject, Input } from '@angular/core'
import { map, Observable } from 'rxjs'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { isOrsSzemszog, isRajSzemszog, Szemszog } from 'src/app/models/csapat'
import { OrsiFoglalkozas, OrsiTerv } from 'src/app/models/foglalkozas'

@Component({
    selector: 'app-orsi-terv',
    templateUrl: './orsi-terv.component.html',
    styleUrls: ['./orsi-terv.component.scss']
})
export class OrsiTervComponent {

    @Input() start!: Date
    @Input() orsiTerv!: OrsiTerv

    editable$: Observable<boolean>

    constructor(
        @Inject(SZEMSZOG) szemszog$: Observable<Szemszog>
    ) {
        this.editable$ = szemszog$.pipe(map(szSz => isRajSzemszog(szSz) || isOrsSzemszog(szSz)))
    }

    addOrsiFoglalkozas() {
        const foglalkozas = new OrsiFoglalkozas()
        foglalkozas.duration = Math.min(this.orsiTerv.computeRemainingDuration(), foglalkozas.duration)
        this.orsiTerv.foglalkozasok.push(foglalkozas)
    }
}
