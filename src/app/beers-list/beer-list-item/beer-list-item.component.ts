import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Beer } from 'src/app/core/interfaces'

interface BeerInputFieldsEditMode {
  name: boolean
  description: boolean
  alcohol: boolean
}

@Component({
  selector: 'app-beer-list-item',
  templateUrl: './beer-list-item.component.html',
  styleUrls: ['./beer-list-item.component.scss']
})
export class BeerListItemComponent implements OnInit {
  @Input() beer: Beer
  @Output() beerChanged = new EventEmitter()

  public ALCOHOL_MIN = 0
  public ALCOHOL_MAX = 16

  public editMode: BeerInputFieldsEditMode = {
    name: false,
    description: false,
    alcohol: false
  }
  public beerForm: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.beerForm = this.fb.group({
      name: [''],
      description: [''],
      alcohol: ['', [Validators.min(this.ALCOHOL_MIN), Validators.max(this.ALCOHOL_MAX)]]
    })
  }

  toggleEdit(field: keyof BeerInputFieldsEditMode, value: boolean) {
    this.editMode[field] = value
    if (value) {
      setTimeout(() => {
        console.log(this.beerForm.get(field))
      }, 60)
    }
  }

  updateBeer(field: keyof BeerInputFieldsEditMode) {
    if (!this.beerForm.valid) {
      return
    }

    this.beerChanged.emit(
      Object.assign(
        {},
        this.beer,
        { name: this.beerForm.get('name').value },
        { description: this.beerForm.get('description').value },
        { alcohol: Number(this.beerForm.get('alcohol').value) }
      )
    )

    this.editMode[field] = false
  }
}
