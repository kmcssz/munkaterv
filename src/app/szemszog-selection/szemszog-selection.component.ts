import { Component, Inject, Input, OnDestroy, ViewChild } from '@angular/core'
import { MatButtonToggleGroup } from '@angular/material/button-toggle'
import { BehaviorSubject, delay, filter, map, Observable, Subject, takeUntil } from 'rxjs'
import { SZEMSZOG } from '../injection-tokens'
import { Csapat, Csoport, CsoportType, Layout, Szemszog } from '../models/csapat'

@Component({
    selector: 'app-szemszog-selection',
    templateUrl: './szemszog-selection.component.html',
    styleUrls: ['./szemszog-selection.component.scss']
})
export class SzemszogSelectionComponent implements OnDestroy {

    @Input() csapat!: Csapat
    @ViewChild(MatButtonToggleGroup) private buttonGroup!: MatButtonToggleGroup

    Layout = Layout

    layout$: Observable<Layout>
    changed$ = new Subject<void>
    lastLayout: Layout | undefined
    private readonly destroy$ = new Subject<boolean>()

    beforePrintListener = () => {
        const szemszog = this.szemszog$.value
        this.lastLayout = szemszog.layout
        this.szemszog$.next(new Szemszog(
            szemszog.csapat,
            szemszog.csoport,
            Layout.Print,
        ))
    }

    afterPrintListener = () => {
        const szemszog = this.szemszog$.value
        this.szemszog$.next(new Szemszog(
            szemszog.csapat,
            szemszog.csoport,
            this.lastLayout!,
        ))
    }

    constructor(
        @Inject(SZEMSZOG) public szemszog$: BehaviorSubject<Szemszog>,
    ) {
        this.layout$ = this.szemszog$.pipe(map(szemszog => szemszog.layout))

        this.szemszog$.pipe(
            filter(szemszog => szemszog.layout == Layout.Desktop),
            delay(50),
            takeUntil(this.destroy$)
        ).subscribe(() => {
            if (this.buttonGroup) {
                const szemszog = this.szemszog$.value
                if (szemszog.csoport.type !== CsoportType.Csapat) {
                    this.buttonGroup.value = szemszog.csoport
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

    changeCsoport(szemszog: Szemszog, csoport: Csoport) {
        this.szemszog$.next(new Szemszog(this.csapat, csoport, szemszog.layout))
    }
}
