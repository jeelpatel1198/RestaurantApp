import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {

  formValue!: FormGroup;
  restaurantModelObj:RestaurantData = new RestaurantData;
  formData:any[]=[];
  showAdd!:boolean;
  showBtn!:boolean;
  constructor(private formBuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData()
  }

  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showBtn=false;
  }
  // Now subscribing our data which is mapped via Services

  addRestaurant(){
     
    this.restaurantModelObj.name =  this.formValue.value.name;
    this.restaurantModelObj.email =  this.formValue.value.email;
    this.restaurantModelObj.mobile =  this.formValue.value.mobile;
    this.restaurantModelObj.address =  this.formValue.value.address;
    this.restaurantModelObj.services =  this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(res=>{
      console.log(res);
      this.formValue.reset();
      this.getAllData();
    },err=>{
      console.log(err);
    })

  }

  getAllData(){
    this.api.getRestaurent().subscribe(res=>{
      this.formData = res;
    })
  }
  // delete records
   deleteRestaurant(data:any){
     this.api.deleteRestaurant(data.id).subscribe(res=>{
       alert('succefully deleted');
       this.getAllData();
     })
   }

   onEdit(data:any){
     this.showAdd=false;
     this.showBtn=true;
    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
   }
  
   updateRestaurant(){
    
    this.restaurantModelObj.name =  this.formValue.value.name;
    this.restaurantModelObj.email =  this.formValue.value.email;
    this.restaurantModelObj.mobile =  this.formValue.value.mobile;
    this.restaurantModelObj.address =  this.formValue.value.address;
    this.restaurantModelObj.services =  this.formValue.value.services;

    this.api.updateRestaurant(this.restaurantModelObj,this.restaurantModelObj.id).subscribe(res=>{
      alert('successfully updated');
      this.formValue.reset();
      this.getAllData();
    })
   }

}
