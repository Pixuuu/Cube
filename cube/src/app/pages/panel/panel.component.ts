import { Component } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  showSubcategories: { [key: string]: boolean } = {
    moderation: false,
    administration: false
  };

  toggleSubcategories(category: string) {
    this.showSubcategories[category] = !this.showSubcategories[category];
  }
}
