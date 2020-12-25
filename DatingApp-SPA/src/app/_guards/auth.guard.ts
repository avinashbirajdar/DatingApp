import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router,private alertify:AlertifyService)  
  {

  }
  canActivate():boolean {

    if(this.authService.loggedIn())
    {
      return true;
    }
    else
    {
      this.alertify.error('You Shall not pass!!!!!');
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
