import { Component, Input, OnInit } from '@angular/core'
import { Layout } from 'src/app/models/state'
import { FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { StateService } from 'src/app/services/state.service'
import { isCsapatSzemszog } from '../../models/csapat'
import { Foglalkozas } from '../../models/foglalkozas'

@Component({
    selector: 'app-csapat-foglalkozas',
    templateUrl: './csapat-foglalkozas.component.html',
    styleUrls: ['./csapat-foglalkozas.component.scss']
})
export class CsapatFoglalkozasComponent implements OnInit {

    @Input() csapatFoglalkozas!: Foglalkozas

    Layout = Layout
    isCsapatSzemszog = isCsapatSzemszog

    constructor(
        public fogSor: FoglalkozasService,
        public state: StateService,
    ) {
    }

    ngOnInit() {
        if (this.csapatFoglalkozas.program === undefined) {
            this.csapatFoglalkozas.program = ""
        }
    }

    changed() {
        this.fogSor.putFoglalkozas(this.csapatFoglalkozas)
    }
}
