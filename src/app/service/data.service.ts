import { Injectable } from '@angular/core';
import { Car } from '../car';
import { Observable ,of ,from,BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
cars:Car[] =[ {'id':1,'make':'Ford','model':'Escape','year':2019,'color':'White'},
              {'id':2,'make':'Ford','model':'Mustang','year':2020,'color':'White'},
              {'id':3,'make':'Mazda','model':'2','year':2016,'color':'Red'},
              {'id':4,'make':'Mazda','model':'3','year':2021,'color':'Blue'},
              {'id':5,'make':'Hyundai','model':'Tuscon','year':2018,'color':'white'},
              {'id':6,'make':'Subaru','model':'Liberty','year':2006,'color':'Silver'},
              {'id':7,'make':'Mazda','model':'MX 5','year':2023,'color':'Silver'}
            ];
private _currentcar = new BehaviorSubject<Car>(<Car>{})
readonly currentcar$ = this._currentcar.asObservable();

constructor() { }

public getAllCars(): Observable<Car[]> {
  return new Observable<Car[]>((observer) => {
    observer.next(this.cars);
  });
}

setcurrentcar(car:Car){
    this._currentcar.next(car); 
  }

}

