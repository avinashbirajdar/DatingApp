import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registermodel: any = {};
  constructor(private http: AuthService) { }

  ngOnInit() {
  }

  register(){
    this.http.register(this.registermodel).subscribe(() => {
      console.log('registration successful..');
      this.registermodel = {};
    },
    error => {
      console.log(error);
    });
  }
}
