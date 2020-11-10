interface Info {short:string, long:string}
interface TableField {left:string, right:string}
interface GalleryImage {src:string}

interface Media {
  heroImage:string,
  youtubeUrl:string,
  galleryImages:GalleryImage[]
}

export interface Product {
  _id?:string,
  name:string,
  collection:string,
  price:number,
  discount:number,
  isInStock:boolean,
  info:Info,
  tableFields:TableField[],
  media:Media
}