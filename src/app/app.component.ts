import { ClientRequestService } from './client-request.service';
import { Component } from '@angular/core';
import { Car } from './car';
import { Client } from './client';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass',
  ]
})
export class AppComponent {
  title = 'Rent Car';
  bookingForm!: FormGroup;
  displayForm = false;
  displayCars = true;
  car = new Car("");
  client = new Client("", "", "");;

  constructor(private fb: FormBuilder, private service: ClientRequestService) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
    })
  }

  addBooking() {
    this.client.firstName = this.bookingForm.controls['firstName'].value;
    this.client.lastName = this.bookingForm.controls['firstName'].value;
    this.client.email = this.bookingForm.controls['firstName'].value;
    this.client.carModule = this.car.carType;

    console.log(this.client);

    this.sendClientRequest();


    this.bookingForm.reset({
      firstName: '',
      lastName: '',
      email: '',
    })

    this.toggleForm();
    this.toggleCars();


  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }

  toggleCars() {
    this.displayCars = !this.displayCars;
  }


  small() {
    this.toggleForm();
    this.toggleCars();
    this.car.carType = "small";
    console.log(this.car.carType)
  }

  large() {
    this.toggleForm();
    this.toggleCars();
    this.car.carType = "large";
    console.log(this.car.carType)
  }

  premium() {
    this.toggleForm();
    this.toggleCars();
    this.car.carType = "premium"
    console.log(this.car.carType)
  }

  sendClientRequest() {
    this.service.makeRequest(this.client);
  }
}
