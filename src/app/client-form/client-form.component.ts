import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Client } from '../client';
import { ClientRequestService } from '../client-request.service';

@Component({
  selector: 'client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.sass']
})
export class ClientFormComponent implements OnInit {

  @Input() carModule!: string

  bookingForm!: FormGroup;
  client = new Client("", "", "");;
  displayForm = true;

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
    this.client.lastName = this.bookingForm.controls['lastName'].value;
    this.client.email = this.bookingForm.controls['email'].value;
    this.client.carModule = this.carModule;
    console.log(this.client);

    this.sendClientRequest();


    this.bookingForm.reset({
      firstName: '',
      lastName: '',
      email: '',
    })

  }

  sendClientRequest() {
    this.service.makeRequest(this.client).subscribe(client => {
      console.log(client);
      this.client = client;
    });
  }

}
