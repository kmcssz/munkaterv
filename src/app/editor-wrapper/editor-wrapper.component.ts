import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { Layout } from '../models/state'
import { StateService } from '../services/state.service'

@Component({
    selector: 'app-editor-wrapper',
    templateUrl: './editor-wrapper.component.html',
    styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent {

    @Input() editable!: boolean
    @Input() leiras!: string
    @Output() leirasChange = new EventEmitter<string>()
    @ViewChild('textArea') textArea!: CdkTextareaAutosize

    Layout = Layout

    constructor(
        public state: StateService,
    ) {
    }
}
