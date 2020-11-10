import {Component, OnInit, OnDestroy} from '@angular/core'
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'
import {EditBannersComponent} from './edit-banners/edit-banners.component'
import {SocketService} from 'src/app/shared/socket/socket.service'
import {UserService} from 'src/app/shared/user/user.service'
import {Banner} from 'src/app/shared/models/banner.model'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _matDialog:MatDialog,
    private readonly _socketService:SocketService,
    readonly userService:UserService
  ) {}

  banners:Banner[]
  progress = 0
  private _animation:any

  private _nextImage():void {
    for (let i = 0; i < this.banners.length; i += 1) {
      if (this.banners[i].active) {
        this.banners[i].active = false

        if (i < this.banners.length - 1) {
          this.banners[i + 1].active = true
        } else {
          this.banners[0].active = true
        }

        break
      }
    }
  }

  private _animate = ():void => {
    if (this.progress >= 100) {
      this.progress = 0
      this._nextImage()
    } else {
      this.progress += 0.25
    }

    this._animation = requestAnimationFrame(this._animate)
  }

  private readonly _events = {
    getBannersRes: (banners:Banner[]):void => {
      this.banners = banners
      this.banners[0].active = true
      this._animation = requestAnimationFrame(this._animate)
    },
    editBannersRes: (banners:Banner[]):void => {
      this.banners = banners
      this.banners[0].active = true
      this._animation = requestAnimationFrame(this._animate)
    }
  }

  ngOnInit():void {
    const {_socketService, _events} = this

    _socketService.init(_events)
    _socketService.emit('getBanners')
  }

  ngOnDestroy():void {
    const {_socketService, _events} = this

    cancelAnimationFrame(this._animation)
    _socketService.close(_events)
  }

  onEditBanners():void {
    const {banners, _matDialog} = this
    const config:MatDialogConfig = {width: '320px', data: {banners}}

    _matDialog.open(EditBannersComponent, config)
  }

  onViewImage(i:number):void {
    this.banners.forEach((banner) => {
      if (banner.active) {
        banner.active = false
      }
    })

    this.banners[i].active = true
    this.progress = 0
  }
}
