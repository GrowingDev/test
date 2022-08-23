import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomSensorService {
  private readonly baseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getCustomSensors(kitID: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/custom_sensor/${kitID}/kit`);
  }

  getCustomSensorsData(kitID: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/custom_sensor/${kitID}/data`);
  }

  addCustomSensor(kitID: string, name: string): Observable<void> {
    const data = JSON.stringify({ name: name });
    return this.http.post<any>(
      `${this.baseUrl}/register_sensor/${kitID}/data`,
      data
    );
  }

  addCustomSensorMeasurement(
    kitID: string,
    sensorName: string,
    value: string
  ): Observable<void> {
    const data = JSON.stringify({
      table: "custom_values",
      name: sensorName,
      value: parseFloat(value),
    });
    console.log(data)
    return this.http.post<any>(
      `${this.baseUrl}/single_sensor/${kitID}/data`,
      data
    );
  }
}
