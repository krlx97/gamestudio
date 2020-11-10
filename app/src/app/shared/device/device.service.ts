import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  get isMobile():boolean {
    const {innerWidth} = window
    return innerWidth >= 320 && innerWidth <= 479 ? true : false
  }

  get isTablet():boolean {
    const {innerWidth} = window
    return innerWidth >= 480 && innerWidth <= 767 ? true : false
  }

  get isDesktop():boolean {
    const {innerWidth} = window
    return innerWidth >= 768 ? true : false
  }
}