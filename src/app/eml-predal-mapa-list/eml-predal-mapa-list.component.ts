import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AddEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { EmlPredalMapa } from '../emlModels';

@Component({
  selector: 'app-eml-predal-mapa-list',
  templateUrl: './eml-predal-mapa-list.component.html',
  styleUrls: ['./eml-predal-mapa-list.component.css'],
})
export class EmlPredalMapaListComponent implements OnInit {
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };

  public emlMapePredalaSourceData: EmlPredalMapa[];

  @Input() mapePredalaList: EmlPredalMapa[];
  @Output() mapePredalaListChange: EventEmitter<EmlPredalMapa[]> =
    new EventEmitter();
  public editDataItem: EmlPredalMapa;
  public isNew: boolean;

  constructor() {}

  public ngOnInit(): void {
    this.emlMapePredalaSourceData = Object.assign([], this.mapePredalaList);
  }

  public onStateChange(state: State): void {
    this.gridState = state;
  }

  public addHandler(): void {
    this.editDataItem = new EmlPredalMapa();
    this.editDataItem.Action = 'New';
    this.isNew = true;
  }

  public editHandler(args: AddEvent): void {
    this.editDataItem = { ...args.dataItem };
    this.isNew = false;
  }

  public removeHandler(args: RemoveEvent): void {
    const removedItem: EmlPredalMapa = { ...args.dataItem }; //prekini povezavo, drugače bo seznam imel enako vrednost
    //if you want to delete new record
    if (removedItem.Action === 'New') {
      this.mapePredalaList.forEach((item: EmlPredalMapa, index) => {
        if (
          item.IdEmp === removedItem.IdEmp &&
          item.IdEpm === removedItem.IdEpm
        ) {
          this.mapePredalaList.splice(index, 1);
        }
      });
    } else {
      removedItem.Action = 'Delete';
      let index = this.mapePredalaList.findIndex(
        (item) =>
          item.IdEmp === removedItem.IdEmp && item.IdEpm === removedItem.IdEpm
      );
      this.mapePredalaList[index] = removedItem;
      this.mapePredalaList = Object.assign([], this.mapePredalaList);
      //send changed list to parent component
      this.mapePredalaListChange.emit(this.mapePredalaList);
    }
  }

  public cancelHandler(): void {
    this.editDataItem = undefined;
  }

  public saveHandler(product: EmlPredalMapa): void {
    console.log('Save handler action - ' + product.Action);
    if (product.Action === 'New' && !!this.isNew) {
      this.mapePredalaList.push(product);
    } else {
      //edit mode
      var orgiItem = this.emlMapePredalaSourceData?.find(
        (x) => x.IdEpm === product.IdEpm && x.IdEmp === product.IdEmp
      );

      if (EmlPredalMapa.equalWithoutAction(orgiItem, product) === true) {
        product.Action = 'None';
        console.log('Revert mapo predala to orig - ' + product.Action);
        console.log(product);
      }
      let index = this.mapePredalaList.findIndex(
        (item) => item.IdEmp === product.IdEmp && item.IdEpm === product.IdEpm
      );
      this.mapePredalaList[index] = product;
      this.mapePredalaList = Object.assign([], this.mapePredalaList);
      this.editDataItem = undefined;
      this.mapePredalaListChange.emit(this.mapePredalaList);
    }
  }
}
