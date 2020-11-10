const duration = 7000

export interface Responses {
  invalidToken:() => void,
  expiredToken:() => void,
  accessRestricted:() => void,
  authenticateRes:(role:string) => void
}

export const getResponses = ({_matSnackBar, _userService}):Responses => ({
  invalidToken() {
    const msg = 'Došlo je do greške... Molimo vas, prijavite se ponovo'
    _userService.logout()
    _matSnackBar.open(msg, '', {duration})
  },
  expiredToken() {
    const msg = 'Došlo je do greške... Molimo vas, prijavite se ponovo'
    _userService.logout()
    _matSnackBar.open(msg, '', {duration})
  },
  accessRestricted() {
    const msg = 'Došlo je do greške... Nemate pravo na ovu akciju.'
    _matSnackBar.open(msg, '', {duration})
  },
  authenticateRes(role) {
    _userService.login(role)
  }
})