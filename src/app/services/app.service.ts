import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class AppService {
  networkChangeObservable = new Subject<any>();

  constructor() {
    (navigator as any).connection.addEventListener('change', this.hasGoodConnection.bind(this));
  }

  hasGoodConnection({target}) {
    const conn = (navigator as any).connection;
    if (conn) {
      if (conn.saveData) {
        this.networkChangeObservable.next(target);
      }
      const avoidTheseConnections = ['slow-2g', '2g' /* , '3g', '4g' */];
      const effectiveType = conn.effectiveType || '';
      if (avoidTheseConnections.includes(effectiveType)) {
        this.networkChangeObservable.next(target);
      }
    }
    this.networkChangeObservable.next(target);
  }
}
