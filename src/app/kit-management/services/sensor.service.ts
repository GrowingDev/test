import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KitData } from '../models/kit-data.model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private readonly baseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getLatestSensorData(kitId: string): Observable<KitData[]> {
    return this.http.get<KitData[]>(`${this.baseUrl}/sensors/${kitId}/data`)
  }
}
