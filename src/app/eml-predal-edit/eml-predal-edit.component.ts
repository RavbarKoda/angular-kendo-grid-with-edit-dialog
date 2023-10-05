import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmlServiceService } from '../eml-service.service';
import { EmlPredal, EmlPredalMapa } from '../emlModels';

@Component({
  selector: 'app-eml-predal-edit',
  templateUrl: './eml-predal-edit.component.html',
  styleUrls: ['./eml-predal-edit.component.css'],
})
export class EmlPredalEditComponent {
  public active: boolean = false;

  public mapePredala: EmlPredalMapa[];

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
  @Output() cancel: EventEmitter<string> = new EventEmitter();
  constructor(private service: EmlServiceService) {}

  ngOnInit() {
    this.loadPredalMapeData();
  }

  public loadPredalMapeData() {
    this.service
      .getEmlPredalMapaData()
      .subscribe((x) => (this.mapePredala = x));
  }

  public onSave(e: PointerEvent): void {
    e.preventDefault();
    const data = this.editPredalForm.value as EmlPredal;
    this.closeForm('save');
    this.active = false;
  }

  public onCancel(e: PointerEvent): void {
    e.preventDefault();
    this.closeForm('cancel');
  }

  public closeForm(action: string): void {
    this.active = false;
    this.cancel.emit();
  }
}
