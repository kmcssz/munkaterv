import { Component, Inject, Input, OnInit } from '@angular/core'
import { MatListOption } from '@angular/material/list'
import { Alproba, Cserkesz, Proba, Tema } from '../../models/proba'
import { OrsiFoglalkozas } from '../../models/foglalkozas'
import { CsoportType, Szemszog } from '../../models/csapat'
import { SZEMSZOG } from '../../injection-tokens'
import { map, Observable } from 'rxjs'
import { ProbaRendszerService } from 'src/app/services/probarendszer.service'
import { first } from '../../utils'

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
    temak: Tema[]
    alprobak!: Alproba[]
    pontSelection = new Map<string, boolean>()

    constructor(
        private readonly probaRendszer: ProbaRendszerService,
        @Inject(SZEMSZOG) readonly szemszog$: Observable<Szemszog>
    ) {
        this.temak = probaRendszer.getTemak()
        this.editable$ = szemszog$.pipe(
            map(szemszog => szemszog.csoport.type === CsoportType.Ors),
        )
    }

    ngOnInit(): void {

        if (this.orsiFoglalkozas.age === undefined) {
            this.orsiFoglalkozas.age = 10
        }
        if (this.orsiFoglalkozas.cserkeszUid === undefined) {
            this.orsiFoglalkozas.cserkeszUid = first(this.probaRendszer.getCserkeszek()).uid
        }
        if (this.orsiFoglalkozas.probaUid === undefined) {
            this.orsiFoglalkozas.probaUid = first(this.probaRendszer.getProbakForCserkesz(this.orsiFoglalkozas.cserkeszUid)).uid
        }
        if (this.orsiFoglalkozas.temaUid === undefined) {
            this.orsiFoglalkozas.temaUid = first(this.probaRendszer.getTemak()).uid
        }
        if (this.orsiFoglalkozas.alprobaUid === undefined) {
            this.orsiFoglalkozas.alprobaUid = first(this.probaRendszer.getAlprobak(
                this.orsiFoglalkozas.probaUid,
                this.orsiFoglalkozas.temaUid,
            )).uid
        }
        if (this.orsiFoglalkozas.program === undefined) {
            this.orsiFoglalkozas.program = ""
        }
        this.changeAge(this.orsiFoglalkozas.age)
        this.changeProba(this.orsiFoglalkozas.probaUid)
        this.changeTema(this.orsiFoglalkozas.temaUid)
        this.changeAlproba(this.orsiFoglalkozas.alprobaUid)
    }

    changeAge(age: number) {
        this.orsiFoglalkozas.age = age
        this.orsiFoglalkozas.cserkeszUid = this.probaRendszer.getCserkeszByAge(age).uid
        this.probak = this.probaRendszer.getProbakForCserkesz(this.orsiFoglalkozas.cserkeszUid)
        this.changeProba(first(this.probak).uid)
    }

    changeProba(probaUid: string) {
        this.orsiFoglalkozas.probaUid = probaUid
        this.areProbakOpen = false
        this.temak = this.probaRendszer.getTemak()
        this.changeTema(first(this.temak).uid)
    }

    changeTema(temaUid: string) {
        this.orsiFoglalkozas.temaUid = temaUid
        this.areTemakOpen = false
        this.alprobak = this.probaRendszer.getAlprobak(
            this.orsiFoglalkozas.probaUid,
            this.orsiFoglalkozas.temaUid,
        )
        this.changeAlproba(first(this.alprobak).uid)
    }

    changeAlproba(alprobaUid: string) {
        this.orsiFoglalkozas.alprobaUid = alprobaUid
        const alproba = this.probaRendszer.getAlproba(alprobaUid)
        this.pontSelection.clear()
        alproba.pontok.forEach(pont => {
            this.pontSelection.set(pont, true)
        })
        this.orsiFoglalkozas.pontok = alproba.pontok
    }

    changePontok(options: MatListOption[]) {
        this.orsiFoglalkozas.pontok = []
        options.forEach((option) => {
            if (option.selected) {
                this.orsiFoglalkozas.pontok.push(option.value)
            }
        })
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
}
