import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { Alproba, Cserkesz, Pont, Proba, Tema } from '../proba-rendszer/proba-rendszer.models'
import { Alprobak, Cserkeszek, Probak, ProbaRendszer, Temak } from '../proba-rendszer/proba-rendszer'
import { Program } from './program.models'
import { MatListOption, MatSelectionList } from '@angular/material/list'
import { AngularEditorConfig } from '@kolkov/angular-editor'

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
    alprobak!: Alproba[]
    editorConfig: AngularEditorConfig = {
        editable: true,
          spellcheck: true,
          height: 'auto',
          minHeight: '0',
          maxHeight: 'auto',
          width: 'auto',
          minWidth: '0',
          translate: 'yes',
          enableToolbar: true,
          showToolbar: true,
          placeholder: 'Ide írjál valamit...',
          defaultParagraphSeparator: '',
          defaultFontName: '',
          defaultFontSize: '',
          fonts: [
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
          ],
          customClasses: [
          {
            name: 'quote',
            class: 'quote',
          },
          {
            name: 'redText',
            class: 'redText'
          },
          {
            name: 'titleText',
            class: 'titleText',
            tag: 'h1',
          },
        ],
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
          [],
          ['customClasses', 'insertImage', 'toggleEditorMode']
        ]
    }

    constructor() {
    }

    ngOnInit(): void {
        // This will set the probak
        this.changeAge(this.program.age)
        this.changeProba(this.program.proba)
        this.changeTema(this.program.tema)
        this.changeAlproba(this.program.alproba)
    }

    changeAge(age: number) {
        this.program.age = age
        this.program.cserkesz = getCserkeszForAge(age)
        this.probak = getProbakForCserkesz(this.program.cserkesz)
        this.changeProba(this.probak[0])
    }

    changeProba(proba: Proba) {
        this.program.proba = proba
        this.areProbakOpen = false
        this.changeTema(Temak.Cserkeszismeretek)
    }

    changeTema(tema: Tema) {
        this.program.tema = tema
        this.areTemakOpen = false
        this.alprobak = getAlprobakForTema(
            this.program.cserkesz,
            this.program.proba,
            tema,
        )
        this.changeAlproba(this.alprobak[0])
    }

    changeAlproba(alproba: Alproba) {
        this.program.alproba = alproba
        this.program.pontok = alproba.pontok
    }

    changePontok(options: MatListOption[]) {
        options.forEach((option) => {
            (option.value as Pont).selected = option.selected
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

function getAlprobakForTema(cserkesz: Cserkesz, proba: Proba, tema: Tema): Alproba[] {
    return Array.from(ProbaRendszer.get(cserkesz)!.get(proba)!.get(tema)!)
}
