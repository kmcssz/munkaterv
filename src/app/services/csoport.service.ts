import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Csapat, Csoport, Korosztaj, Ors, Raj } from '../models/csapat'

@Injectable({
    providedIn: 'root'
})
export class CsoportService {

    public readonly csapatok = [
        new Csapat(
            "Montreal",
            "Montreal",
            [
                new Raj(
                    "Katicabogár",
                    "Ladybug",
                    Korosztaj.KisCserkesz,
                    [
                        new Ors("Vizsla", "Dog"),
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
                        new Ors("Rovar", "Beetle"),
                        new Ors("Bambusz", "Bamboo"),
                    ],
                ),
            ],
        ),
        new Csapat(
            "Garfield",
            "Garfield",
            [
                new Raj(
                    "Hosszúlábú Gólya",
                    "Stork",
                    Korosztaj.KisCserkesz,
                    [
                        new Ors("Rózsa", "Rose"),
                        new Ors("Kobra", "Snake"),
                        new Ors("Turul", "Eagle"),
                        new Ors("Delfin", "Dolphin"),
                        new Ors("Majom", "Monkey"),
                        new Ors("Pillangó", "Butterfly"),
                    ],
                ),
                new Raj(
                    "Cserkész",
                    "Cserkesz",
                    Korosztaj.Cserkesz,
                    [
                        new Ors("Vízicsiko", "Seahorse"),
                        new Ors("Nyílméreg Béka", "PoisonFrog"),
                    ],
                ),
            ],
        ),
    ]

    private csapatName?: string

    constructor(
        route: ActivatedRoute,
    ) {
        route.params.subscribe(params => {
            this.csapatName = params['csapat'] ?? undefined
        })
    }

    getCsoport(name: string): Csoport {

        const csapat = this.getCsapat()
        if (csapat.name === name) {
            return csapat
        }

        const foundRaj = csapat.rajok.filter(raj => raj.name === name)
        if (foundRaj.length !== 0) {
            return foundRaj[0]
        }

        const foundOrs = csapat.rajok.flatMap(raj => raj.orsok).filter(ors => ors.name === name)
        if (foundOrs.length !== 0) {
            return foundOrs[0]
        }
        throw Error(`Unable to find csoport ${name}`)
    }

    getCsapat(): Csapat {
        if (this.csapatName === undefined) {
            throw new Error("Csapat not in route");
        }
        return this.csapatok.find(csapat => csapat.name === this.csapatName)!
    }
}
