import { Component } from '@angular/core';


@Component({
  selector: 'app-navbarpanel',
  templateUrl: './navbarpanel.component.html',
  styleUrls: ['./navbarpanel.component.css']
})
export class NavbarpanelComponent {
  showSubcategories: { [key: string]: boolean } = {
    moderation: false,
    administration: false
  };

  toggleSubcategories(category: string) {
    this.showSubcategories[category] = !this.showSubcategories[category];
  }
}
