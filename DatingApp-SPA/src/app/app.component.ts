import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  jwthelper=new JwtHelperService();

  constructor(private auth:AuthService)
  {

  }

  ngOnInit(): void {
    const token=localStorage.getItem('token');
    const user:User=JSON.parse(localStorage.getItem('user'));
    if(token)
    this.auth.decodedToken=this.jwthelper.decodeToken(token);

    if(user)
    this.auth.currentUser=user;
    this.auth.changePhotoUrl(user.photoUrl);

  }

  title = 'DatinApp-SPA';
}
