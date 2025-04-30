import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent, CommonModule],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        &nbsp;
        <button class="primary" type="button" (click)="filterResults(filter.value)">
          Cerca!
        </button>
        &nbsp;
        <button type="button" (click)="clearResults(filter)">
          Cancella
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location 
        *ngFor="let location of filteredLocationList"
        [housingLocation]="location"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(searchTerm: string) {
    if (!searchTerm) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((location) =>
      location?.city.toLowerCase().includes(searchTerm.toLowerCase())
      || location?.state.toLowerCase().includes(searchTerm.toLowerCase())
      || location?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  clearResults(filter: HTMLInputElement) {
    filter.value = '';
    this.filteredLocationList = this.housingLocationList;
  }
}
