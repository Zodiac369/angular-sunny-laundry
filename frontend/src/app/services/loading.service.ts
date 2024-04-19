import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubdject = new BehaviorSubject<boolean>(false);
  constructor() { }

  showLoading() {
    this.isLoadingSubdject.next(true);
  }

  hideLoading() {
    this.isLoadingSubdject.next(false);
  }

  get isLoading() {
    return this.isLoadingSubdject.asObservable();
  }
  
}
