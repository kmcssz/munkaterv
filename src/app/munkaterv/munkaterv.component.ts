import { Component, Input, OnInit } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { CsapatFoglalkozas, Foglalkozas, Munkaterv, OrsiFoglalkozas, RajFoglalkozas } from '../models/foglalkozas'
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
        moveItemInArray(this.munkaterv.foglalkozasok, event.previousIndex, event.currentIndex)
    }

    addCsapatFoglalkozas() {
        this.munkaterv.foglalkozasok.push(new CsapatFoglalkozas())
    }

    addRajFoglalkozas() {
        this.munkaterv.foglalkozasok.push(new RajFoglalkozas())
    }

    addOrsiFoglalkozas() {
        this.munkaterv.foglalkozasok.push(new OrsiFoglalkozas())
    }

    computeTime(foglalkozas: Foglalkozas): string {
        const minutesToMillis = 60 * 1000
        let timeMillis = this.munkaterv.start.getTime()
        const foglalkozasIndex = this.munkaterv.foglalkozasok.findIndex(f => f === foglalkozas)
        for (let i = 0; i <= foglalkozasIndex; ++i) {
            timeMillis += this.munkaterv.foglalkozasok[i].duration * minutesToMillis
        }
        return formatHungarianTime(new Date(timeMillis))
    }
}
