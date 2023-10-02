import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmlPredal } from '../emlModels';

@Component({
  selector: 'app-eml-predal-edit',
  templateUrl: './eml-predal-edit.component.html',
  styleUrls: ['./eml-predal-edit.component.css'],
})
export class EmlPredalEditComponent {
  public active: boolean = false;
  public editPredalForm: FormGroup = new FormGroup({
    IdEpm: new FormControl(-1),
    ImePredala: new FormControl('', Validators.required),
    NaslovPredala: new FormControl('', Validators.required),
    Action: new FormControl('New'),
  });

  @Input() public isNew = false;

  @Input() public set model(model: EmlPredal) {
    if (model?.Action === 'None') {
      model.Action = 'Edit';
    }
    this.editPredalForm.reset(model);
    console.log('Predala data - details');
    console.log(model);
    // toggle the visibility
    this.active = !!model;
  }
  @Output() cancel: EventEmitter<undefined> = new EventEmitter();
  @Output() save: EventEmitter<EmlPredal> = new EventEmitter();

  constructor() {}

  public onSave(e: PointerEvent): void {
    e.preventDefault();
    const data = this.editPredalForm.value as EmlPredal;
    this.save.emit(data);
    this.active = false;
  }

  public onCancel(e: PointerEvent): void {
    e.preventDefault();
    this.closeForm();
  }

  public closeForm(): void {
    this.active = false;
    this.cancel.emit();
  }
}
