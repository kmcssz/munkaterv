import { Injectable } from '@angular/core'
import { CollectionReference, deleteDoc, doc, DocumentData, Firestore, setDoc } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'
import { map, Observable, ReplaySubject } from 'rxjs'
import { Foglalkozas, FoglalkozasType, Terv } from '../models/foglalkozas'
import { ensure, first } from '../utils'

function addFn(a: number, b: number): number {
    return a + b
}

@Injectable({
    providedIn: 'root'
})
export class FoglalkozasService {

    private fogCollection?: CollectionReference<DocumentData>
    private readonly _foglalkozasok$ = new ReplaySubject<Foglalkozas[]>(1)

    constructor(
        private readonly firestore: Firestore,
    ) {
    }

    initilize(csapat: string, date: string) {

        const path = `${csapat}/foglalkozasok/${date}`
        console.log("Creating Firebase Collection", path)
        this.fogCollection = collection(this.firestore, path)
        this.refresh()
    }

    get foglalkozasok$(): Observable<Foglalkozas[]> {
        return this._foglalkozasok$
    }

    refresh() {
        getDocs(ensure(this.fogCollection))
            .then(snapshot => {
                console.log(`Received ${snapshot.size} foglalkozasok from Firebase`)
                const fogak = snapshot.docs.map(doc => doc.data()) as Foglalkozas[]
                this._foglalkozasok$.next(fogak)
            })
    }

    filterByUuid(uuid: string): Observable<Foglalkozas> {
        return this.foglalkozasok$.pipe(
            map(fogak => filterArrayUuid(fogak, uuid)),
        )
    }

    getByType(type: FoglalkozasType): Observable<Foglalkozas[]> {
        return this.foglalkozasok$.pipe(
            map(fogak => filterArrayType(fogak, type)),
        )
    }

    filterChildren(terv: Terv): Observable<Foglalkozas[]> {
        return this._foglalkozasok$.pipe(
            map(fogak => filterArrayUuids(fogak, terv.foglalkozasok))

        )
    }

    putFoglalkozas(foglalkozas: Foglalkozas, refresh: boolean = false): string {
        // console.log("Saving foglalkozas", foglalkozas)
        setDoc(doc(ensure(this.fogCollection), foglalkozas.uuid), foglalkozas)
            .then(() => {
                // console.log("Saved foglalkozas", foglalkozas)
                if (refresh) {
                    this.refresh()
                }
            }).catch(reason => {
                console.error("Error saving foglalkozas", reason)
            })
        return foglalkozas.uuid
    }

    addChild(terv: Terv, child: Foglalkozas, refresh: boolean = true) {
        terv.foglalkozasok.push(this.putFoglalkozas(child, false))
        setDoc(doc(ensure(this.fogCollection), terv.uuid), terv)
            .then(() => {
                if (refresh) {
                    this.refresh()
                }
            })
    }

    deleteFoglalkozas(foglalkozas: Foglalkozas, terv: Terv, refresh: boolean = true): string {
        terv.foglalkozasok.splice(terv.foglalkozasok.indexOf(foglalkozas.uuid), 1)
        this.putFoglalkozas(terv, false)
        deleteDoc(doc(ensure(this.fogCollection), foglalkozas.uuid))
            .then(() => {
                if (refresh) {
                    this.refresh()
                }
            })
        return foglalkozas.uuid
    }
}

function filterArrayUuid(fogak: Foglalkozas[], uuid: string): Foglalkozas {
    return first(filterArrayUuids(fogak, [uuid]))
}

function filterArrayUuids(fogak: Foglalkozas[], uuids: string[]): Foglalkozas[] {
    const foglalkozasok: Foglalkozas[] = []
    uuids.forEach( uuid => {
        const foundFoglalkozas = fogak.find(fog => fog.uuid === uuid)
        if (foundFoglalkozas !== undefined) {
            foglalkozasok.push(foundFoglalkozas)
        }
    })
    return foglalkozasok

    //Not sorted: return fogak.filter(fog => uuids.includes(fog.uuid))
}

function filterArrayType(fogak: Foglalkozas[], type: string): Foglalkozas[] {
    return fogak.filter(fog => fog.type === type)
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

    let total = 0
    for (let child of children) {
        if (child.uuid === uuid) {
            return total
        }
        total += child.duration
    }
    return total

    // let fogFound = false
    // return children
    //     .filter(fog => {
    //         if (fog.uuid === uuid) {
    //             fogFound = true
    //         }
    //         return !fogFound
    //     })
    //     .map(fog => fog.duration)
    //     .reduce(addFn, 0)
}
