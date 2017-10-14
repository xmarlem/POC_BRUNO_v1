import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {



  constructor(private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    //console.log(route);
    //console.log("CurrentUser in local storage: "+localStorage.getItem('currentUser') );
    if(localStorage.getItem('currentUser')){
      //user is logged in
      return true;
    }

    this.router.navigate(['/pages/auth/login-2'], {queryParams: {returnUrl: state.url}});

  }
}
