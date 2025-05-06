import { Routes } from "@angular/router";
import { AdminGuard } from "../guard/admin.guard";
import { AdminComponent } from "../admin/admin.component";

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('../admin-products/admin-products.component').then(m => m.AdminProductsComponent)
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('../admin-users/admin-users.component').then(m => m.AdminUsersComponent)
      }
    ]
  }
];