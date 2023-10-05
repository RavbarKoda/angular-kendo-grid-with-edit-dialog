import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { EmlPredalMapa } from '../emlModels';

@Component({
  selector: 'app-eml-predal-mapa-edit',
  templateUrl: './eml-predal-mapa-edit.component.html',
  styleUrls: ['./eml-predal-mapa-edit.component.css'],
})
export class EmlPredalMapaEditComponent {
  public active: boolean = false;
  public editForm: FormGroup;

  @Input() public isNew = false;

  @Input() public emailFolderList: Array<EmlPredalMapa>;

  @Input() public set model(model: EmlPredalMapa) {
    if (model?.Action === 'None') {
      model.Action = 'Edit';
    }
    this.editForm.reset(model);
    // toggle the Dialog visibility
    this.active = !!model;
  }

  @Output() cancel: EventEmitter<undefined> = new EventEmitter();
  @Output() save: EventEmitter<EmlPredalMapa> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      IdEpm: new FormControl(-1),
      IdEmp: new FormControl(-1),
      ImeMape: new FormControl('', [
        Validators.required,
        this.uniqueFolderNameValidator('ImeMape'),
      ]),
      NazivMape: new FormControl('', Validators.required),
      Action: new FormControl('New'),
    });
  }

  public ngOnInit() {}

  get IdEpm(): FormControl {
    return this.editForm.get('IdEpm') as FormControl;
  }

  get IdEmp(): FormControl {
    return this.editForm.get('IdEmp') as FormControl;
  }

  get ImeMape(): FormControl {
    return this.editForm.get('ImeMape') as FormControl;
  }

  get NazivMape(): FormControl {
    return this.editForm.get('NazivMape') as FormControl;
  }

  get Action(): FormControl {
    return this.editForm.get('Action') as FormControl;
  }

  public uniqueFolderNameValidator(fieldName: string): ValidatorFn {
    return (control: FormControl) => {
      const controlValue = control.value;
      const result = this.emailFolderList
        ?.filter(
          (x) =>
            (x.IdEpm !== this.IdEpm.value &&
              x.IdEmp !== this.IdEmp.value &&
              x.Action !== 'Delete') ||
            this.Action.value === 'New'
        ) /* remove edited item from validation check*/
        .some(
          (x) =>
            (x.ImeMape === controlValue && fieldName === 'ImeMape') ||
            (x.NazivMape === controlValue && fieldName === 'NazivMape')
        );
      if (result) {
        const error = {};
        error[`notUnique${fieldName}`] = true; // Create a unique error key based on the field name
        return error;
      }
      return null; // Validation passed
    };
  }

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
