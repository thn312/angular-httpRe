import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
  ],
  imports: [
  CommonModule,
  MatCardModule
  ],
  providers: [UserService],
  exports: [MatCardModule]
})
export class UsersModule { }
