import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SystemInfoService {
  public ws: WebSocket;

  public createObservableSocket(): Observable<string> {
    this.ws = new WebSocket(environment.websocket.url);

    return new Observable(observer => {
      this.ws.onmessage = event => observer.next(event.data);
      this.ws.onerror = event => observer.error(event);
      this.ws.onclose = event => observer.complete();
    });
  }
}
