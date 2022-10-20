import { Component, Input, OnInit } from '@angular/core'
import { Layout } from 'src/app/models/state'
import { FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { StateService } from 'src/app/services/state.service'
import { isRajSzemszog } from '../../models/csapat'
import { Foglalkozas } from '../../models/foglalkozas'

@Component({
    selector: 'app-raj-foglalkozas',
    templateUrl: './raj-foglalkozas.component.html',
    styleUrls: ['./raj-foglalkozas.component.scss']
})
export class RajFoglalkozasComponent implements OnInit {

    @Input() rajFoglalkozas!: Foglalkozas

    Layout = Layout

    isRajSzemszog = isRajSzemszog

    constructor(
        public readonly fogSor: FoglalkozasService,
        public readonly state: StateService,
    ) {
    }

    ngOnInit() {
        if (this.rajFoglalkozas.program === undefined) {
            this.rajFoglalkozas.program = ""
        }
    }

    changed() {
        this.fogSor.putFoglalkozas(this.rajFoglalkozas)
    }
}
