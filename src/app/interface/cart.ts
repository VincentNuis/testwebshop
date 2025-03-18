import { Item } from "../models/item";

export interface CartItem {
    item: Item;
    quantity: number;
}