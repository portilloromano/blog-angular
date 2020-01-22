import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesChangesService {
  ivokeHeaderComponentFunction: EventEmitter<any> = new EventEmitter();

  constructor() { }

  reloadCategoriesOnHeaderComponent(){
    this.ivokeHeaderComponentFunction.emit();
    console.log("Servicio");
  }
}
