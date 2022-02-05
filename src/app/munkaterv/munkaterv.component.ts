import { Component, OnInit } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'

@Component({
    selector: 'app-munkaterv',
    templateUrl: './munkaterv.component.html',
    styleUrls: ['./munkaterv.component.scss']
})
export class MunkatervComponent implements OnInit {

    public programs = [
        '1',
        '2',
    ]

    constructor() { }

    ngOnInit(): void {
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.programs, event.previousIndex, event.currentIndex)
    }

    addNewProgram() {
        this.programs.push('new')
    }
}
