import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setItem(key: string, value: any):void{
    sessionStorage.setItem(key,JSON.stringify(value));
  }

  getItem(key: string): any{
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string):void {
    sessionStorage.removeItem(key);
  }

  clear():void{
    sessionStorage.clear();
  }

  getAllItems(): { [key: string]: any}{
    const items: { [key:string] :any} = {};
    for(let i = 0; i< sessionStorage.length; i++){
      const key = sessionStorage.key(i);
      if(key){
        items[key] = this.getItem(key);
      }
    }
    return items;
  }
}
