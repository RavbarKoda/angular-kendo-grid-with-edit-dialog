import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from './model';
import { SVGIcon, saveIcon, cancelIcon } from '@progress/kendo-svg-icons';

@Component({
    selector: 'kendo-grid-edit-form',
    template: `
        <kendo-dialog *ngIf="active" [width]="300" [height]="450" (close)="closeForm()">
            <kendo-dialog-titlebar>
                {{ isNew ? 'Add new product' : 'Edit product' }}
            </kendo-dialog-titlebar>

            <form novalidate class="k-form k-form-md" [formGroup]="editForm">
                <kendo-formfield>
                    <kendo-label
                        [for]="ProductName"
                        text="Product name"
                        labelCssClass="k-form-label"
                    ></kendo-label>
                    <kendo-textbox
                        #ProductName
                        formControlName="ProductName"
                        required
                    ></kendo-textbox>

                    <kendo-formhint>Type product name</kendo-formhint>
                    <kendo-formerror>Error: Product name is required</kendo-formerror>
                </kendo-formfield>

                <kendo-formfield>
                    <kendo-label
                        [for]="UnitPrice"
                        text="Unit price"
                        labelCssClass="k-form-label"
                    ></kendo-label>
                    <kendo-numerictextbox
                        #UnitPrice
                        formControlName="UnitPrice"
                        required
                        format="n0"
                    ></kendo-numerictextbox>

                    <kendo-formhint>Type unit price</kendo-formhint>
                    <kendo-formerror>Error: Unit price is required</kendo-formerror>
                </kendo-formfield>

                <kendo-formfield>
                    <kendo-label
                        [for]="UnitsInStock"
                        text="Units in stock"
                        labelCssClass="k-form-label"
                    ></kendo-label>
                    <kendo-numerictextbox
                        #UnitsInStock
                        formControlName="UnitsInStock"
                        required
                        format="n0"
                    ></kendo-numerictextbox>

                    <kendo-formhint>Type units</kendo-formhint>
                    <kendo-formerror>Error: Units must be between 0 and 999</kendo-formerror>
                </kendo-formfield>

                <kendo-formfield>
                    <ng-container>
                        <span class="k-checkbox-wrap">
                            <input
                                id='discontinued'
                                type='checkbox'
                                kendoCheckBox
                                formControlName="Discontinued"
                            />
                        </span>
                        <label [labelClass]="false" class='k-checkbox-label' for='discontinued'>Discontinued product</label>
                    </ng-container>
                </kendo-formfield>
            </form>

            <kendo-dialog-actions layout="start">
                <button
                    kendoButton
                    themeColor="primary"
                    [svgIcon]="saveIcon"
                    [disabled]="!editForm.valid"
                    (click)="onSave($event)"
                >Save</button>
                <button
                    kendoButton
                    [svgIcon]="cancelIcon"
                    (click)="onCancel($event)"
                >Cancel</button>
            </kendo-dialog-actions>
        </kendo-dialog>
    `
})
export class GridEditFormComponent {
    public saveIcon: SVGIcon = saveIcon;
    public cancelIcon: SVGIcon = cancelIcon;

    public active = false;
    public editForm: FormGroup = new FormGroup({
        ProductID: new FormControl(),
        ProductName: new FormControl('', Validators.required),
        UnitPrice: new FormControl(0),
        UnitsInStock: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
        Discontinued: new FormControl(false)
    });

    @Input() public isNew = false;

    @Input() public set model(product: Product) {
        this.editForm.reset(product);
        // toggle the Dialog visibility
        this.active = product !== undefined;
    }

    @Output() cancel: EventEmitter<undefined> = new EventEmitter();
    @Output() save: EventEmitter<Product> = new EventEmitter();

    public onSave(e: PointerEvent): void {
        e.preventDefault();
        this.save.emit(this.editForm.value);
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
