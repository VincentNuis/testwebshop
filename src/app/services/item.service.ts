import { Injectable } from "@angular/core";
import { Item, NewItem } from "../models/item";

@Injectable({
    providedIn:'root'
})

export class ItemService {
    private items: Item[] = [];

    addItem(newItem: NewItem){
        if(this.items.length == 0){
            this.items.push({
                id: 0,
                name: newItem.name,
                category: newItem.category,
                price: newItem.price,
                image: "Cannon.png"
            });
        } else {
        this.items.push({
            id: this.items[this.items.length-1].id + 1,
            name: newItem.name,
            category: newItem.category,
            price: newItem.price,
            image: "Cannon.png"
        });
    }
    }

    removeItem(id: number){
        this.items = this.items.filter(item => item.id !== id);
    }

    getItems(){
        return this.items;
    }
}