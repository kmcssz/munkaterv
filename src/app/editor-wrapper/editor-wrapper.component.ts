import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { Component, EventEmitter, Inject, Input, OnDestroy, Output, ViewChild } from '@angular/core'
import { map, Observable } from 'rxjs'
import { SZEMSZOG } from '../injection-tokens'
import { Layout, Szemszog } from '../models/csapat'

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

    Layout = Layout

    layout$: Observable<Layout>

    constructor(
        @Inject(SZEMSZOG) readonly szemszog$: Observable<Szemszog>
    ) {
        this.layout$ = this.szemszog$.pipe(map(szemszog => szemszog.layout))
    }
}
