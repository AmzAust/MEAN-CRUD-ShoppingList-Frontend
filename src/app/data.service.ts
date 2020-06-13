import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) { }

  getShoppingItems() {
    return this.http.get('http://localhost:3000/api/items')
    .pipe(map(res => res.json()));
  }

  addShoppingItem(newItem) {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/item', newItem, {headers})
    .pipe(map(res => res.json()));
  }

  deleteShoppingItem(id) {
    return this.http.delete('http://localhost:3000/api/item/' + id)
      .pipe(map(res => res.json()));
  }

  updateShoppingItem(newItem) {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/item/' + newItem._id, newItem, {headers})
    .pipe(map(res => res.json()));
  }
}
