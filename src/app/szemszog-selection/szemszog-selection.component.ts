import { Component, Input, OnDestroy, ViewChild } from '@angular/core'
import { MatButtonToggleGroup } from '@angular/material/button-toggle'
import { delay, filter, Subject, takeUntil } from 'rxjs'
import { Csapat, CsoportType } from '../models/csapat'
import { Layout } from '../models/state'
import { StateService } from '../services/state.service'

@Component({
    selector: 'app-szemszog-selection',
    templateUrl: './szemszog-selection.component.html',
    styleUrls: ['./szemszog-selection.component.scss']
})
export class SzemszogSelectionComponent implements OnDestroy {

    @Input() csapat!: Csapat
    @ViewChild(MatButtonToggleGroup) private buttonGroup!: MatButtonToggleGroup

    Layout = Layout

    changed$ = new Subject<void>
    lastLayout: Layout | undefined
    private readonly destroy$ = new Subject<boolean>()

    beforePrintListener = () => {
        this.lastLayout = this.state.layout
        this.state.layout = Layout.Print
    }

    afterPrintListener = () => {
        this.state.layout = this.lastLayout!
    }

    constructor(
        public readonly state: StateService,
    ) {

        this.state.asObservable().pipe(
            filter(state => state.layout == Layout.Desktop),
            delay(50),
            takeUntil(this.destroy$)
        ).subscribe(() => {
            if (this.buttonGroup) {
                if (state.szemszog.type !== CsoportType.Csapat) {
                    this.buttonGroup.value = state.szemszog
                } else {
                    this.buttonGroup.value = undefined
                }
            }
        })

        window.addEventListener("beforeprint", this.beforePrintListener)
        window.addEventListener("afterprint", this.afterPrintListener)
    }

    ngOnDestroy(): void {
        this.destroy$.next(true)
        this.destroy$.complete()

        window.removeEventListener("beforeprint", this.beforePrintListener)
        window.removeEventListener("afterprint", this.afterPrintListener)
    }
}
