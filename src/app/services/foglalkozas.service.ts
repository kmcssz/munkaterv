import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { addDoc, CollectionReference, deleteDoc, doc, DocumentData, Firestore, setDoc, updateDoc } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'
import { filter, map, Observable, ReplaySubject, Subject, take } from 'rxjs'
import { createTerv, Foglalkozas, FoglalkozasType, Terv } from '../models/foglalkozas'
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

    initilize(csapat: string, start: number) {

        const path = `${csapat}/foglalkozasok/${start}`
        console.log("Creating Firebase Collection", path)
        this.fogCollection = collection(this.firestore, path)

        this.foglalkozasok$.pipe(
            filter(fogak => fogak.length === 0),
            take(1)
        ).subscribe(_ => {
            this.putFoglalkozas(createTerv(FoglalkozasType.CsapatTerv, csapat, 120))
            this.refresh()
        }) // TODO: Need to unsubscribe

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
        setDoc(doc(ensure(this.fogCollection), foglalkozas.uuid), foglalkozas)
        if (refresh) {
            this.refresh()
        }
        return foglalkozas.uuid
    }

    addChild(terv: Terv, child: Foglalkozas) {
        terv.foglalkozasok.push(this.putFoglalkozas(child, false))
        setDoc(doc(ensure(this.fogCollection), terv.uuid), terv)
        this.refresh()
    }

    deleteFoglalkozas(foglalkozas: Foglalkozas, terv: Terv, refresh: boolean = true): string {
        terv.foglalkozasok.splice(terv.foglalkozasok.indexOf(foglalkozas.uuid), 1)
        this.putFoglalkozas(terv)
        deleteDoc(doc(ensure(this.fogCollection), foglalkozas.uuid))

        if (refresh) {
            this.refresh()
        }
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
