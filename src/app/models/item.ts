export class Item {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;

    constructor(id: number, name:string, category: string, price: number, image: string){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.image = image;
    }


}

export interface NewItem {
    name: string;
    category: string;
    price: number;
}