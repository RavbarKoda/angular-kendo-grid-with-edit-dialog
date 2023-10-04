import { Component, OnInit } from '@angular/core';
import { AddEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { EmlPredal } from '../emlModels';

@Component({
  selector: 'app-eml-predal-list',
  templateUrl: './eml-predal-list.component.html',
  styleUrls: ['./eml-predal-list.component.css'],
})
export class EmlPredalListComponent implements OnInit {
  public isNew: boolean = false;

  public emlPredalaData: EmlPredal[] = [
    {
      IdEmp: 1,
      ImePredala: 'test1',
      NaslovPredala: 'test1@gmail.com',
      Debug: 'DA',
      VrstaPredala: 1,
      Action: 'None',
      Mape: undefined,
    },
    {
      IdEmp: 2,
      ImePredala: 'test2',
      NaslovPredala: 'test2@gmail.com',
      Debug: 'DA',
      VrstaPredala: 2,
      Action: 'None',
      Mape: undefined,
    },
    {
      IdEmp: 3,
      ImePredala: 'test3',
      NaslovPredala: 'test3@gmail.com',
      Debug: 'DA',
      VrstaPredala: 1,
      Action: 'Edit',
      Mape: undefined,
    },
    {
      IdEmp: 4,
      ImePredala: 'test4',
      NaslovPredala: 'test4@gmail.com',
      Debug: 'NE',
      VrstaPredala: 2,
      Action: 'New',
      Mape: undefined,
    },
  ];
  public editDataItem: EmlPredal;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };

  constructor() {}

  ngOnInit() {}

  public onStateChange(state: State): void {
    this.gridState = state;
  }

  public addHandler(): void {
    this.editDataItem = new EmlPredal();
    this.editDataItem.Action = 'New';
    this.isNew = true;
  }

  public editHandler(args: AddEvent): void {
    this.editDataItem = { ...args.dataItem };
    this.isNew = false;
  }

  public removeHandler(args: RemoveEvent): void {
    console.log(args);
    //cal remove service
  }
}
