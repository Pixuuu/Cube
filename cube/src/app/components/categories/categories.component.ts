import { Component, Output, EventEmitter } from '@angular/core';
import { CategoriesPublicationService } from 'src/app/categories-publication.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  constructor(private categoriesPublicationService: CategoriesPublicationService) { }

  selectedCategoryId: number | null = null;

  filterPublicationsByCategory(categoryId: number) {
    this.categoriesPublicationService.filterPublicationsByCategory(categoryId);
  }
}