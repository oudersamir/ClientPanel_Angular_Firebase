import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/clients';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  client:Client= {
    firstname:"",
    lastname: "",
    phone  :null,
    balance:0
}
  constructor(private clientService:ClientService, 
    private activatedRoute:ActivatedRoute
    ,private route:Router,
    private flashMessages:FlashMessagesService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.clientService.getClient(this.id).
                                    subscribe(c=>{this.client= c
                                                  console.log(c);          
                                  });
  }

  updateClient(){
    this.client.id=this.id;
    this.clientService.updateClient(this.client);
    this.flashMessages.show('client  updated',{cssClass:'alert-success',timeout:4000})
    this.route.navigate(['/client/details/'+this.client.id]);
  }


}
