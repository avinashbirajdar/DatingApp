import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isregistermodel = false;
  values: any = {};
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getvalues();
  }

  ToggleRegister(){
    this.isregistermodel = !this.isregistermodel;
  }

  getvalues(){
    this.http.get('http://localhost:5000/api/values').subscribe(next => {
      this.values = next;
      console.log(next);
    },
    error => {
      console.log(error);
    });
  }

}
