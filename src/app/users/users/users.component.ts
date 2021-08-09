import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/models/users';
import { BaseComponent } from 'src/app/common/base.component';
import {takeUntil} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends BaseComponent implements OnInit {
  addItemForm!: FormGroup;
  editItemForm!: FormGroup;
  users?: User[];
  formValue?: any;

  selectedItem?: number;
  isAdd = true;
  avatar?:any;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    super()
  }
  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      avatar:'',
    });

    this.editItemForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      avatar:'',
    });

    this.getUsers();
  }

  onChangeFile(e: any): void{
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.avatar = reader.result;

    };
  }

  onSubmitAdd(val: any): void{
    const avatar = this.avatar;
    const id = new Date().valueOf();
    const result = {...val, id, avatar};
    this.insertUser(result);
  }

  onSubmitEdit(val: any): void{
    this.updateUser(val);
  }

  getUsers(): void {
    this.userService.getUsers()
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          this.users = res.data;
        },
        (err) => {
          console.log('get all: ', err);
        }
      );
  }

  insertUser(user: User):void{
    this.users?.push(user);
    // this.userService.insertUser(user)
    // .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe(
    //     (res) => {
    //       this.userService.getUsers();
    //     },
    //     (err) => {
    //       console.log(err)
    //     }
    //   );
  }


  onRemoveUser(id: any): void{
    const users = this.users;
    if(users){
      for(let i = 0; i < users.length; i++){
        if(users[i].id == +id){
          this.users?.splice(i, 1);
          this.users = this.users?.length == 0 ? []: this.users;
          break;
        }

      }
    }

    // this.userService.removeUser(+id)
    // .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe(
    //     (res) => {
    //       this.userService.getUsers();
    //     },
    //     (err) => {
    //       console.log(err)
    //     }
    //   );

  }

  onClickUser(user: User): void{
    this.isAdd = false;
    this.selectedItem = user.id;

    this.editItemForm = this.fb.group({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      avatar: '',
    });

    this.avatar = user.avatar;
  }

  updateUser(user: User): void{
    const users = this.users;

    if(users){
      for(let i = 0; i < users.length; i ++){
        if(users[i].id === this.selectedItem){
          users[i].first_name = user.first_name;
          users[i].last_name = user.last_name;
          users[i].avatar = this.avatar;
          users[i].email = user.email;
          break;
        }
      }
    }

    // this.userService.updateUser(user)
    // .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe(
    //     (res) => {
    //       this.userService.getUsers();
    //     },
    //     (err) => {
    //       console.log(err)
    //     }
    //   );
  }

  onClickChangeBtn(): void{
    this.isAdd = false;
  }

  onClickAddBtn(): void{
    this.isAdd = true;
  }
}
