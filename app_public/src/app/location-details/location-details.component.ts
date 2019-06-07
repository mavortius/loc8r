import { Component, Input, OnInit } from '@angular/core';
import { Location, Review } from "../location";
import { Loc8rDataService } from "../loc8r-data.service";

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  @Input() location: Location;

  public formVisible: boolean = false;

  public formError: string;

  public newReview: Review = {
    author: '',
    rating: 5,
    reviewText: ''
  };

  public googleAPIKey: string = '<API Key>';

  constructor(private dataService: Loc8rDataService) {
  }

  ngOnInit() {
  }

  public onReviewSubmit(): void {
    this.formError = '';

    if (this.formIsValid()) {
      console.log(this.newReview);
      this.dataService.addReviewByLocationId(this.location._id, this.newReview)
        .then((review: Review) => {
          console.log('Review saved', review);
          let reviews = this.location.reviews.slice(0);
          reviews.unshift(review);
          this.location.reviews = reviews;
          this.resetAndHideReviewForm();
        });
    } else {
      this.formError = 'All field required, please try again';
    }
  }

  private resetAndHideReviewForm(): void {
    this.formVisible = false;
    this.newReview.author = '';
    this.newReview.rating = 5;
    this.newReview.reviewText = '';
  }

  private formIsValid(): boolean {
    return !!(this.newReview.author && this.newReview.reviewText && this.newReview.rating);
  }
}
