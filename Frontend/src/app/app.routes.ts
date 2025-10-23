import { Routes } from '@angular/router';

// Import components
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
// import { ConfiguratorComponent } from './modules/configurator/configurator.component';
// import { LogsComponent } from './modules/logs/logs.component';
import { LayoutComponent } from './core/layout/layout.component';

// Import guards
import { AuthGuard } from './core/auth/auth.guard';
import { RoleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // ✅ Protected layout routes (common sidebar/header layout)
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent }
      // { path: 'configurator', component: ConfiguratorComponent },
      // { path: 'logs', component: LogsComponent }
    ]
  },

  // Wildcard route
  { path: '**', redirectTo: 'login' }
];