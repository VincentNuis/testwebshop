import { inject, Injectable, OnInit, signal } from "@angular/core";
import { Item } from "../models/item";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { NewItem } from "../interface/newItem";
import { JwtHelperService } from "@auth0/angular-jwt";

const apiUrl = 'http://localhost:8080/api/products';

@Injectable({
    providedIn: 'root'
})

export class ItemService implements OnInit {
    private http = inject(HttpClient);
    private jwtHelper = inject(JwtHelperService);
    private items: Item[] = [];
    itemsDB = signal<Item[]>([]);
    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
    }
    addItem(item: NewItem, imageFile: File): Observable<any> {
        const formData = new FormData();
        formData.append('name', item.name);
        formData.append('category', item.category);
        formData.append('price', item.price.toString());
        formData.append('image', imageFile);
        const headers = this.getAuthHeaders();
        return this.http.post(`${apiUrl}/add`, formData, { headers });
    }

    getAllItems(): void {
        const token = localStorage.getItem('token');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            const headers = this.getAuthHeaders();
            this.http.get<Item[]>(`${apiUrl}`, { headers }).subscribe({
                next: (data: Item[]) => {
                    this.itemsDB.set(data);
                },
                error: (error) => {
                    console.error('Error fetching items', error);
                },
            });
        } else {
            console.log('Token is expired or missing');
        }
    }
    // Mock items lijst
    private itemList = signal<Item[]>([
        new Item(1, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
        new Item(2, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
        new Item(3, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
        new Item(4, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
        new Item(5, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
        new Item(6, "Advanced Pet", "PET", 50, "AdvancedPet.jpg"),
        new Item(7, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
        new Item(8, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
        new Item(9, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
        new Item(10, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
        new Item(11, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
        new Item(12, "Battle Chip", "Battle Chips", 10, "Cannon.png"),
        new Item(13, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
        new Item(14, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
        new Item(15, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
        new Item(16, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
        new Item(17, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
        new Item(18, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
        new Item(19, "MegaMan .EXE", "Navi", 40, "Rockman.png"),
    ]);

    getItems = this.itemList;

    // addItem(newItem: Omit<Item, 'id'>) {
    //     const current = this.itemList();
    //     const newId = current.length ? Math.max(...current.map(i => i.id)) + 1 : 1;
    //     this.itemList.set([...current, new Item(newId, newItem.name, newItem.category, newItem.price, newItem.image)]);
    //   }

    deleteItem(id: number) {
        this.itemList.set(this.itemList().filter(item => item.id !== id));
    }

    ngOnInit() {

    }
    // addItem(newItem: NewItem) {


    //     this.httpClient.put('http://localhost:8080/addItem', newItem)
    //         .subscribe({
    //             next: (resData) => console.log(resData)
    //         })
    //     if(this.items.length == 0){
    //         this.items.push({
    //             id: 0,
    //             name: newItem.name,
    //             category: newItem.category,
    //             price: newItem.price,
    //             image: newItem.image
    //         });
    //     } else {
    //     this.items.push({
    //         id: this.items[this.items.length-1].id + 1,
    //         name: newItem.name,
    //         category: newItem.category,
    //         price: newItem.price,
    //         image: newItem.image
    //     });
    // }
    //     console.log(this.items);
    // }

    // removeItem(id: number) {
    //     this.items = this.items.filter(item => item.id !== id);
    // }

    // getItems() {
    //     return this.items;
    // }
}