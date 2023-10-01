import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import {
  GridDataResult,
  AddEvent,
  RemoveEvent,
} from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { map } from 'rxjs/operators';
import { EmlPredalMapa } from './eml-predal-mapa';

@Component({
  selector: 'my-app',
  template: `
  <button (click)="addFake()">Add dummy</button>
        <kendo-grid
            [data]="emlMapePredalaData"
            [pageSize]="gridState.take"
            [skip]="gridState.skip"
            [sort]="gridState.sort"
            [pageable]="true"
            [sortable]="true"
            (dataStateChange)="onStateChange($event)"
            (edit)="editHandler($event)"
            (remove)="removeHandler($event)"
            (add)="addHandler()"
        >
            <ng-template kendoGridToolbarTemplate>
                <button kendoGridAddCommand>Add new</button>
            </ng-template>
            <kendo-grid-column field="IdEmp" title="EMP" [width]="80"></kendo-grid-column>
            <kendo-grid-column field="IdEpm" title="EPM" [width]="80"></kendo-grid-column>
            <kendo-grid-column field="ImeMape" title="Ime Mape"></kendo-grid-column>
            <kendo-grid-column field="NazivMape" title="NazivMape"></kendo-grid-column>
            <kendo-grid-column field="Action" title="Action" [width]="80"></kendo-grid-column>
            <kendo-grid-command-column title="command" [width]="150">
                <ng-template kendoGridCellTemplate>
                    <button kendoGridEditCommand [primary]="true">Edit</button>
                    <button kendoGridRemoveCommand [primary]="true">Remove</button>
                </ng-template>
            </kendo-grid-command-column>
        </kendo-grid>
        <app-eml-predal-mapa-edit [model]="editDataItem" [isNew]="isNew" (save)="saveHandler($event)"></app-eml-predal-mapa-edit>
    `,
})
export class AppComponent implements OnInit {
  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };
  public emlMapePredalaData: EmlPredalMapa[] = [
    {
      IdEpm: 1,
      IdEmp: 1,
      ImeMape: 'Test@gmail.com',
      NazivMape: 'Test1@gmail.com',
      Action: 'None',
    },
    {
      IdEpm: 1,
      IdEmp: 2,
      ImeMape: 'Test@gmail.com',
      NazivMape: 'Test2@gmail.com',
      Action: 'None',
    },
    {
      IdEpm: 1,
      IdEmp: 3,
      ImeMape: 'Test@gmail.com',
      NazivMape: 'Test3@gmail.com',
      Action: 'None',
    },
    {
      IdEpm: 1,
      IdEmp: 4,
      ImeMape: 'Test4@gmail.com',
      NazivMape: 'Test4@gmail.com',
      Action: 'None',
    },
  ];

  public editDataItem: EmlPredalMapa;
  public isNew: boolean;

  constructor() {}

  public ngOnInit(): void {}

  public onStateChange(state: State): void {}

  public addHandler(): void {
    this.editDataItem = new EmlPredalMapa();
    this.isNew = true;
  }

  public editHandler(args: AddEvent): void {
    this.editDataItem = { ...args.dataItem };
    this.isNew = false;
  }

  public cancelHandler(): void {
    this.editDataItem = undefined;
  }

  public addFake(): void {
    console.log(
      'Dodajam fake objekt dolžina: ' + this.emlMapePredalaData.length
    );
    this.emlMapePredalaData.push({
      IdEpm: -1,
      IdEmp: -2,
      ImeMape: 'Fake@gmail.com',
      NazivMape: 'Test3@gmail.com',
      Action: 'New',
    } as EmlPredalMapa);
    console.log('Nova dolžina: ' + this.emlMapePredalaData.length);
  }
  public saveHandler(product: EmlPredalMapa): void {
    console.log('Save handler action - ' + product.Action);
    console.log(product);

    if (product.Action === 'New' && !!this.isNew) {
      this.emlMapePredalaData.push(product);
    } else {
      //edit mode
      let index = this.emlMapePredalaData.findIndex(
        (item) => item.IdEmp === product.IdEmp && item.IdEpm === product.IdEpm
      );
      this.emlMapePredalaData[index] = product;
      this.emlMapePredalaData = Object.assign([], this.emlMapePredalaData);

      this.editDataItem = undefined;
    }
  }

  public removeHandler(args: RemoveEvent): void {
    console.log(args);
    //if you want to delete new record
    if (args.dataItem.Action === 'New') {
      this.emlMapePredalaData.forEach((item: EmlPredalMapa, index) => {
        if (
          item.IdEmp === args.dataItem.IdEmp &&
          item.IdEpm === args.dataItem.IdEpm
        ) {
          this.emlMapePredalaData.splice(index, 1);
        }
      });
    } else {
      args.dataItem.Action = 'Delete';
      let index = this.emlMapePredalaData.findIndex(
        (item) =>
          item.IdEmp === args.dataItem.IdEmp &&
          item.IdEpm === args.dataItem.IdEpm
      );
      this.emlMapePredalaData[index] = args.dataItem;
      this.emlMapePredalaData = Object.assign([], this.emlMapePredalaData);
    }
  }
}
