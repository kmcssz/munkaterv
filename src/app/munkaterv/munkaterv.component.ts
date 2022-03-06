import { Component, Input, OnInit } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Munkaterv, OrsiFoglalkozas } from '../models/foglalkozas'
import { ActivatedRoute } from '@angular/router'
import { Csapat } from '../models/csapat'
import { CSAPATOK } from '../models/beosztas'
import { formatHungarianDate, formatHungarianTime } from '../date-adaptor'

@Component({
    selector: 'app-munkaterv',
    templateUrl: './munkaterv.component.html',
    styleUrls: ['./munkaterv.component.scss']
})
export class MunkatervComponent implements OnInit {

    csapat!: Csapat
    munkaterv!: Munkaterv
    programs: OrsiFoglalkozas[] = []
    formatHungarianDate = formatHungarianDate
    formatHungarianTime = formatHungarianTime

    constructor(
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        const name = this.route.snapshot.paramMap.get('name')!
        this.csapat = CSAPATOK.find(cs => cs.name === name)!
        const start = this.route.snapshot.paramMap.get('start')!

        // Get this from DB
        this.munkaterv = new Munkaterv(new Date(parseInt(start)))
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.programs, event.previousIndex, event.currentIndex)
    }

    addNewProgram() {
        this.programs.push(new OrsiFoglalkozas())
    }
}
