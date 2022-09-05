import { Component, OnInit } from '@angular/core'
import { CsoportService } from '../services/csoport.service'
import { Csapat } from '../models/csapat'

@Component({
    selector: 'app-csapat-selection',
    templateUrl: './csapat-selection.component.html',
    styleUrls: ['./csapat-selection.component.scss']
})
export class CsapatSelectionComponent {

    csapatok: Csapat[]

    constructor(
        csopSor: CsoportService,
    ) {
        this.csapatok = [csopSor.getCsoport("Montreal") as Csapat]
    }
}
