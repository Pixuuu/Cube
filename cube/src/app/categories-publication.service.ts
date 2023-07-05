import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesPublicationService {
  private selectedCategoryIdSubject = new BehaviorSubject<number | null>(null);
  selectedCategoryId$ = this.selectedCategoryIdSubject.asObservable();

  filterPublicationsByCategory(categoryId: number) {
    this.selectedCategoryIdSubject.next(categoryId);
  }
}