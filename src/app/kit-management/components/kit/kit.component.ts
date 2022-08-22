
import { Component, OnInit } from '@angular/core';
import { KitData } from '../../models/kit-data.model';
import { LoadingState } from '../../models/LoadingState';
import { SensorService } from '../../services/sensor.service';
import { KitService } from '../../services/kit.service';

@Component({
  selector: 'app-kit',
  templateUrl: './kit.component.html',
  styleUrls: ['./kit.component.scss'],
})
export class KitComponent implements OnInit {
  kit?: KitData;
  dataLoadingState = LoadingState.Loading;
  readonly loadingState = LoadingState;

  constructor(
    private sensorService: SensorService,
    private kitService: KitService
  ) {}

  ngOnInit(): void {
    this.kitService.selectedKit.subscribe({
      next: (kit) => {
        this.kit = kit;
        console.log(kit)
        this.dataLoadingState = LoadingState.Success;
      },
      error: () => {
        console.log('an error occured');
        this.dataLoadingState = LoadingState.Error
      },
    });
    this.sensorService.getLatestSensorData("1001").subscribe({
      next: (sensors) => {
        console.log(sensors);
      },
      error: () => console.log(),
    });
  }
}
