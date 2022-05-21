import { Component, Input, OnInit } from '@angular/core'
import { Rang } from '../../models/csapat'
import { RajFoglalkozas } from '../../models/foglalkozas'

@Component({
    selector: 'app-raj-foglalkozas',
    templateUrl: './raj-foglalkozas.component.html',
    styleUrls: ['./raj-foglalkozas.component.scss']
})
export class RajFoglalkozasComponent implements OnInit {

    @Input() rajFoglalkozas!: RajFoglalkozas
    @Input() rang!: Rang

    constructor() { }

    ngOnInit(): void {
    }

}
