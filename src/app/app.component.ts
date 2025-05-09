import { Component, ViewChild } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CarsdetailsComponent } from "./components/cars/carsdetails/carsdetails.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'carsCatalog_1';

 
}
