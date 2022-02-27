import { Component, OnInit } from '@angular/core'
import { CSAPATOK } from '../models/beosztas'

@Component({
    selector: 'app-csapat-selection',
    templateUrl: './csapat-selection.component.html',
    styleUrls: ['./csapat-selection.component.scss']
})
export class CsapatSelectionComponent implements OnInit {

    csapatok = CSAPATOK

    constructor() { }

    ngOnInit(): void {
    }

}
