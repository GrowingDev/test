import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@UntilDestroy()
@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['./main-wrapper.component.scss'],
})
export class MainWrapperComponent implements OnInit, AfterViewInit {
  @ViewChild('mainNavigation') mainNavigation!: MatSidenav;

  navigationMode: MatDrawerMode = 'side';
  navigationState!: boolean;
  smWidth = false;
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(untilDestroyed(this))
      .subscribe((breakpointState) => {
        setTimeout(() => {
          this.smWidth = breakpointState.matches;
        if (breakpointState.matches) {
          this.navigationMode = 'over';
          this.mainNavigation.close();
        } else {
          this.navigationMode = 'side';
          this.mainNavigation.open();
        }
      });
      });
  }
}
