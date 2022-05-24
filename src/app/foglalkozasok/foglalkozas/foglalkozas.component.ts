import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { map, Observable, Subject, tap } from 'rxjs'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { Csoport, CsoportType, isCsapatSzemszog, isOrsSzemszog, isRajSzemszog, Szemszog } from 'src/app/models/csapat'
import { ConcurrentTervek, CsapatFoglalkozas, CsapatTerv, Foglalkozas, FoglalkozasType, OrsiFoglalkozas, OrsiTerv, RajFoglalkozas, RajTerv } from '../../models/foglalkozas'

const foglalkozasTypeToCssStyle = new Map<FoglalkozasType, string>(
    [
        [FoglalkozasType.CsapatTerv, 'csapat-terv'],
        [FoglalkozasType.RajTerv, 'raj-terv'],
        [FoglalkozasType.OrsiTerv, 'orsi-terv'],
        [FoglalkozasType.CsapatFoglalkozas, 'csapat-foglalkozas'],
        [FoglalkozasType.RajFoglalkozas, 'raj-foglalkozas'],
        [FoglalkozasType.OrsiFoglalkozas, 'orsi-foglalkozas'],
    ]
)

@Component({
    selector: 'app-foglalkozas',
    templateUrl: './foglalkozas.component.html',
    styleUrls: ['./foglalkozas.component.scss']
})
export class FoglalkozasComponent implements OnChanges {

    @Input() start!: Date
    @Input() foglalkozas!: Foglalkozas

    csapatTerv?: CsapatTerv
    rajTerv?: RajTerv
    orsiTerv?: OrsiTerv
    concurrentTervek?: ConcurrentTervek
    csapatFoglalkozas?: CsapatFoglalkozas
    rajFoglalkozas?: RajFoglalkozas
    orsiFoglalkozas?: OrsiFoglalkozas

    foglalkozasCssStyle?: string
    wrapInCard!: boolean
    editableDuration$!: Observable<boolean>

    constructor(
        @Inject(SZEMSZOG) public szemszog$: Observable<Szemszog>,
    ) {
    }

    ngOnChanges(_: SimpleChanges): void {

        this.foglalkozasCssStyle = foglalkozasTypeToCssStyle.get(this.foglalkozas.type)
        this.editableDuration$ = this.szemszog$.pipe(
            map(szSz => canEditDuration(szSz.csoport.type, this.foglalkozas.type)),
        )
        switch(this.foglalkozas.type) {
            case FoglalkozasType.CsapatTerv:
                this.csapatTerv = this.foglalkozas as CsapatTerv
                this.wrapInCard = false
                break;
            case FoglalkozasType.RajTerv:
                this.rajTerv = this.foglalkozas as RajTerv
                this.wrapInCard = false
                break;
            case FoglalkozasType.OrsiTerv:
                this.orsiTerv = this.foglalkozas as OrsiTerv
                this.wrapInCard = false
                break;
            case FoglalkozasType.ConcurrentTervek:
                this.concurrentTervek = this.foglalkozas as ConcurrentTervek
                const firstFoglalkozas = this.concurrentTervek.tervek.values().next().value as Foglalkozas
                this.foglalkozasCssStyle = foglalkozasTypeToCssStyle.get(firstFoglalkozas.type)
                this.wrapInCard = true
                this.editableDuration$ = this.szemszog$.pipe(
                    map(szSz => canEditDuration(szSz.csoport.type, firstFoglalkozas.type)),
                )
                break;
            case FoglalkozasType.CsapatFoglalkozas:
                this.csapatFoglalkozas = this.foglalkozas as CsapatFoglalkozas
                this.wrapInCard = true
                break;
            case FoglalkozasType.RajFoglalkozas:
                this.rajFoglalkozas = this.foglalkozas as RajFoglalkozas
                this.wrapInCard = true
                break;
            case FoglalkozasType.OrsiFoglalkozas:
                this.orsiFoglalkozas = this.foglalkozas as OrsiFoglalkozas
                this.wrapInCard = true
                break;
            default:
                throw Error(`Unknown FoglalkozasType: ${this.foglalkozas.type}`)
        }
    }

}

function canEditDuration(csoportType: CsoportType, foglalkozasType: FoglalkozasType): boolean {
    return csoportType === CsoportType.Csapat && [
            FoglalkozasType.CsapatTerv,
            FoglalkozasType.CsapatFoglalkozas,
            FoglalkozasType.RajTerv,
        ].includes(foglalkozasType) ||

        csoportType === CsoportType.Raj && [
            FoglalkozasType.RajFoglalkozas,
            FoglalkozasType.OrsiTerv,
        ].includes(foglalkozasType) ||

        csoportType === CsoportType.Ors && [
            FoglalkozasType.OrsiFoglalkozas,
        ].includes(foglalkozasType)
}
