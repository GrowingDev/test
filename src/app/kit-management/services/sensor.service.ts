import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KitData } from '../models/kit-data.model';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private readonly baseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getLatestSensorData(kitId: string): Observable<KitData[]> {
    return this.http.get<KitData[]>(`${this.baseUrl}/sensors/${kitId}/data`);
  }
  getAllKitParameters(kitId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/parameter/kit/${kitId}`);
  }
  addSensorParameter(
    kitID: string,
    sensor: string,
    min: string,
    max: string
  ): Observable<void> {
    const data = JSON.stringify({
      kitID: parseInt(kitID),
      sensor: sensor,
      min: min,
      max: max,
    });
    return this.http.post<any>(`${this.baseUrl}/parameter/${kitID}/data`, data);
  }

  addSensorMeasurement(
    kitID: string,
    sensorName: string,
    value: string
  ): Observable<void> {
    const data = JSON.stringify({
      table: 'custom_values',
      name: 'Test',
      value: parseFloat(value),
    });
    console.log(data);
    return this.http.post<any>(
      `${this.baseUrl}/single_sensor/${kitID}/data`,
      data
    );
  }
}
