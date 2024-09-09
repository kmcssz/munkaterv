import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { map, Observable, take } from 'rxjs'
import { CsoportType } from 'src/app/models/csapat'
import { Layout } from 'src/app/models/state'
import { FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { StateService } from 'src/app/services/state.service'
import { ConcurrentTerv, Foglalkozas, FoglalkozasType, OrsiFoglalkozas, Terv } from '../../models/foglalkozas'

const foglalkozasTypeToCssStyle = new Map<FoglalkozasType, string>(
    [
        [FoglalkozasType.CsapatTerv, 'csapat-terv'],
        [FoglalkozasType.RajTerv, 'raj-terv'],
        [FoglalkozasType.OrsiTerv, 'orsi-terv'],
        [FoglalkozasType.CsapatFoglalkozas, 'csapat-foglalkozas'],
        [FoglalkozasType.RajFoglalkozas, 'raj-foglalkozas'],
        [FoglalkozasType.OrsiFoglalkozas, 'orsi-foglalkozas'],
    ]
)

@Component({
    selector: 'app-foglalkozas',
    templateUrl: './foglalkozas.component.html',
    styleUrls: ['./foglalkozas.component.scss']
})
export class FoglalkozasComponent implements OnChanges {

    FoglalkozasType = FoglalkozasType

    @Input() start!: Date
    @Input() foglalkozas!: Foglalkozas

    Layout = Layout

    terv?: Terv
    orsiFoglalkozas?: OrsiFoglalkozas

    foglalkozasCssStyle?: string
    wrapInCard!: boolean
    editableDuration$!: Observable<boolean>

    constructor(
        private fogSor: FoglalkozasService,
        public state: StateService,
    ) {
    }

    ngOnChanges(_: SimpleChanges): void {

        this.foglalkozasCssStyle = foglalkozasTypeToCssStyle.get(this.foglalkozas.type as FoglalkozasType)
        this.editableDuration$ = this.state.asObservable().pipe(
            map(state => canEditDuration(
                state.szemszog.type,
                this.foglalkozas.type as FoglalkozasType)
            ),
        )
        switch(this.foglalkozas.type) {
            case FoglalkozasType.CsapatTerv:
                this.terv = this.foglalkozas as Terv
                this.wrapInCard = false
                break;
            case FoglalkozasType.RajTerv:
                this.terv = this.foglalkozas as Terv
                this.wrapInCard = false
                break;
            case FoglalkozasType.OrsiTerv:
                this.terv = this.foglalkozas as Terv
                this.wrapInCard = false
                break;
            case FoglalkozasType.ConcurrentTervek:
                const concurrentTerv = this.foglalkozas as ConcurrentTerv
                this.terv = concurrentTerv
                this.foglalkozasCssStyle = foglalkozasTypeToCssStyle.get(concurrentTerv.subtype)
                this.wrapInCard = true
                this.editableDuration$ = this.state.asObservable().pipe(
                    map(state => canEditDuration(
                            state.szemszog.type,
                            concurrentTerv.subtype,
                        )
                    ),
                )
                break;
            case FoglalkozasType.CsapatFoglalkozas:
                this.wrapInCard = true
                break;
            case FoglalkozasType.RajFoglalkozas:
                this.wrapInCard = true
                break;
            case FoglalkozasType.OrsiFoglalkozas:
                this.orsiFoglalkozas = this.foglalkozas as OrsiFoglalkozas
                this.wrapInCard = true
                break;
            default:
                throw Error(`Unknown FoglalkozasType: ${this.foglalkozas.type}`)
        }
    }

    durationChanged() {
        if (this.foglalkozas.type === FoglalkozasType.ConcurrentTervek) {
            this.fogSor.filterChildren(this.terv!)
                .pipe(take(1))
                .subscribe(tervek => {
                    tervek.forEach(terv => {
                        terv.duration = this.foglalkozas.duration
                        this.fogSor.putFoglalkozas(terv, false)
                    })
                    this.fogSor.putFoglalkozas(this.foglalkozas, true)
                })
        } else {
            this.fogSor.putFoglalkozas(this.foglalkozas, true)
        }
    }
}

function canEditDuration(csoportType: CsoportType, foglalkozasType: FoglalkozasType): boolean {
    return csoportType === CsoportType.Csapat && [
            FoglalkozasType.CsapatTerv,
            FoglalkozasType.CsapatFoglalkozas,
            FoglalkozasType.RajTerv,
        ].includes(foglalkozasType) ||

        csoportType === CsoportType.Raj && [
            FoglalkozasType.RajFoglalkozas,
            FoglalkozasType.OrsiTerv,
        ].includes(foglalkozasType) ||

        csoportType === CsoportType.Ors && [
            FoglalkozasType.OrsiFoglalkozas,
        ].includes(foglalkozasType)
}
