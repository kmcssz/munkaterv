import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CSAPATOK } from '../models/beosztas'
import { Csapat } from '../models/csapat'

@Component({
    selector: 'app-csapat-terv',
    templateUrl: './csapat-terv.component.html',
    styleUrls: ['./csapat-terv.component.scss']
})
export class CsapatTervComponent implements OnInit {

    csapat!: Csapat

    constructor(
        private route: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
        const name = this.route.snapshot.paramMap.get('name')!
        this.csapat = CSAPATOK.find((csapat) => csapat.name == name)!
    }
}
