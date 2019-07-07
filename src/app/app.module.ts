import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BeersListComponent } from './beers-list/beers-list.component'
import { CoreModule } from './core/core.module'
import { MaterialModule } from './material/material.module'
import { BeerListItemComponent } from './beers-list/beer-list-item/beer-list-item.component'

@NgModule({
  declarations: [AppComponent, BeersListComponent, BeerListItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
