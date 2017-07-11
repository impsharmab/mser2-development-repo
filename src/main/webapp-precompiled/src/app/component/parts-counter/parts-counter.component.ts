 import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'parts-counter',
  templateUrl: './parts-counter.html'
  //styleUrls: ['./marketing-home.component.css']
})
export class PartsCounterComponent implements OnInit {
    private bannerColumnHeaders: any = [
    { "data": "opCode", "title": "Op Code" },
    { "data": "createdDate", "title": "Created Date" },
    {
      "className": 'details-control',
      "orderable": false,
      "data": null,
      "title": "Delete",
      "defaultContent": '<button type="button" class="btn btn-primary btn-sm" ><i class="fa fa-close"></i></button>'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
