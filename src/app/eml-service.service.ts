import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { EmlPredal, EmlPredalMapa } from './emlModels';

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
  public IdEpm: number = -1;
  public IdEmp: number = -1;
  public ImeMape: string = '';
  public NazivMape: string = '';

  private emlPredalMapaData: EmlPredalMapa[] = [
    {
      IdEmp: 1,
      IdEpm: 1,
      ImeMape: 'test1',
      NazivMape: 'test1@gmail.com',
      Action: 'None',
    },
    {
      IdEmp: 2,
      IdEpm: 2,
      ImeMape: 'test2',
      NazivMape: 'test2@gmail.com',
      Action: 'None',
    },
    {
      IdEmp: 3,
      IdEpm: 3,
      ImeMape: 'test3',
      NazivMape: 'test3@gmail.com',
      Action: 'Edit',
    },
    {
      IdEmp: 4,
      IdEpm: 4,
      ImeMape: 'test4',
      NazivMape: 'test4@gmail.com',
      Action: 'New',
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

  getEmlPredalMapaData(): Observable<EmlPredalMapa[]> {
    return of(this.emlPredalMapaData).pipe(delay(1000)); // Simulate delay
  }

  addEmlPredalMapa(emlPredalMapa: EmlPredalMapa): Observable<void> {
    this.emlPredalMapaData.push(emlPredalMapa);
    return of(null).pipe(delay(500)); // Simulate delay
  }

  editEmlPredalMapa(updatedEmlPredalMapa: EmlPredalMapa): Observable<void> {
    const index = this.emlPredalMapaData.findIndex(
      (e) => e.IdEmp === updatedEmlPredalMapa.IdEmp
    );
    if (index !== -1) {
      this.emlPredalMapaData[index] = updatedEmlPredalMapa;
    }
    return of(null).pipe(delay(500)); // Simulate delay
  }

  removeEmlPredalMapa(idEmp: number, idEpm: number): Observable<void> {
    console.log('Delete record');

    const index = this.emlPredalMapaData.findIndex(
      (e) => e.IdEmp === idEmp && e.IdEpm === idEpm
    );

    if (index !== -1) {
      this.emlPredalMapaData.splice(index, 1);
    }
    return of(null).pipe(delay(500)); // Simulate delay
  }
}
