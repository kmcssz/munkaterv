import { Component, Input, OnInit } from '@angular/core'
import { MatListOption } from '@angular/material/list'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { Cserkeszek, ProbaRendszer, Temak } from '../models/rendszer'
import { Alproba, Cserkesz, Proba, Tema } from '../models/proba'
import { OrsiProgram } from '../models/munkaterv'

@Component({
    selector: 'app-program',
    templateUrl: './orsi-program.component.html',
    styleUrls: ['./orsi-program.component.scss']
})
export class OrsiProgramComponent implements OnInit {

    @Input()
    program!: OrsiProgram

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
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
            [
                'strikeThrough',
                'subscript',
                'superscript',
                'justifyLeft',
                'justifyCenter',
                'justifyRight',
                'justifyFull',
                'textColor',
                'backgroundColor',
                'customClasses',
                'insertImage',
                'removeFormat',
                'toggleEditorMode',
            ]
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
        this.temak = getTemakForProba(this.program.cserkesz, proba)
        this.changeTema(this.temak[0])
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
        this.program.setPontok(alproba.pontok)
    }

    changePontok(options: MatListOption[]) {
        // this.editorConfig.editable = !this.editorConfig.editable
        // this.editorConfig.showToolbar = !this.editorConfig.showToolbar
        options.forEach((option) => {
            this.program.pontSelection.set(option.value, option.selected)
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
