import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  // Now here i will define POST,GET,PUT,DELETE

  // Create Restaurant Using Post method
  postRestaurant(data:any){
    return this._http.post<any>('http://localhost:3000/posts',data).pipe(map(res=>{
      return res;
    }))
  }
  // Get Restaurant data using Get method
  getRestaurent(){
    return this._http.get<any>('http://localhost:3000/posts').pipe(map(res=>{
      return res;
    }))
  }
  // Update Restaurant using put method
  updateRestaurant(data:any,id:any){
    return this._http.put<any>('http://localhost:3000/posts/'+id,data).pipe(map(res=>{
      return res;
    }))
  }
  // Delete Restaurant using delete method
  deleteRestaurant(id:any){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map(res=>{
      return res;
    }))
  }
}
