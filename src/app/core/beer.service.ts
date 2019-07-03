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
}
