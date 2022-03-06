import { Component, Input, OnInit } from '@angular/core'
import { ANGULAR_EDITOR_CONFIG } from '../angular-editor'
import { CsapatFoglalkozas } from '../models/foglalkozas'

@Component({
    selector: 'app-csapat-foglalkozas',
    templateUrl: './csapat-foglalkozas.component.html',
    styleUrls: ['./csapat-foglalkozas.component.scss']
})
export class CsapatFoglalkozasComponent implements OnInit {

    @Input() csapatFoglalkozas!: CsapatFoglalkozas

    editorConfig = ANGULAR_EDITOR_CONFIG

    constructor() {}

    ngOnInit(): void {
    }
}
