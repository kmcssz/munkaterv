import { InjectionToken } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { Szemszog } from "./models/csapat"

export const SZEMSZOG = new InjectionToken<BehaviorSubject<Szemszog>>('szemszog');
