import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  isLoading: Observable<boolean>;

  constructor(
    private isLoadingService: IsLoadingService,
    private router: Router) {

  }

  ngOnInit(): void {

    this.isLoading = this.isLoadingService.isLoading$();

    this.isLoadingService.add();

    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.isLoadingService.add();
          return;
        }

        this.isLoadingService.remove();
      });
  }

  ngAfterViewInit() {
    this.isLoadingService.remove();
  }

}
