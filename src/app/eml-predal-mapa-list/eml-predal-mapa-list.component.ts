import { Component, OnInit } from '@angular/core';

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
  public emlMapePredalaSourceData: EmlPredalMapa[] = [
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
  public emlMapePredalaData: EmlPredalMapa[] = [];

  public editDataItem: EmlPredalMapa;
  public isNew: boolean;

  constructor() {}

  public ngOnInit(): void {
    this.emlMapePredalaData = Object.assign(
      this.emlMapePredalaData,
      this.emlMapePredalaSourceData
    );
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

  public cancelHandler(): void {
    this.editDataItem = undefined;
  }

  public saveHandler(product: EmlPredalMapa): void {
    console.log('Save handler action - ' + product.Action);
    console.log(product);

    if (product.Action === 'New' && !!this.isNew) {
      this.emlMapePredalaData.push(product);
    } else {
      //edit mode
      var orgiItem = this.emlMapePredalaSourceData.find(
        (x) => x.IdEpm === product.IdEpm && x.IdEmp === product.IdEmp
      );

      if (EmlPredalMapa.equalWithoutAction(orgiItem, product) === true) {
        product.Action = 'None';
      } else {
        console.log(orgiItem);
        console.log(product);
      }

      let index = this.emlMapePredalaData.findIndex(
        (item) => item.IdEmp === product.IdEmp && item.IdEpm === product.IdEpm
      );

      this.emlMapePredalaData[index] = product;
      this.emlMapePredalaData = Object.assign([], this.emlMapePredalaData);

      this.editDataItem = undefined;
    }
  }
}
