import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { v4 as uuidv4 } from 'uuid'

@Component({
    selector: 'app-editor-wrapper',
    templateUrl: './editor-wrapper.component.html',
    styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent implements OnInit {

    @Input() editable!: boolean
    @Input() leiras!: string
    @Output() leirasChange = new EventEmitter<string>()

    editorConfig!: AngularEditorConfig

    readonly uuid = uuidv4()

    constructor() {
    }

    ngOnInit(): void {
        this.configure()
    }

    changeLeiras(leiras: string) {
        this.leiras = leiras
        this.leirasChange.next(leiras)
    }

    configure() {
        this.editorConfig = {
            editable: this.editable,
            spellcheck: true,
            height: 'auto',
            minHeight: '0',
            maxHeight: 'auto',
            width: 'auto',
            minWidth: '0',
            translate: 'yes',
            enableToolbar: true,
            showToolbar: this.editable,
            placeholder: 'Ide írjál valamit...',
            defaultParagraphSeparator: '',
            defaultFontName: 'Comic Sans MS',
            defaultFontSize: '5',
            fonts: [
                { class: 'arial', name: 'Arial' },
                { class: 'times-new-roman', name: 'Times New Roman' },
                { class: 'comic-sans-ms', name: 'Comic Sans MS' }
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
    }
}
