import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User ;
  constructor(private http: AuthService,private router:Router, private alertify: AlertifyService,private fb:FormBuilder) { }
  registerForm: FormGroup;

  ngOnInit() {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
    //   confirmPassword:new FormControl('',Validators.required)
    // },this.passwordMatchValidator);
    this.createRegisterForm();
  }
  register()
  {
    if(this.registerForm.valid)
    {
       this.user=Object.assign({},this.registerForm.value);
       this.http.register(this.user).subscribe(()=>{
         this.alertify.success('Registration successful');
       },error=>{
         this.alertify.error(error);
         console.log(error);
       },()=>{
         this.http.login(this.user).subscribe(()=>{
           this.router.navigate(['/members']);
         })
       });
    }
  }

  createRegisterForm()
  {
    this.registerForm=this.fb.group({
    gender:['male'],
    username:['',Validators.required],
    knownAs:['',Validators.required],
    dateOfBirth:['',Validators.required],
    city:['',Validators.required],
    country:['',Validators.required],
    password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
    confirmPassword:['',Validators.required]
    },{validators:this.passwordMatchValidator});
  }

  passwordMatchValidator(g:FormGroup)
  {
    return g.get('password').value===g.get('confirmPassword').value?null:{'mismatch':true};
  }

 //register() {

//     this.http.register(this.registermodel).subscribe(() => {
//       //console.log('registration successful..');
//       this.alertify.success('registration successfully...');
//       this.registermodel = {};
//     },
//       error => {
//         console.log(error);
//       });
 //}
 }
