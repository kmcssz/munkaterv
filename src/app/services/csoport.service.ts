import { Injectable } from '@angular/core'
import { Csapat, Csoport, Korosztaj, Ors, Raj } from '../models/csapat'

@Injectable({
    providedIn: 'root'
})
export class CsoportService {

    csapat = new Csapat(
        "Montreal",
        "Montreal",
        [
            new Raj(
                "Katicabogár",
                "Ladybug",
                Korosztaj.KisCserkesz,
                [
                    new Ors("Bagoly", "Owl"),
                    new Ors("Méhecske", "Bee"),
                ],
            ),
            new Raj(
                "Munkács",
                "Castle",
                Korosztaj.Cserkesz,
                [
                    new Ors("Szunyog", "Mosquito"),
                    new Ors("Páva", "Peacock"),
                ],
            ),
            new Raj(
                "Besztercebánya",
                "Mine",
                Korosztaj.Cserkesz,
                [
                    new Ors("Róka", "Fox"),
                    new Ors("Bambusz", "Bamboo"),
                ],
            ),
        ],
    )

    constructor() { }

    getCsoport(name: string): Csoport {
        if (this.csapat.name === name) {
            return this.csapat
        }

        const foundRaj = this.csapat.rajok.filter(raj => raj.name === name)
        if (foundRaj.length !== 0) {
            return foundRaj[0]
        }

        const foundOrs = this.csapat.rajok.flatMap(raj => raj.orsok).filter(ors => ors.name === name)
        if (foundOrs.length !== 0) {
            return foundOrs[0]
        }
        throw Error(`Unable to find csoport ${name}`)
    }

    getCsapat(): Csapat {
        //const name = this.route.snapshot.paramMap.get('name')!
        return this.csapat
    }
}
