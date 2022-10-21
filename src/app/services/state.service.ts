import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs'
import { Csapat, Csoport } from '../models/csapat'
import { Layout, Theme } from '../models/state'

@Injectable({
    providedIn: 'root'
})
export class StateService {

    private _theme = Theme.Dark
    private _layout = window.innerWidth < 1200 ? Layout.Mobile : Layout.Desktop
    private _szemszog?: Csoport
    private _lastSzemszog?: Csoport
    private _subject = new ReplaySubject<StateService>(1)

    constructor() {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            this._theme = Theme[savedTheme as keyof typeof Theme]
        }
        const savedLayout = localStorage.getItem('layout')
        if (savedLayout) {
            this._layout = Layout[savedLayout as keyof typeof Layout]
        }
        this._subject.next(this)
    }

    asObservable(): Observable<StateService> {
        return this._subject.asObservable()
    }

    get theme() {
        return this._theme
    }
    set theme(theme: Theme) {
        this._theme = theme
        localStorage.setItem('theme', Theme[theme])
        this._subject.next(this)
    }

    get layout() {
        return this._layout
    }
    set layout(layout: Layout) {
        this._layout = layout
        localStorage.setItem('layout', Layout[layout])
        this._subject.next(this)
    }

    get szemszog(): Csoport {
        if (this._szemszog === undefined) {
            throw new Error("Szemszog used before setting");
        }
        return this._szemszog!
    }
    set szemszog(csoport: Csoport) {
        if (this._lastSzemszog !== this._szemszog && this._szemszog !== csoport) {
            this._lastSzemszog = this._szemszog
        }
        this._szemszog = csoport
        localStorage.setItem('szemszog', csoport.name)
        this._subject.next(this)
    }
    get lastSzemszog(): Csoport | undefined {
        return this._lastSzemszog
    }
    restoreSavedSzemszog(csapat: Csapat) {
        const savedSzemszog = localStorage.getItem('szemszog')
        if (!savedSzemszog) {
            this.szemszog = csapat
            return
        }

        const csoport = csapat.find(savedSzemszog)
        if (csoport === undefined) {
            this.szemszog = csapat
            return
        }

        this.szemszog = csoport
    }
}
