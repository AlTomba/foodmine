import { Component, OnInit } from '@angular/core';
import { Food } from '../shared/models/Food';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FoodService } from '../services/food/food.service';
import { NgFor, NgIf } from '@angular/common';
import { TagsComponent } from "../tags/tags.component";
import { CartService } from '../services/cart/cart.service';
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, TagsComponent, NotFoundComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent implements OnInit {

  food!: Food;
  constructor(private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params["id"]) {
        this.foodService.getFoodById(params["id"])
          .subscribe(serverFood => {
            this.food = serverFood;
          })
      }
    })

  }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

}
