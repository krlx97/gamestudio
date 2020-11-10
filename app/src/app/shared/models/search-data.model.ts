export interface SearchProduct {
  collection:string,
  _id:string,
  name:string,
  media: {heroImage:string}
}

export interface SearchData {
  label:string,
  products:SearchProduct[]
}