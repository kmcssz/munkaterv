import { Component, OnInit } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { OrsiProgram } from '../models/munkaterv'

@Component({
    selector: 'app-munkaterv',
    templateUrl: './munkaterv.component.html',
    styleUrls: ['./munkaterv.component.scss']
})
export class MunkatervComponent implements OnInit {

    public programs: OrsiProgram[] = []

    constructor() { }

    ngOnInit(): void {
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.programs, event.previousIndex, event.currentIndex)
    }

    addNewProgram() {
        this.programs.push(new OrsiProgram())
    }
}
