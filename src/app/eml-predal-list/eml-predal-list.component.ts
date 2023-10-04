import { Component, OnInit } from '@angular/core';
import { AddEvent, RemoveEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { EmlServiceService } from '../eml-service.service';
import { EmlPredal } from '../emlModels';

@Component({
  selector: 'app-eml-predal-list',
  templateUrl: './eml-predal-list.component.html',
  styleUrls: ['./eml-predal-list.component.css'],
})
export class EmlPredalListComponent implements OnInit {
  public isNew: boolean = false;

  public emlPredalaData: EmlPredal[];
  public editDataItem: EmlPredal;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };

  constructor(private service: EmlServiceService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.service.getEmlPredalData().subscribe({
      next: (data) => {
        this.emlPredalaData = data;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      },
    });
  }

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
    const rec = { ...args.dataItem };
    this.service.removeEmlPredal(rec.IdEmp).subscribe((x) => {
      this.loadData();
    });
  }
}
