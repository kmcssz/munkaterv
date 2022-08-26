import { formatDate } from '@angular/common'
import { Injectable } from '@angular/core'
import { Foglalkozas, FoglalkozasType, Terv } from './models/foglalkozas'

function addFn(a: number, b: number): number {
    return a + b
}

@Injectable({
    providedIn: 'root'
})
export class FoglalkozasService {

    private foglalkozasok: Foglalkozas[] = []

    constructor() { }

    getByUuid(uuid: string): Foglalkozas {
        return this.foglalkozasok.filter(fog => fog.uuid === uuid)[0]
    }

    getByType(type: FoglalkozasType): Foglalkozas[] {
        return this.foglalkozasok.filter(fog => fog.type === type)
    }

    getChildren(terv: Terv): Foglalkozas[] {
        return terv.foglalkozasok.map(uuid => this.getByUuid(uuid))
    }

    putFoglalkozas(foglalkozas: Foglalkozas): string {
        this.foglalkozasok.push(foglalkozas)
        return foglalkozas.uuid
    }

    addChild(terv: Terv, child: Foglalkozas) {
        this.putFoglalkozas(child)
        terv.foglalkozasok.push(child.uuid)
    }

    computeRemainingDuration(terv: Terv): number {
        return terv.duration - this.computeConsumedDuration(terv)
    }

    computeConsumedDuration(terv: Terv): number {
        return this.getChildren(terv)
            .map(fog => fog.duration)
            .reduce(addFn, 0)
    }

    computeElapsedBeforeDuration(terv: Terv, foglalkozas: Foglalkozas): number {
        let fogFound = false
        return this.getChildren(terv)
            .filter(fog => {
                if (fog.uuid === foglalkozas.uuid) {
                    fogFound = true
                }
                return !fogFound
            })
            .map(fog => fog.duration)
            .reduce(addFn, 0)
    }
}
