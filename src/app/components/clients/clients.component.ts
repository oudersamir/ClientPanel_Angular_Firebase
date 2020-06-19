import { AuthClientService } from './../../services/auth-client.service';
import { Router } from '@angular/router';
import { FlashMessagesService, FlashMessagesModule } from 'angular2-flash-messages';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import {Client } from './../../models/clients';
import swal  from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:Client[];
  searchClients:Client[];
  total:number=0;
  constructor(private clientService:ClientService,
              private route : Router,
              private flasshMessage:  FlashMessagesService,
              private authClientService:AuthClientService) { }

  ngOnInit(): void {
    this.authClientService.getAuth().subscribe(auth=>{
      this.clientService.getClients(auth.uid).subscribe(clients=>
        { this.searchClients= this.clients=clients;
          this.total=this.getTotal() ;
          console.log(this.total);    
         }     
         );}
    );
  
  }


  getTotal()
{
  return this.clients.map(c=>c.balance).reduce((total,balance)=>{
    return total+parseFloat(balance.toString());
  },0)
}

deleteClient(id:string){
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
  
      this.clientService.deleteClient(id);
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

search(query:string){
  this.searchClients=(query)? this.clients.filter(client=>client.firstname.toLowerCase().includes(query.toLowerCase())
  ||  client.lastname.toLowerCase().includes(query.toLowerCase()) || client.phone.toString().includes(query)
  ) : this.clients
}

}
