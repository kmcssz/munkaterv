import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core'
import { map, Observable } from 'rxjs'
import { FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { CsoportType, Szemszog } from 'src/app/models/csapat'
import { ConcurrentTerv, Foglalkozas, FoglalkozasType, OrsiFoglalkozas, Terv } from '../../models/foglalkozas'

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

    FoglalkozasType = FoglalkozasType

    @Input() start!: Date
    @Input() foglalkozas!: Foglalkozas

    terv?: Terv
    orsiFoglalkozas?: OrsiFoglalkozas

    foglalkozasCssStyle?: string
    wrapInCard!: boolean
    editableDuration$!: Observable<boolean>

    constructor(
        private fogSor: FoglalkozasService,
        @Inject(SZEMSZOG) public szemszog$: Observable<Szemszog>,
    ) {
    }

    ngOnChanges(_: SimpleChanges): void {

        this.foglalkozasCssStyle = foglalkozasTypeToCssStyle.get(this.foglalkozas.type as FoglalkozasType)
        this.editableDuration$ = this.szemszog$.pipe(
            map(szSz => canEditDuration(
                szSz.csoport.type,
                this.foglalkozas.type as FoglalkozasType)
            ),
        )
        switch(this.foglalkozas.type) {
            case FoglalkozasType.CsapatTerv:
                this.terv = this.foglalkozas as Terv
                this.wrapInCard = false
                break;
            case FoglalkozasType.RajTerv:
                this.terv = this.foglalkozas as Terv
                this.wrapInCard = false
                break;
            case FoglalkozasType.OrsiTerv:
                this.terv = this.foglalkozas as Terv
                this.wrapInCard = false
                break;
            case FoglalkozasType.ConcurrentTervek:
                const concurrentTerv = this.foglalkozas as ConcurrentTerv
                this.terv = concurrentTerv
                this.foglalkozasCssStyle = foglalkozasTypeToCssStyle.get(concurrentTerv.subtype)
                this.wrapInCard = true
                this.editableDuration$ = this.szemszog$.pipe(
                    map(szSz => canEditDuration(
                            szSz.csoport.type,
                            concurrentTerv.subtype,
                        )
                    ),
                )
                break;
            case FoglalkozasType.CsapatFoglalkozas:
                this.wrapInCard = true
                break;
            case FoglalkozasType.RajFoglalkozas:
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

    durationChanged() {
        this.fogSor.putFoglalkozas(this.foglalkozas)
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
