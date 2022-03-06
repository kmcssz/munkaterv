import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsapatSelectionComponent } from './csapat-selection/csapat-selection.component'
import { CsapatTervekComponent } from './csapat-tervek/csapat-tervek.component'
import { MunkatervComponent } from './munkaterv/munkaterv.component'

const routes: Routes = [
  { path: 'csapat/:name/munkaterv/:start', component: MunkatervComponent },
  { path: 'csapat/:name', component: CsapatTervekComponent },
    { path: '', component: CsapatSelectionComponent },
]

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
