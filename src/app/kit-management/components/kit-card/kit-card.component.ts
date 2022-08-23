import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KitData } from '../../models/kit-data.model';
import { LoadingState } from '../../models/LoadingState';
import { KitService } from '../../services/kit.service';
import { SensorService } from '../../services/sensor.service';

@Component({
  selector: 'app-kit-card',
  templateUrl: './kit-card.component.html',
  styleUrls: ['./kit-card.component.scss'],
})
export class KitCardComponent implements OnInit {

  @Input() kit!: KitData;
  dataLoadingState = LoadingState.Loading;
  readonly loadingState = LoadingState;

  constructor(private router: Router,private sensorService: SensorService, private kitService: KitService) {}

  ngOnInit(): void {
    this.sensorService.getLatestSensorData(this.kit.kitID).subscribe({
      next: (sensors) => {

        this.dataLoadingState = LoadingState.Success
      },
      error: () => this.dataLoadingState = LoadingState.Error,
    });
  }
  
  selectKit(): void {
    this.router.navigate(['/kit-management/kit/', this.kit.kitID])
    this.kitService.selectedKit.next(this.kit)
  }
}
