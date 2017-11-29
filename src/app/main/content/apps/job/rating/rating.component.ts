import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inpustName:string;
  
  ngOnInit() {
    this.inpustName = this.itemId + '_rating';
  }
  onClick(rating: number): void {
      this.rating = rating;
      this.ratingClick.emit({
          itemId: this.itemId,
          rating: rating
      });
  }

}
