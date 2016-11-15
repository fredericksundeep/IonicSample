import { Component, ViewChild } from '@angular/core';
import { Nav,Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
@Component({
  template: `<ion-menu id="mymenu" [content]="content" persistent="true">
  <ion-header>
    <ion-toolbar>
      <ion-title>Menu</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
        {{p.title}}
      </button>
    </ion-list>
  </ion-content>

</ion-menu>

<!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = LoginPage;
pages: Array<{title: string, component: any}>;

  constructor(platform: Platform,public menuCtrl: MenuController ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'Job History', component: MenuPage},
          { title: 'Logout', component: LoginPage}
        ];
  }

  openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
        this.menuCtrl.enable(true);
      this.nav.setRoot(page.component);

    }
}
