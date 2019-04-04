import { Component, Input } from "@angular/core";

@Component({
  selector: "store-search",
  templateUrl: './store-search.component.html',
  styleUrls: ['./store-search.component.css']
})

export class StoreSearchComponent {
  @Input() class: string;
  @Input() placeholder: string;
}
