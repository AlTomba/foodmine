import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { UserService } from '../services/user/user.service';
import { User } from '../shared/models/User';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  cartQuantity = 0;
  user!: User;
  constructor(private cartService: CartService, private userService: UserService) {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }

}
