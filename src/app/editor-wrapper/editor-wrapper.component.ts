import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { Observable, Subject, takeUntil } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'

@Component({
    selector: 'app-editor-wrapper',
    templateUrl: './editor-wrapper.component.html',
    styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent implements OnInit, OnDestroy {

    @Input() editable$!: Observable<boolean>
    @Input() leiras!: string
    @Output() leirasChange = new EventEmitter<string>()

    editorConfig = defaultEditorConfig()
    private destroy$ = new Subject<boolean>()

    readonly uuid = uuidv4()

    ngOnInit(): void {
        // TODO: Take until
        this.editable$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(editable => {
            this.editorConfig.editable = editable
            this.editorConfig.showToolbar = editable
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next(true)
        this.destroy$.complete()
    }

    changeLeiras(leiras: string) {
        this.leiras = leiras
        this.leirasChange.next(leiras)
    }
}

function defaultEditorConfig(): AngularEditorConfig {
    return {
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
        defaultFontName: 'Comic Sans MS',
        defaultFontSize: '5',
        fonts: [
            { class: 'comic-sans-ms', name: 'Comic Sans MS' },
            { class: 'arial', name: 'Arial' },
            { class: 'times-new-roman', name: 'Times New Roman' },
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
