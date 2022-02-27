import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CSAPATOK } from '../models/beosztas'
import { Csapat } from '../models/csapat'
import { Munkaterv } from '../models/foglalkozas'

@Component({
    selector: 'app-csapat-tervek',
    templateUrl: './csapat-tervek.component.html',
    styleUrls: ['./csapat-tervek.component.scss']
})
export class CsapatTervekComponent implements OnInit {

    csapat!: Csapat
    munkatervek: Munkaterv[] = []

    constructor(
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        const name = this.route.snapshot.paramMap.get('name')!
        this.csapat = CSAPATOK.find((csapat) => csapat.name == name)!
    }

    addNewMunkaterv(): void {
        this.munkatervek.push(new Munkaterv(new Date()))
    }
}
