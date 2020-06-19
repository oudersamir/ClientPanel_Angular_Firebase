import { AuthClientService } from './../../services/auth-client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/clients';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client:Client= {
    firstname:"",
    lastname: "",
    phone  :null,
    balance:0,
    user:''
}
  constructor(private clientService:ClientService,
              private route:Router,
              private authClientService: AuthClientService,
              private FlashMessages:FlashMessagesService) { }

  ngOnInit(): void {
    this.authClientService.getAuth().subscribe(auth=>{
      this.client.user=auth.uid;
    })

  }


  addClient(){
   this.clientService.addClient(this.client);
   this.FlashMessages.show('Client added successfully',{cssClass:'alert-primary',timeout:5000});
   return this.route.navigate(['/']);
  }

}
