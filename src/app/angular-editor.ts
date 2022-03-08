import { AngularEditorConfig } from '@kolkov/angular-editor'

export function getDefaultAngularEditorConfig(): AngularEditorConfig {
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
}
