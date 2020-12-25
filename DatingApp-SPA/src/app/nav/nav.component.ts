import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private http: AuthService,private alertify:AlertifyService,public auth:AuthService,private router:Router) { }
  photoUrl:string;
  ngOnInit() {
    this.auth.currentPhotoUrl.subscribe(PhotoUrl=>this.photoUrl=PhotoUrl);
  }

  login() {
    this.http.login(this.model).subscribe(next =>{
      //console.log('LoggedIn Successfully!!');
      this.alertify.success("LoggedIn Successfully!!");
    }, error => {
      this.alertify.error('error in login');
    },()=>{
      this.router.navigate(['/members']);
    }
    );
  }

  loggedIn(){
    return this.auth.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.auth.decodedToken=null;
    this.auth.currentUser=null;
    this.router.navigate(['/home']);
    this.alertify.message('log out successfully!!')    ;
  }
}
