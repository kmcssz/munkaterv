import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CsapatSelectionComponent } from './csapat-selection/csapat-selection.component'
import { CsapatNaptarComponent } from './csapat-naptar/csapat-naptar.component'
import { CsapatTervComponent } from './tervek/csapat-terv/csapat-terv.component'

const routes: Routes = [
    { path: 'csapat/:name/munkaterv/:start', component: CsapatTervComponent },
    { path: 'csapat/:name', component: CsapatNaptarComponent },
    { path: '', component: CsapatSelectionComponent },
]

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
