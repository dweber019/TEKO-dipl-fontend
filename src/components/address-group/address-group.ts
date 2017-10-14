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
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private groupProvider: GroupProvider
  ) { }

  public ngOnInit(): void {
    this.loadGroups();
  }

  public goToDetail(group: Group): void {
    this.navCtrl.push(AddressGroupDetailPage, group);
  }

  private loadGroups(): void {
    this.loading = true;
    this.groupProvider.getAll()
      .subscribe(data => {
        this.loading = false;
        this.groups = data;
      });
  }

}
