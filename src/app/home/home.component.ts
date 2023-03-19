import { Component, OnInit } from '@angular/core';
import {CarService} from "../services/car.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  cars: any[] = [];

  constructor(private carService: CarService) {

  }


  ngOnInit(): void {
    this.getCars()
  }

  getCars() {
    this.carService.getCars().subscribe(result => this.cars = result);
  }

  premiumCarSelected() {

  }

  largeCarSelected() {

  }

  smallCarSelected() {

  }
}
