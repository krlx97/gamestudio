import {Component} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {UserService} from 'src/app/shared/user/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(
    private readonly _matDialogRef:MatDialogRef<UserComponent>,
    private readonly _userService:UserService
  ) {}

  logout():void {
    this._userService.logout()
    this._matDialogRef.close()
  }
}
