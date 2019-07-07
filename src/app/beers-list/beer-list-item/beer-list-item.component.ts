import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Beer } from 'src/app/core/interfaces'

@Component({
  selector: 'app-beer-list-item',
  templateUrl: './beer-list-item.component.html',
  styleUrls: ['./beer-list-item.component.scss']
})
export class BeerListItemComponent implements OnInit {
  @Input() beer: Beer
  @Output() beerChanged = new EventEmitter()

  public beerNameEditMode = false
  public beerDescriptionEditMode = false
  public beerForm: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.beerForm = this.fb.group({
      name: [''],
      description: ['']
    })
  }

  toggleEditName(value: boolean) {
    this.beerNameEditMode = value
  }

  toggleEditDescription(value: boolean) {
    this.beerDescriptionEditMode = value
  }

  updateBeer(field: string) {
    this.beerChanged.emit(
      Object.assign(
        {},
        this.beer,
        { name: this.beerForm.get('name').value },
        { description: this.beerForm.get('description').value }
      )
    )

    if (field === 'name') {
      this.beerNameEditMode = false
    }

    if (field === 'description') {
      this.beerDescriptionEditMode = false
    }
  }
}
