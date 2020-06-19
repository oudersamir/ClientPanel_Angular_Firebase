import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  constructor(private authClientService : AuthClientService,
              private flashMessagesService: FlashMessagesService,
              private route :Router) { }

  ngOnInit(): void {
    this.authClientService.getAuth().subscribe(
      auth=>{
        if(auth){
          return this.route.navigate(['/']);
        }
      }
    )
  }

  onLogin(){
    this.authClientService.login(this.email,this.password)
    .then(auth=>{
      if(auth){
        this.flashMessagesService.show('You are logged successufully',{cssClass:'alert-success',timeout:5000})
      } 
        this.route.navigate(['/']);
    })
    .catch(
      error=>{
        this.flashMessagesService.show(error.message,{cssClass:'alert-danger',timeout:10000})
  
      }
    )
  }

 

  onLoginWithGoogle(){
    this.authClientService.loginWithGoogle(this.email,this.password)
    .then(auth=>{
      if(auth){
        this.flashMessagesService.show('You are logged successufully',{cssClass:'alert-success',timeout:5000})
      } 
        this.route.navigate(['/']);
    })
    .catch(
      error=>{
        this.flashMessagesService.show(error.message,{cssClass:'alert-danger',timeout:10000})
  
      }
    )
  }

}
