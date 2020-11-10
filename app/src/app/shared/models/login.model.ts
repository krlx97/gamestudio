export interface Login {
  email:string,
  password:string,
  stayLoggedIn:boolean
}

export interface LoginRes {
  token:string,
  role?:string,
  msg?:string
}