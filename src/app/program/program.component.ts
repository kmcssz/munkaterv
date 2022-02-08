import { Component, Input, OnInit } from '@angular/core'
import { Proba } from '../proba-rendszer/proba-rendszer.models'
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

    probak!: Proba[]
    temak = Object.values(Temak)

    constructor() {
    }

    ngOnInit(): void {
        this.probak = getProbakForAge(this.program.age)
    }

    changeAge(age: number) {
        this.program.age = age
        this.probak = getProbakForAge(age)
        this.program.proba = this.probak[0]
    }
}

function getProbakForAge(age: number): Proba[] {
    return Object.values(Probak)
        .filter((proba) => proba.startAge <= age && age <= proba.endAge)
}
