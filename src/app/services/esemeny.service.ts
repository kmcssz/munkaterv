import { Injectable } from '@angular/core'
import { collection, CollectionReference, doc, DocumentData, Firestore, getDocs, setDoc } from 'firebase/firestore'
import { Observable, ReplaySubject } from 'rxjs'
import { Esemeny } from '../models/foglalkozas'
import { ensure } from '../utils'

@Injectable({
    providedIn: 'root'
})
export class EsemenyService {

    private esemenyCollection?: CollectionReference<DocumentData>
    private readonly _esemenyek$ = new ReplaySubject<Esemeny[]>(1)

    constructor(
        private readonly firestore: Firestore,
    ) {
    }

    initilize(csapat: string) {

        const year = new Date().getFullYear()
        const path = `${csapat}/esemenyek/${year}`
        console.log("Creating Firebase Collection", path)
        this.esemenyCollection = collection(this.firestore, path)

        this.refresh()
    }

    get esemenyek$(): Observable<Esemeny[]> {
        return this._esemenyek$
    }

    refresh() {
        getDocs(ensure(this.esemenyCollection))
            .then(snapshot => {
                console.log(`Received ${snapshot.size} esemenyek from Firebase`)
                const fogak = snapshot.docs.map(doc => doc.data()) as Esemeny[]
                this._esemenyek$.next(fogak)
            })
    }

    addEsemeny(esemeny: Esemeny) {
        setDoc(doc(ensure(this.esemenyCollection), `${esemeny.date}`), esemeny)
        this.refresh()
    }
}
