import { Component, Inject, Input, OnInit } from '@angular/core'
import { MatListOption } from '@angular/material/list'
import { Alproba, Cserkesz, Proba, Tema } from '../../models/proba'
import { OrsiFoglalkozas, ProbaPont } from '../../models/foglalkozas'
import { CsoportType, Layout, Szemszog } from '../../models/csapat'
import { SZEMSZOG } from '../../injection-tokens'
import { map, Observable } from 'rxjs'
import { ProbaRendszerService } from 'src/app/services/probarendszer.service'
import { first } from '../../utils'
import { FoglalkozasService } from 'src/app/services/foglalkozas.service'

@Component({
    selector: 'app-orsi-foglalkozas',
    templateUrl: './orsi-foglalkozas.component.html',
    styleUrls: ['./orsi-foglalkozas.component.scss']
})
export class OrsiFoglalkozasComponent implements OnInit {

    @Input() orsiFoglalkozas!: OrsiFoglalkozas

    Layout = Layout

    editable$: Observable<boolean>
    layout$: Observable<Layout>
    areProbakOpen = false
    areTemakOpen = false

    probak!: Proba[]
    temak: Tema[]
    alprobak!: Alproba[]

    constructor(
        public fogSor: FoglalkozasService,
        private readonly probaRendszer: ProbaRendszerService,
        @Inject(SZEMSZOG) readonly szemszog$: Observable<Szemszog>
    ) {
        this.temak = probaRendszer.getTemak()
        this.layout$ = this.szemszog$.pipe(map(szemszog => szemszog.layout))
        this.editable$ = szemszog$.pipe(
            map(szemszog => szemszog.csoport.type === CsoportType.Ors),
        )
    }

    ngOnInit(): void {
        const newAge = this.orsiFoglalkozas.age ?? 10

        const newCserkeszUid = this.orsiFoglalkozas.cserkeszUid ??
            this.probaRendszer.getCserkeszByAge(newAge).uid

        const newProba = this.orsiFoglalkozas.probaUid ??
            first(this.probaRendszer.getProbakForCserkesz(newCserkeszUid)).uid

        const newTema = this.orsiFoglalkozas.temaUid ??
            first(this.probaRendszer.getTemak()).uid

        const newAlproba = this.orsiFoglalkozas.alprobaUid ??
            first(this.probaRendszer.getAlprobak(newProba, newTema)).uid

        const newPontok = this.orsiFoglalkozas.pontok

        if (this.orsiFoglalkozas.program === undefined) {
            this.orsiFoglalkozas.program = ""
        }

        this.changeAge(newAge, false)
        this.orsiFoglalkozas.cserkeszUid = newCserkeszUid
        this.changeProba(newProba, false)
        this.changeTema(newTema, false)
        this.changeAlproba(newAlproba, false)

        if (newPontok !== undefined) {
            this.orsiFoglalkozas.pontok = newPontok
        }
    }

    changeAge(age: number, save: boolean = true) {
        this.orsiFoglalkozas.age = age
        this.orsiFoglalkozas.cserkeszUid = this.probaRendszer.getCserkeszByAge(age).uid
        this.probak = this.probaRendszer.getProbakForCserkesz(this.orsiFoglalkozas.cserkeszUid)
        this.changeProba(first(this.probak).uid, save)
    }

    changeProba(probaUid: string, save: boolean = true) {
        this.orsiFoglalkozas.probaUid = probaUid
        this.areProbakOpen = false
        this.temak = this.probaRendszer.getTemak()
        this.changeTema(first(this.temak).uid, save)
    }

    changeTema(temaUid: string, save: boolean = true) {
        this.orsiFoglalkozas.temaUid = temaUid
        this.areTemakOpen = false
        this.alprobak = this.probaRendszer.getAlprobak(
            this.orsiFoglalkozas.probaUid,
            this.orsiFoglalkozas.temaUid,
        )
        this.orsiFoglalkozas.pontok = []
        this.changeAlproba(first(this.alprobak).uid, save)
    }

    changeAlproba(alprobaUid: string, save: boolean = true) {
        if (this.orsiFoglalkozas.alprobaUid != alprobaUid) {
            this.orsiFoglalkozas.pontok = []
            const alproba = this.probaRendszer.getAlproba(alprobaUid)
            alproba.pontok.forEach(pont => {
                this.orsiFoglalkozas.pontok.push(createPont(pont))
            })
        }
        this.orsiFoglalkozas.alprobaUid = alprobaUid
        this.saveFoglalkozas(save)
    }

    changePontok(options: MatListOption[], save: boolean = true) {
        options.forEach((option) => {
            this.orsiFoglalkozas.pontok
                .filter(pont => pont.name === option.value)
                .forEach(pont => pont.selected = option.selected)
        })
        this.saveFoglalkozas(save)
    }

    changeProgram() {
        this.saveFoglalkozas(true)
    }

    saveFoglalkozas(save: boolean) {
        if (save) {
            this.fogSor.putFoglalkozas(this.orsiFoglalkozas)
        }
    }

    get cserkesz(): Cserkesz {
        return this.probaRendszer.getCserkesz(this.orsiFoglalkozas.cserkeszUid)
    }

    get proba(): Proba {
        return this.probaRendszer.getProba(this.orsiFoglalkozas.probaUid)
    }

    get tema(): Tema {
        return this.probaRendszer.getTema(this.orsiFoglalkozas.temaUid)
    }

    get alproba(): Alproba {
        return this.probaRendszer.getAlproba(this.orsiFoglalkozas.alprobaUid)
    }

    get pontok(): ProbaPont[] {
        return this.orsiFoglalkozas.pontok
    }
}

function createPont(name: string, selected: boolean = true): ProbaPont {
    return { name, selected }
}
