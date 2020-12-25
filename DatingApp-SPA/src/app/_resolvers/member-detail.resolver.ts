import { Injectable } from '@angular/core';

import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(private userservice:UserService,private alertify:AlertifyService,private router:Router) {}

  resolve(route:ActivatedRouteSnapshot) {
    return this.userservice.getUser(route.params['id']).pipe(
        catchError(err => {

            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/members']);
            return of(null);                      
        })
    )
  }
}