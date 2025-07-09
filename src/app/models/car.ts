import { Item } from "./item";
import { Make } from "./make";

export class Car {
    id!:number;
    model:string;
    years: number 
    chassi:string;
    price:number;
    make!:Make;
    items: Item[]= [];
    constructor(model:string, years: number,  chassi:string, price:number, make: Make){
      
        this.model = model;
        this.years = years;
        this.chassi = chassi;
        this.price = price;
        this.make = make;
    }

   

}
