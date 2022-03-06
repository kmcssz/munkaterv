import { Component, Input, OnInit } from '@angular/core'
import { RajFoglalkozas } from '../models/foglalkozas'

@Component({
    selector: 'app-raj-foglalkozas',
    templateUrl: './raj-foglalkozas.component.html',
    styleUrls: ['./raj-foglalkozas.component.scss']
})
export class RajFoglalkozasComponent implements OnInit {

    @Input() rajFoglalkozas!: RajFoglalkozas

    constructor() { }

    ngOnInit(): void {
    }

}
