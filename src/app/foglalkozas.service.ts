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

    getById(id: number): Foglalkozas {
        return this.foglalkozasok.filter(fog => fog.id === id)[0]
    }

    getByType(type: FoglalkozasType): Foglalkozas[] {
        return this.foglalkozasok.filter(fog => fog.type === type)
    }

    getChildren(terv: Terv): Foglalkozas[] {
        return terv.foglalkozasok.map(id => this.getById(id))
    }

    putFoglalkozas(foglalkozas: Foglalkozas): number {
        this.foglalkozasok.push(foglalkozas)
        return foglalkozas.id
    }

    addChild(terv: Terv, child: Foglalkozas) {
        this.putFoglalkozas(child)
        terv.foglalkozasok.push(child.id)
    }

    computeRemainingDuration(terv: Terv): number {
        return terv.duration - this.computeConsumedDuration(terv)
    }

    computeConsumedDuration(terv: Terv): number {
        return this.getChildren(terv)
            .map(fog => fog.duration)
            .reduce(addFn)
    }

    computeElapsedBeforeDuration(terv: Terv, foglalkozas: Foglalkozas): number {
        let fogFound = false
        return this.getChildren(terv)
            .filter(fog => {
                if (fog.id === foglalkozas.id) {
                    fogFound = true
                }
                return !fogFound
            })
            .map(fog => fog.duration)
            .reduce(addFn)
    }
}
