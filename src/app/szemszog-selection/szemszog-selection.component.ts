import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatButtonToggleGroup } from '@angular/material/button-toggle'
import { filter, Subject, takeUntil } from 'rxjs'
import { SZEMSZOG } from '../injection-tokens'
import { Csapat, Csoport, CsoportType, Szemszog } from '../models/csapat'

@Component({
    selector: 'app-szemszog-selection',
    templateUrl: './szemszog-selection.component.html',
    styleUrls: ['./szemszog-selection.component.scss']
})
export class SzemszogSelectionComponent implements OnInit, OnDestroy {

    @Input() csapat!: Csapat
    @ViewChild(MatButtonToggleGroup) private buttonGroup!: MatButtonToggleGroup

    private distroy$ = new Subject<boolean>()

    constructor(
        @Inject(SZEMSZOG) public szemszog$: Subject<Szemszog>,
    ) {
    }

    ngOnInit(): void {
        this.szemszog$.next(new Szemszog(this.csapat))

        this.szemszog$.pipe(
            filter(szemszog => szemszog.csoport.type === CsoportType.Csapat),
            takeUntil(this.distroy$)
        ).subscribe(() => this.buttonGroup.value = undefined)
    }

    ngOnDestroy(): void {
        this.distroy$.next(true)
        this.distroy$.complete()
    }

    changeCsoport(csoport: Csoport) {
        this.szemszog$.next(new Szemszog(csoport))
    }
}
