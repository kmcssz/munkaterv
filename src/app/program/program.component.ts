import { Component, Input, OnInit } from '@angular/core'
import { Proba, Tema } from '../proba-rendszer/proba-rendszer.models'
import { Probak, Temak } from '../proba-rendszer/proba-rendszer'
import { Program } from './program.models'

@Component({
    selector: 'app-program',
    templateUrl: './program.component.html',
    styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

    @Input()
    program!: Program

    areProbakOpen = false
    areTemakOpen = false

    probak!: Proba[]
    temak = Object.values(Temak)

    constructor() {
    }

    ngOnInit(): void {
        // This will set the probak
        this.changeAge(this.program.age)
    }

    changeAge(age: number) {
        this.program.age = age
        this.probak = getProbakForAge(age)
        this.program.proba = this.probak[0]
    }

    changeProba(proba: Proba) {
        this.program.proba = proba
        this.areProbakOpen = false
    }

    changeTema(tema: Tema) {
        this.program.tema = tema
        this.areTemakOpen = false
    }
}

function getProbakForAge(age: number): Proba[] {
    return Object.values(Probak)
        .filter((proba) => proba.startAge <= age && age <= proba.endAge)
}
