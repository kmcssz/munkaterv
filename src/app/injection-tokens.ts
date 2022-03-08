import { InjectionToken } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { Rang } from "./models/csapat"

export const RANG = new InjectionToken<BehaviorSubject<Rang>>('rang');
