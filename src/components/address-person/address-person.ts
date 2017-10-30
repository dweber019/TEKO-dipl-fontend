import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgRadio } from 'ng-radio';

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
    private userProvider: UserProvider,
    private ngRadio: NgRadio,
  ) {
    this.ngRadio.on('person:*').subscribe(() => this.loadPersons());
  }

  public ngOnInit(): void {
    this.loadPersons();
  }

  public goToDetail(user: User): void {
    this.navCtrl.push(AddressPersonDetailPage, user);
  }

  private loadPersons(): void {
    this.loading = true;
    this.userProvider.getAll()
      .subscribe(data => {
        this.loading = false;
        this.users = data;
      });
  }

}
