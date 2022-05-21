import { Component, Input, OnInit } from '@angular/core'
import { CsapatFoglalkozas, Foglalkozas, FoglalkozasType, OrsiFoglalkozas, RajFoglalkozas, RajTerv } from '../../models/foglalkozas'

@Component({
    selector: 'app-foglalkozas',
    templateUrl: './foglalkozas.component.html',
    styleUrls: ['./foglalkozas.component.scss']
})
export class FoglalkozasComponent implements OnInit {

    @Input() foglalkozas!: Foglalkozas

    csapatFoglalkozas?: CsapatFoglalkozas
    rajTerv?: RajTerv
    rajFoglalkozas?: RajFoglalkozas
    orsiFoglalkozas?: OrsiFoglalkozas

    ngOnInit(): void {
        switch(this.foglalkozas.type) {
            case FoglalkozasType.Csapat:
                this.csapatFoglalkozas = this.foglalkozas as CsapatFoglalkozas
                break;
            case FoglalkozasType.RajTerv:
                this.rajTerv = this.foglalkozas as RajTerv
                break;
            case FoglalkozasType.Raj:
                this.rajFoglalkozas = this.foglalkozas as RajFoglalkozas
                break;
            case FoglalkozasType.Orsi:
                this.orsiFoglalkozas = this.foglalkozas as OrsiFoglalkozas
                break;
        }
    }
}
