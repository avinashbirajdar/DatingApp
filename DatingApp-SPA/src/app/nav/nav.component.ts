import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private http: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.http.login(this.model).subscribe(next =>{
      console.log('LoggedIn Successfully!!');
    }, error => {
      console.log('Falied to login');
    });
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
    console.log('logout successful..');
  }
}
