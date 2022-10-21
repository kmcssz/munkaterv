import { Csoport } from "./csapat"

export enum Layout {
    Desktop,
    Mobile,
    Print,
}

export enum Theme {
    Dark,
    Light,
    Print,
}

export interface State {
    szemszog: Csoport
    layout: Layout
    theme: Theme
}
