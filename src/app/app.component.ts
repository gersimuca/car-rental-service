import { ClientRequestService } from './client-request.service';
import { Component } from '@angular/core';
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


  displayForm = false;
  displayCars = true;
  carModule!: string;

  client = new Client("", "", "");;

  toggleForm() {
    this.displayForm = !this.displayForm;
  }

  toggleCars() {
    this.displayCars = !this.displayCars;
  }


  smallCarSelected() {
    this.toggleForm();
    this.toggleCars();
    this.carModule = "small";
  }

  largeCarSelected() {
    this.toggleForm();
    this.toggleCars();
    this.carModule = "large";
  }

  premiumCarSelected() {
    this.toggleForm();
    this.toggleCars();
    this.carModule = "premium"
  }
}
