interface Collection {
  name:string
}

interface Category {
  name:string,
  collections:Array<Collection>
}

export interface Menu {
  _id?:string,
  name:string,
  color:string,
  fontAwesome:string,
  categories:Array<Category>
}