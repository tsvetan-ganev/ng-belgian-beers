import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BeersListComponent } from './beers-list/beers-list.component'

const routes: Routes = [
  {
    path: '',
    component: BeersListComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
