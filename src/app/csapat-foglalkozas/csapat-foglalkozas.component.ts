import { Component, Input, OnInit } from '@angular/core'
import { CsapatFoglalkozas } from '../models/foglalkozas'

@Component({
    selector: 'app-csapat-foglalkozas',
    templateUrl: './csapat-foglalkozas.component.html',
    styleUrls: ['./csapat-foglalkozas.component.scss']
})
export class CsapatFoglalkozasComponent implements OnInit {

    @Input() csapatFoglalkozas!: CsapatFoglalkozas

    constructor() {}

    ngOnInit(): void {
    }
}
