import { ClientService } from './../../services/client.service';
import { Client } from './../../models/clients';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal  from 'sweetalert2';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
  id:string;
  client:Client;
  showBalance:boolean=false;
  constructor(private clientService:ClientService,
              private activatedRoute:ActivatedRoute,
              private route:Router,
              private flasshMessage:  FlashMessagesService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
   
    this.clientService.getClient(this.id).
                                    subscribe(c=>{this.client= c
                                                  console.log(c);  
                                                  this.client.id=this.id;        
                                  });
}

updateBalance(){
  this.client.id=this.id;
  this.clientService.updateClient(this.client);
  this.showBalance=!this.showBalance;
  this.flasshMessage.show('balance  updated',{cssClass:'alert-warning',timeout:4000})
}
deleteClient(){

swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.value) {

    this.client.id=this.id;
    this.clientService.deleteClient(this.client.id);
    this.flasshMessage.show('client  deleted',{cssClass:'alert-warning',timeout:4000})
    this.route.navigate(['/']);
    
    swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
})  
    
  
  
}
}


