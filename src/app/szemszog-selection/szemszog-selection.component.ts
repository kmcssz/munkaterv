import { AfterViewInit, Component, Inject, Input, OnDestroy, ViewChild } from '@angular/core'
import { MatButtonToggleGroup } from '@angular/material/button-toggle'
import { filter, Subject, takeUntil } from 'rxjs'
import { SZEMSZOG } from '../injection-tokens'
import { Csapat, Csoport, CsoportType, Szemszog } from '../models/csapat'

@Component({
    selector: 'app-szemszog-selection',
    templateUrl: './szemszog-selection.component.html',
    styleUrls: ['./szemszog-selection.component.scss']
})
export class SzemszogSelectionComponent implements AfterViewInit, OnDestroy {

    @Input() csapat!: Csapat
    @ViewChild(MatButtonToggleGroup) private buttonGroup!: MatButtonToggleGroup

    private readonly destroy$ = new Subject<boolean>()

    constructor(
        @Inject(SZEMSZOG) public szemszog$: Subject<Szemszog>,
    ) {
    }

    ngAfterViewInit(): void {
        this.szemszog$.pipe(
            filter(szemszog => szemszog.csoport.type === CsoportType.Csapat),
            takeUntil(this.destroy$)
        ).subscribe(() => this.buttonGroup.value = undefined)
    }

    ngOnDestroy(): void {
        this.destroy$.next(true)
        this.destroy$.complete()
    }

    changeCsoport(csoport: Csoport) {
        this.szemszog$.next(new Szemszog(this.csapat, csoport))
    }
}
