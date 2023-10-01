import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmlPredalMapa } from '../eml-predal-mapa';

@Component({
  selector: 'app-eml-predal-mapa-edit',
  templateUrl: './eml-predal-mapa-edit.component.html',
  styleUrls: ['./eml-predal-mapa-edit.component.css'],
})
export class EmlPredalMapaEditComponent {
  public active: boolean = false;
  private sourceData: EmlPredalMapa;
  public editForm: FormGroup = new FormGroup({
    IdEpm: new FormControl(-1),
    IdEmp: new FormControl(-1),
    ImeMape: new FormControl('', Validators.required),
    NazivMape: new FormControl('', Validators.required),
    Action: new FormControl('New'),
  });

  @Input() public isNew = false;

  @Input() public emailFolderList: Array<EmlPredalMapa>;

  @Input() public set model(model: EmlPredalMapa) {
    if (model?.Action === 'None') {
      model.Action = 'Edit';
    }
    this.sourceData = model;
    this.editForm.reset(model);
    // toggle the Dialog visibility
    this.active = !!model;
  }

  @Output() cancel: EventEmitter<undefined> = new EventEmitter();
  @Output() save: EventEmitter<EmlPredalMapa> = new EventEmitter();

  public onSave(e: PointerEvent): void {
    e.preventDefault();
    const data = this.editForm.value as EmlPredalMapa;
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
