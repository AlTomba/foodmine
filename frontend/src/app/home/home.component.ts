import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { NgFor, NgIf } from '@angular/common';
import { Food } from '../shared/models/Food';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchComponent } from "../search/search.component";
import { TagsComponent } from "../tags/tags.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, SearchComponent, TagsComponent, RouterModule, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {
    let foodsObservable: Observable<Food[]>;
    this.activatedRoute.params.subscribe(params => {
      if (params["searchTerm"]) {
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params["searchTerm"]);
        foodsObservable.subscribe((serverFoods) => {
          this.foods = serverFoods
        })
      } else if (params["tag"]) {
        foodsObservable = this.foodService.getAllFoodsByTag(params["tag"]);
        foodsObservable.subscribe((serverFoods) => {
          this.foods = serverFoods
        })
      } else {
        foodsObservable = this.foodService.getAll();

        foodsObservable.subscribe((serverFoods) => {
          this.foods = serverFoods;
        });
      }
    })
  }

  ngOnInit(): void {



  }
}
