import { Injectable } from '@angular/core'
import { data as beersData } from './../../assets/beers.json'
import { Beer } from './interfaces'

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private beers: Beer[] = beersData

  constructor() {}

  getAll() {
    return this.beers
  }

  editBeer(beerId: string, updates: Partial<Beer>) {
    const beerToEdit = this.beers.find(b => b.id === beerId)

    if (!beerToEdit) {
      return
    }

    if (updates.name) {
      beerToEdit.name = updates.name
    }

    if (updates.description) {
      beerToEdit.description = updates.description
    }
  }
}
