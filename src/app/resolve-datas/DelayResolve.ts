import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { delay, finalize } from 'rxjs/operators';
import { SharedService } from '../shares/SharedService';
import { UserService } from '../services/user.service';
import { Title } from '@angular/platform-browser';
@Injectable()
export class DelayResolve implements Resolve<Observable<any>> {
  constructor(private sharedService: SharedService,
    public titleService: Title,
    private userService: UserService) {
  }
  username = '';
  resolve(route: ActivatedRouteSnapshot): any {
    this.sharedService.sendMessageLoading(true);
    this.username = route.paramMap.get('name');
    this.sharedService.sendMessageRoute(this.username);
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        if (this.username !== user.username) {
          this.sharedService.clearMessage();
        }
      }
    }, () => this.sharedService.clearMessage());
    this.titleService.setTitle(`${this.username} - ${route.data.title}`);
    return of(null).pipe(
      delay(1000),
      finalize(() => {
        this.sharedService.clearMessageLoading();
      }));
  }
}
