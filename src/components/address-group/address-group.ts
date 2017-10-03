import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddressGroupDetailPage } from './../../pages/pages';
import { GroupProvider, Group } from './../../providers/api-services/groups';

@Component({
  selector: 'component-address-group',
  templateUrl: 'address-group.html',
})
export class AddressGroupComonent {

  public groups: Group[];

  constructor(
    private navCtrl: NavController,
    private groupProvider: GroupProvider
  ) { }

  public ngOnInit(): void {
    this.groupProvider.getAll()
      .subscribe(data => this.groups = data);
  }

  public goToDetail(group: Group): void {
    this.navCtrl.push(AddressGroupDetailPage, group);
  }

}
