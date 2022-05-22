import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CsapatSelectionComponent } from './csapat-selection/csapat-selection.component'
import { CsapatNaptarComponent } from './csapat-naptar/csapat-naptar.component'
import { MunkatervComponent } from './tervek/munkaterv/munkaterv.component'

const routes: Routes = [
    { path: 'csapat/:name/munkaterv/:start', component: MunkatervComponent },
    { path: 'csapat/:name', component: CsapatNaptarComponent },
    { path: '', component: CsapatSelectionComponent },
]

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
