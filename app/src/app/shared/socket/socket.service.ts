import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket = io('wss://localhost:443')

  constructor() {console.log(this.socket)}

  on(evtName:string) {
    return new Observable((subscriber) => {
      this.socket.on(evtName, (data:any) => {
        subscriber.next(data)
      })
    })
  }

  onn(event:string, cb):void {
    this.socket.on(event, cb)
  }

  off(evtName:string):void {
    this.socket.off(evtName)
  }

  emit(evtName:string, data?:any):void {
    this.socket.emit(evtName, data)
  }

  init(events:any):void {
    Object.keys(events).forEach((event) => this.socket.on(event, events[event]))
  }

  listen(responses:any):void {
    Object.keys(responses).forEach((response) => {
      this.socket.on(response, responses[response])
    })
  }

  close(events:any):void {
    Object.keys(events).forEach((event) => this.socket.off(event))
  }

  forget(responses:any):void {
    Object.keys(responses).forEach((response) => this.socket.off(response))
  }
}
