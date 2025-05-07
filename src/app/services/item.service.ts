import { inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Item } from "../models/item";
import { NewItem } from "../interface/newItem";
import { JwtHelperService } from "@auth0/angular-jwt";

const apiUrl = 'https://ipwrc-backend-production.up.railway.app/api/products';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);

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
        }
      });
    } else {
      console.warn('Token is expired or missing');
    }
  }

  getItemById(id: number): Observable<Item> {
    const headers = this.getAuthHeaders();
    return this.http.get<Item>(`${apiUrl}/${id}`, { headers });
  }

  updateItem(id: number, updatedItem: Item): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${apiUrl}/${id}`, updatedItem, { headers });
  }

  deleteItem(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${apiUrl}/${id}`, { headers });
  }
}