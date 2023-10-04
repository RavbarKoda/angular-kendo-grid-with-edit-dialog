import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { EmlPredal } from './emlModels';

@Injectable({
  providedIn: 'root',
})
export class EmlServiceService {
  private emlPredalData: EmlPredal[] = [
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

  constructor() {}

  getEmlPredalData(): Observable<EmlPredal[]> {
    return of(this.emlPredalData).pipe(delay(1000)); // Simulate delay
  }

  addEmlPredal(emlPredal: EmlPredal): Observable<void> {
    this.emlPredalData.push(emlPredal);
    return of(null).pipe(delay(500)); // Simulate delay
  }

  editEmlPredal(updatedEmlPredal: EmlPredal): Observable<void> {
    const index = this.emlPredalData.findIndex(
      (e) => e.IdEmp === updatedEmlPredal.IdEmp
    );
    if (index !== -1) {
      this.emlPredalData[index] = updatedEmlPredal;
    }
    return of(null).pipe(delay(500)); // Simulate delay
  }

  removeEmlPredal(idEmp: number): Observable<void> {
    console.log('Delete record');

    const index = this.emlPredalData.findIndex((e) => e.IdEmp === idEmp);

    if (index !== -1) {
      this.emlPredalData.splice(index, 1);
    }
    return of(null).pipe(delay(500)); // Simulate delay
  }
}
