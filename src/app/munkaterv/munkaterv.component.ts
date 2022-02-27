import { Component, Input, OnInit } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Munkaterv, OrsiFoglalkozas } from '../models/foglalkozas'

@Component({
    selector: 'app-munkaterv',
    templateUrl: './munkaterv.component.html',
    styleUrls: ['./munkaterv.component.scss']
})
export class MunkatervComponent implements OnInit {

    @Input()
    munkaterv!: Munkaterv

    public programs: OrsiFoglalkozas[] = []

    constructor() { }

    ngOnInit(): void {
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.programs, event.previousIndex, event.currentIndex)
    }

    addNewProgram() {
        this.programs.push(new OrsiFoglalkozas())
    }
}
