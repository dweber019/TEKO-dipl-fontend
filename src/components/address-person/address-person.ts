import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddressPersonDetailPage } from './../../pages/pages';
import { UserProvider, User } from './../../providers/api-services/users';

@Component({
  selector: 'component-address-person',
  templateUrl: 'address-person.html',
})
export class AddressPersonComponent {

  public users: User[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private userProvider: UserProvider
  ) {
  }

  public ngOnInit(): void {
    this.loading = true;
    this.userProvider.getAll()
      .subscribe(data => {
        this.loading = false;
        this.users = data;
      });
  }

  public goToDetail(user: User): void {
    this.navCtrl.push(AddressPersonDetailPage, user);
  }

}
