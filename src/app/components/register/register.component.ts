import { AuthClientService } from './../../services/auth-client.service';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password:string;
  constructor(private route:Router,
              private flashMessagesService : FlashMessagesService,
              private authClientService:AuthClientService
              ) { }

  ngOnInit(): void {
  }

  onRegister(){
  this.authClientService.onRegister(this.email,this.password)
  .then(register=>{
    
     
      this.flashMessagesService.show('Congratulation you are logged',{cssClass:'alert-success',timeout:5000})
      this.route.navigate(['/']);
    
      
  }).catch( error=>{
    this.flashMessagesService.show(error.message,{cssClass:'alert-danger',timeout:5000})


  })
  }
}
