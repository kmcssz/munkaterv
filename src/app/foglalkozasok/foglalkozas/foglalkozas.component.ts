import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { Csoport } from 'src/app/models/csapat'
import { ConcurrentTervek, CsapatFoglalkozas, CsapatTerv, Foglalkozas, FoglalkozasType, OrsiFoglalkozas, OrsiTerv, RajFoglalkozas, RajTerv } from '../../models/foglalkozas'

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
    foglalkozasTypeToCssStyle = new Map<FoglalkozasType, string>(
        [
            [FoglalkozasType.CsapatTerv, 'csapat-terv'],
            [FoglalkozasType.RajTerv, 'raj-terv'],
            [FoglalkozasType.OrsiTerv, 'orsi-terv'],
            [FoglalkozasType.CsapatFoglalkozas, 'csapat-foglalkozas'],
            [FoglalkozasType.RajFoglalkozas, 'raj-foglalkozas'],
            [FoglalkozasType.OrsiFoglalkozas, 'orsi-foglalkozas'],
        ]
    )

    wrapInCard!: boolean

    ngOnChanges(_: SimpleChanges): void {

        this.foglalkozasCssStyle = this.foglalkozasTypeToCssStyle.get(this.foglalkozas.type)

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
                this.foglalkozasCssStyle = this.foglalkozasTypeToCssStyle.get(firstFoglalkozas.type)
                this.wrapInCard = true
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
