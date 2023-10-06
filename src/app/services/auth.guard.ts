import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LandingPageService } from './landing-page.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private LandingPageService: LandingPageService,
    private router: Router,
    private toaster: ToastrService
  ) {}
  canActivate(): boolean {
    if (this.LandingPageService.isAuthenticated()) {
      return true;
    } else {
      this.toaster.info('Please Login to see further process');
      this.router.navigate(['/login']); // Redirect to the login page
      return false;
    }
  }
}
