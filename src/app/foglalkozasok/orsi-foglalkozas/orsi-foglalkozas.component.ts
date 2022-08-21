import { Component, Inject, Input, OnInit } from '@angular/core'
import { MatListOption } from '@angular/material/list'
import { Cserkeszek, ProbaRendszer, Temak } from '../../models/rendszer'
import { Alproba, Cserkesz, Proba, Tema } from '../../models/proba'
import { OrsiFoglalkozas } from '../../models/foglalkozas'
import { CsoportType, Szemszog } from '../../models/csapat'
import { SZEMSZOG } from '../../injection-tokens'
import { map, Observable } from 'rxjs'
import { ensure } from 'src/app/utils'

@Component({
    selector: 'app-orsi-foglalkozas',
    templateUrl: './orsi-foglalkozas.component.html',
    styleUrls: ['./orsi-foglalkozas.component.scss']
})
export class OrsiFoglalkozasComponent implements OnInit {

    @Input() orsiFoglalkozas!: OrsiFoglalkozas

    editable$: Observable<boolean>
    areProbakOpen = false
    areTemakOpen = false

    probak!: Proba[]
    temak = Object.values(Temak)
    alprobak!: Alproba[]
    pontSelection = new Map<Alproba, boolean>()

    constructor(
        @Inject(SZEMSZOG) szemszog$: Observable<Szemszog>
    ) {
        this.editable$ = szemszog$.pipe(
            map(szemszog => szemszog.csoport.type === CsoportType.Ors),
        )
    }

    ngOnInit(): void {
        const cserkesz = getCserkesz(this.orsiFoglalkozas.cserkesz)
        const proba = getProba(this.orsiFoglalkozas.proba)
        const tema = getTema(cserkesz, proba, this.orsiFoglalkozas.tema)
        const alproba = getAlproba(cserkesz, proba, tema, this.orsiFoglalkozas.alproba)
        this.changeAge(this.orsiFoglalkozas.age)
        this.changeProba(proba)
        this.changeTema(tema)
        this.changeAlproba(alproba)

        if (this.orsiFoglalkozas.program === undefined) {
            this.orsiFoglalkozas.program = ""
        }
    }

    changeAge(age: number) {
        this.orsiFoglalkozas.age = age
        this.orsiFoglalkozas.cserkesz = getCserkeszForAge(age).name
        this.probak = getProbakForCserkesz(getCserkesz(this.orsiFoglalkozas.cserkesz))
        this.changeProba(this.probak[0])
    }

    changeProba(proba: Proba) {
        this.orsiFoglalkozas.proba = proba.name
        this.areProbakOpen = false
        this.temak = getTemakForProba(getCserkesz(this.orsiFoglalkozas.cserkesz), proba)
        this.changeTema(this.temak[0])
    }

    changeTema(tema: Tema) {
        this.orsiFoglalkozas.tema = tema.name
        this.areTemakOpen = false
        this.alprobak = getAlprobakForTema(
            getCserkesz(this.orsiFoglalkozas.cserkesz),
            getProba(this.orsiFoglalkozas.proba),
            tema,
        )
        this.changeAlproba(this.alprobak[0])
    }

    changeAlproba(alproba: Alproba) {
        this.orsiFoglalkozas.alproba = alproba.name
        this.orsiFoglalkozas.pontok = alproba.pontok.map(pont => pont.name)
    }

    changePontok(options: MatListOption[]) {
        this.orsiFoglalkozas.pontok = []
        options.forEach((option) => {
            if (option.selected) {
                this.orsiFoglalkozas.pontok.push(option.value)
            }
        })
    }

    getProba(): Proba {
        return getProba(this.orsiFoglalkozas.proba)
    }

    getTema(): Tema {
        const cserkesz = getCserkesz(this.orsiFoglalkozas.cserkesz)
        const proba = getProba(this.orsiFoglalkozas.proba)
        return getTema(cserkesz, proba, this.orsiFoglalkozas.tema)
    }
}

function getCserkeszForAge(age: number): Cserkesz {
    return Object.values(Cserkeszek)
        .filter((cserkesz) => cserkesz.startAge <= age && age <= cserkesz.endAge)
        [0]
}

function getCserkesz(name: string): Cserkesz {
    return ensure(Array.from(ProbaRendszer.keys())
        .find(cs => cs.name === name))
}

function getProba(name: string): Proba {
    let proba: Proba | undefined
    ProbaRendszer.forEach((probak, cserkesz) => {
        proba = Array.from(probak.keys())
            .find(proba => proba.name === name)
        if (proba !== undefined) {
            return
        }
    })
    return ensure(proba)
}

function getTema(cserkesz: Cserkesz, proba: Proba, name: string) {
    return ensure(getTemakForProba(cserkesz, proba).find(tema => tema.name === name))
}

function getAlproba(cserkesz: Cserkesz, proba: Proba, tema: Tema, name: string) {
    return ensure(getAlprobakForTema(cserkesz, proba, tema).find(alproba => alproba.name === name))
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
