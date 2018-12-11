import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './modules/auth/auth.guard';

import { HomeComponent } from './main/containers/home/home.component';


const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {
    path: 'roles',
    loadChildren: './modules/role/role.module#RoleModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: './modules/user/user.module#UserModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'countries',
    loadChildren: './modules/country/country.module#CountryModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'currencies',
    loadChildren: './modules/currency/currency.module#CurrencyModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'banks',
    loadChildren: './modules/bank/bank.module#BankModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'withdraws',
    loadChildren: './modules/withdraw/withdraw.module#WithdrawModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'top-ups',
    loadChildren: './modules/topup/topup.module#TopUpModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'transactions',
    loadChildren: './modules/transaction/transaction.module#TransactionModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'deposits',
    loadChildren: './modules/deposit/deposit.module#DepositModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'transfers',
    loadChildren: './modules/transfer/transfer.module#TransferModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
