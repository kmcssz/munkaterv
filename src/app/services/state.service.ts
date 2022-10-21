import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs'
import { Csoport } from '../models/csapat'
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
        this._subject.next(this)
    }

    get layout() {
        return this._layout
    }
    set layout(layout: Layout) {
        this._layout = layout
        this._subject.next(this)
    }

    get szemszog(): Csoport {
        if (this._szemszog === undefined) {
            throw new Error("Szemszog used before setting");
        }
        return this._szemszog!
    }
    set szemszog(csoport: Csoport) {
        this._lastSzemszog = this._szemszog
        this._szemszog = csoport
        this._subject.next(this)
    }
    get lastSzemszog(): Csoport | undefined {
        return this._lastSzemszog
    }
}
