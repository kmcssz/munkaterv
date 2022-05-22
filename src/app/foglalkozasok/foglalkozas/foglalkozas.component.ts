import { Component, Input, OnInit } from '@angular/core'
import { CsapatFoglalkozas, CsapatTerv, Foglalkozas, FoglalkozasType, OrsiFoglalkozas, OrsiTerv, RajFoglalkozas, RajTerv } from '../../models/foglalkozas'

@Component({
    selector: 'app-foglalkozas',
    templateUrl: './foglalkozas.component.html',
    styleUrls: ['./foglalkozas.component.scss']
})
export class FoglalkozasComponent implements OnInit {

    @Input() start!: Date
    @Input() foglalkozas!: Foglalkozas

    csapatTerv?: CsapatTerv
    rajTerv?: RajTerv
    orsiTerv?: OrsiTerv
    csapatFoglalkozas?: CsapatFoglalkozas
    rajFoglalkozas?: RajFoglalkozas
    orsiFoglalkozas?: OrsiFoglalkozas

    ngOnInit(): void {
        switch(this.foglalkozas.type) {
            case FoglalkozasType.CsapatTerv:
                this.csapatTerv = this.foglalkozas as CsapatTerv
                break;
            case FoglalkozasType.RajTerv:
                this.rajTerv = this.foglalkozas as RajTerv
                break;
            case FoglalkozasType.OrsiTerv:
                this.orsiTerv = this.foglalkozas as OrsiTerv
                break;
            case FoglalkozasType.CsapatFoglalkozas:
                this.csapatFoglalkozas = this.foglalkozas as CsapatFoglalkozas
                break;
            case FoglalkozasType.RajFoglalkozas:
                this.rajFoglalkozas = this.foglalkozas as RajFoglalkozas
                break;
            case FoglalkozasType.OrsiFoglalkozas:
                this.orsiFoglalkozas = this.foglalkozas as OrsiFoglalkozas
                break;
        }
    }
}
