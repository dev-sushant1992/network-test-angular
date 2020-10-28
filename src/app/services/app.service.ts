import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  networkChangeObservable = new Subject<any>();

  constructor() {
    const conn = (navigator as any).connection;
    if (conn) {
      conn.addEventListener('change', this.hasGoodConnection.bind(this));
    }
  }

  hasGoodConnection({ target }) {
    if (target) {
      if (target.saveData) {
        this.networkChangeObservable.next({isConnectionSlow: true, dataSaver: true});
      }
      const avoidTheseConnections = ['slow-2g', '2g' /* , '3g', '4g' */];
      const effectiveType = target.effectiveType || '';
      if (avoidTheseConnections.includes(effectiveType)) {
        this.networkChangeObservable.next({isConnectionSlow: true});
      }
    }
    this.networkChangeObservable.next({isConnectionSlow: false});
  }
}
