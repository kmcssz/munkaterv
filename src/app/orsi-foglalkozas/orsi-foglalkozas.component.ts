import { Component, Input, OnInit } from '@angular/core'
import { MatListOption } from '@angular/material/list'
import { Cserkeszek, ProbaRendszer, Temak } from '../models/rendszer'
import { Alproba, Cserkesz, Proba, Tema } from '../models/proba'
import { OrsiFoglalkozas } from '../models/foglalkozas'
import { ANGULAR_EDITOR_CONFIG } from '../angular-editor'

@Component({
    selector: 'app-orsi-foglalkozas',
    templateUrl: './orsi-foglalkozas.component.html',
    styleUrls: ['./orsi-foglalkozas.component.scss']
})
export class OrsiFoglalkozasComponent implements OnInit {

    @Input() orsiFoglalkozas!: OrsiFoglalkozas

    areProbakOpen = false
    areTemakOpen = false

    probak!: Proba[]
    temak = Object.values(Temak)
    alprobak!: Alproba[]
    editorConfig = ANGULAR_EDITOR_CONFIG

    constructor() {
    }

    ngOnInit(): void {
        this.changeAge(this.orsiFoglalkozas.age)
        this.changeProba(this.orsiFoglalkozas.proba)
        this.changeTema(this.orsiFoglalkozas.tema)
        this.changeAlproba(this.orsiFoglalkozas.alproba)
    }

    changeAge(age: number) {
        this.orsiFoglalkozas.age = age
        this.orsiFoglalkozas.cserkesz = getCserkeszForAge(age)
        this.probak = getProbakForCserkesz(this.orsiFoglalkozas.cserkesz)
        this.changeProba(this.probak[0])
    }

    changeProba(proba: Proba) {
        this.orsiFoglalkozas.proba = proba
        this.areProbakOpen = false
        this.temak = getTemakForProba(this.orsiFoglalkozas.cserkesz, proba)
        this.changeTema(this.temak[0])
    }

    changeTema(tema: Tema) {
        this.orsiFoglalkozas.tema = tema
        this.areTemakOpen = false
        this.alprobak = getAlprobakForTema(
            this.orsiFoglalkozas.cserkesz,
            this.orsiFoglalkozas.proba,
            tema,
        )
        this.changeAlproba(this.alprobak[0])
    }

    changeAlproba(alproba: Alproba) {
        this.orsiFoglalkozas.alproba = alproba
        this.orsiFoglalkozas.setPontok(alproba.pontok)
    }

    changePontok(options: MatListOption[]) {
        this.editorConfig.editable = !this.editorConfig.editable
        this.editorConfig.showToolbar = !this.editorConfig.showToolbar
        options.forEach((option) => {
            this.orsiFoglalkozas.pontSelection.set(option.value, option.selected)
        })
    }
}

function getCserkeszForAge(age: number): Cserkesz {
    return Object.values(Cserkeszek)
        .filter((cserkesz) => cserkesz.startAge <= age && age <= cserkesz.endAge)
        [0]
}

function getProbakForCserkesz(cserkesz: Cserkesz): Proba[] {
    return Array.from(ProbaRendszer.get(cserkesz)!.keys()!)
}

function getTemakForProba(cserkesz: Cserkesz, proba: Proba): Tema[] {
    return Array.from(ProbaRendszer.get(cserkesz)!.get(proba)!.keys())
}

function getAlprobakForTema(cserkesz: Cserkesz, proba: Proba, tema: Tema): Alproba[] {
    return Array.from(ProbaRendszer.get(cserkesz)!.get(proba)!.get(tema)!)
}
