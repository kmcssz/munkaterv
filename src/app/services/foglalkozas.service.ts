import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { CollectionReference } from 'firebase/firestore'
import { filter, map, Observable } from 'rxjs'
import { Foglalkozas, FoglalkozasType, Terv } from '../models/foglalkozas'
import { first } from '../utils'
import { CsoportService } from './csoport.service'

function addFn(a: number, b: number): number {
    return a + b
}

@Injectable({
    providedIn: 'root'
})
export class FoglalkozasService {

    private foglalkozasCollection: AngularFirestoreCollection<Foglalkozas>
    private foglalkozasok$: Observable<Foglalkozas[]>

    constructor(
        firestore: AngularFirestore,
        csopSor: CsoportService,
    ) {
        const csapat = csopSor.getCsapat().name //TODO: should be a stream too
        const start = 14535232 //TODO
        this.foglalkozasCollection = firestore.collection<Foglalkozas>(`${csapat}/${start}/foglalkozasok`)
        this.foglalkozasok$ = this.foglalkozasCollection.valueChanges()
    }

    filterByUuid(uuid: string): Observable<Foglalkozas> {
        return this.foglalkozasok$.pipe(
            map(fogak => filterArrayUuid(fogak, uuid)),
        )
    }

    // getByType(type: FoglalkozasType): Foglalkozas[] {
    //     return this.foglalkozasok.filter(fog => fog.type === type)
    // }

    filterChildren(terv: Terv): Observable<Foglalkozas[]> {
        return this.foglalkozasok$.pipe(
            map(fogak => filterArrayUuids(fogak, terv.foglalkozasok))
        )
    }

    putFoglalkozas(foglalkozas: Foglalkozas): string {
        this.foglalkozasCollection.add(foglalkozas)
        return foglalkozas.uuid
    }

    addChild(terv: Terv, child: Foglalkozas) {
        this.putFoglalkozas(child)
        terv.foglalkozasok.push(child.uuid)
    }
}

function filterArrayUuid(fogak: Foglalkozas[], uuid: string): Foglalkozas {
    return first(filterArrayUuids(fogak, [uuid]))
}

function filterArrayUuids(fogak: Foglalkozas[], uuids: string[]): Foglalkozas[] {
    return fogak.filter(fog => uuids.includes(fog.uuid))
}

export function computeRemainingDuration(terv: Terv, children: Foglalkozas[]): number {
    return terv.duration - computeConsumedDuration(children)
}

export function computeConsumedDuration(children: Foglalkozas[]): number {
    return children
        .map(fog => fog.duration)
        .reduce(addFn, 0)
}

export function computeElapsedBeforeDuration(children: Foglalkozas[], uuid: string): number {
    let fogFound = false
    return children
        .filter(fog => {
            if (fog.uuid === uuid) {
                fogFound = true
            }
            return !fogFound
        })
        .map(fog => fog.duration)
        .reduce(addFn, 0)
}
