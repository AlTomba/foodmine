import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../shared/models/Tag';
import { FoodService } from '../services/food/food.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {

  @Input()
  foodPageTags?: string[];

  @Input()
  justifyContent: string = 'center';

  tags?: Tag[];
  constructor(private foodService: FoodService) {
    //if (!this.foodPageTags)
    this.foodService.getAllTags()
      .subscribe(serverTags => {
        this.tags = serverTags;
      })

  }

  ngOnInit(): void {

  }

}
