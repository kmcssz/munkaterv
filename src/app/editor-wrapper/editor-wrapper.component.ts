import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-editor-wrapper',
    templateUrl: './editor-wrapper.component.html',
    styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent {

    @Input() editable$!: Observable<boolean>
    @Input() leiras!: string
    @Output() leirasChange = new EventEmitter<string>()

    @ViewChild('textArea') textArea!: CdkTextareaAutosize
}
