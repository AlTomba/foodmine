import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit {

  @Input()
  visible: boolean = false;
  @Input()
  notFoundMessage: string = "Nothing found?";
  @Input()
  resetLinkText: string = "Reset search";
  @Input()
  resetLinkRoute: string = "/";

  constructor() {

  }

  ngOnInit(): void {

  }


}
