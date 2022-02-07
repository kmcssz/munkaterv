import { Component, OnInit } from '@angular/core'
import { Proba } from '../proba-rendszer/proba'
import { PROBA_MAP } from '../proba-rendszer/proba-rendszer'

@Component({
    selector: 'app-program',
    templateUrl: './program.component.html',
    styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

    age: number = 10
    probak: Proba[] = []

    constructor() {
    }

    ngOnInit(): void {
        this.changeAge(this.age)
    }

    changeAge(age: number) {
        this.age = age
        this.probak = getProbakForAge(age)
        console.log(this.probak)
    }
}

function getProbakForAge(age: number): Proba[] {
    return PROBA_MAP.filter((proba) => proba.startAge <= age && age <= proba.endAge)
}
