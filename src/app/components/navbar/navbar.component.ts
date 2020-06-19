import { Router } from '@angular/router';
import { AuthClientService } from './../../services/auth-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email:string;
  isLogIn:boolean=false;
  constructor(
              private authClientService: AuthClientService,
              private route:Router
  ) { }

  ngOnInit(): void {
    this.authClientService.getAuth().subscribe(
      auth=>{
        if(auth){
          this.isLogIn=true;
          this.email=auth.email;

        }
        else {
          this.isLogIn=false;
          this.email='';


        }
      }
    )
  }

  logOut(){
    this.isLogIn=false;
    this.email='';
    this.authClientService.logOut();
    return this.route.navigate(['/login']);
  }

}
