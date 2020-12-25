import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Injectable({ providedIn: 'root' })
export class MemberListResolver implements Resolve<User[]> {
  pageNumber=1;
  pageSize=5;

    constructor(private userservice:UserService,private alertify:AlertifyService,private router:Router){
    }

    resolve(route: ActivatedRouteSnapshot):Observable<User[]> {
        return this.userservice.getUsers(this.pageNumber,this.pageSize).pipe(
            catchError(err => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}
