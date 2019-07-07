import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatSelectChange, MatSliderChange } from '@angular/material'
import { BeerService } from '../core/beer.service'
import { Beer } from '../core/interfaces'

const sortByNameAscending = (a: Beer, b: Beer) => a.name.localeCompare(b.name)
const sortByNameDescending = (a: Beer, b: Beer) => b.name.localeCompare(a.name)

const sortByAlcoholPercentageAscending = (a: Beer, b: Beer) => (a.alcohol > b.alcohol ? 1 : -1)
const sortByAlcoholPercentageDescending = (a: Beer, b: Beer) => (b.alcohol > a.alcohol ? 1 : -1)

@Component({
  selector: 'app-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.scss']
})
export class BeersListComponent implements OnInit {
  private beersOriginal: Beer[] = []

  public beersList: Beer[] = []

  public sortingOptions = [
    {
      label: 'Name Ascending',
      key: 'name_asc',
      sortFunction: sortByNameAscending
    },
    {
      label: 'Name Descending',
      key: 'name_desc',
      sortFunction: sortByNameDescending
    },
    {
      label: 'Lowest Alcohol % First',
      key: 'alc_asc',
      sortFunction: sortByAlcoholPercentageAscending
    },
    {
      label: 'Highest Alcohol % First',
      key: 'alc_desc',
      sortFunction: sortByAlcoholPercentageDescending
    }
  ]

  public alcoholBoundaries = {
    min: 4,
    max: 16
  }

  public alcoholPercentageFilter = this.alcoholBoundaries.max

  public headerControls: FormGroup

  constructor(private beerService: BeerService, private fb: FormBuilder) {}

  ngOnInit() {
    this.headerControls = this.fb.group({
      sort: [this.sortingOptions[0]]
    })
    this.beersOriginal = this.beerService.getAll()

    this.alcoholBoundaries = this.beersOriginal.reduce(
      (accumulated, beer) => {
        return {
          min: Math.min(accumulated.min, beer.alcohol),
          max: Math.max(accumulated.max, beer.alcohol)
        }
      },
      { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_VALUE }
    )

    this.alcoholPercentageFilter = this.alcoholBoundaries.max

    this.beersList = this.beersOriginal.slice()
  }

  onSortOptionChange(event: MatSelectChange) {
    this.getBeers()
  }

  onAlcoholSliderChange(event: MatSliderChange) {
    this.alcoholPercentageFilter = event.value
    this.getBeers()
  }

  getBeers() {
    this.beersList = this.beersOriginal
      .filter(beer => beer.alcohol <= this.alcoholPercentageFilter)
      .sort(this.headerControls.get('sort').value.sortFunction)
  }

  onBeerChanged(beer: Beer) {
    this.beerService.editBeer(beer.id, beer)
    this.beersOriginal = this.beerService.getAll()
    this.getBeers()
  }
}
