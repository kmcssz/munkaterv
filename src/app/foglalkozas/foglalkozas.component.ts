import { Component, Input, OnInit } from '@angular/core'
import { CsapatFoglalkozas, Foglalkozas, FoglalkozasType, OrsiFoglalkozas, RajFoglalkozas } from '../models/foglalkozas'

@Component({
    selector: 'app-foglalkozas',
    templateUrl: './foglalkozas.component.html',
    styleUrls: ['./foglalkozas.component.scss']
})
export class FoglalkozasComponent implements OnInit {

    @Input() foglalkozas!: Foglalkozas

    csapatFoglalkozas?: CsapatFoglalkozas
    rajFoglalkozas?: RajFoglalkozas
    orsiFoglalkozas?: OrsiFoglalkozas

    ngOnInit(): void {
        switch(this.foglalkozas.type) {
            case FoglalkozasType.CSAPAT:
                this.csapatFoglalkozas = this.foglalkozas as CsapatFoglalkozas
                break;
            case FoglalkozasType.RAJ:
                this.rajFoglalkozas = this.foglalkozas as RajFoglalkozas
                break;
            case FoglalkozasType.ORS:
                this.orsiFoglalkozas = this.foglalkozas as OrsiFoglalkozas
                break;
        }
    }
}
