import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KitData } from '../models/kit-data.model';

@Injectable({
  providedIn: 'root'
})
export class KitService {

  selectedKit = new Subject<KitData>();
  private readonly baseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getMyKits(): Observable<KitData[]> {
    return this.http.get<KitData[]>(`${this.baseUrl}/kits/allkits`)
  }

  getCommunityKits(): Observable<any[]>{
    return this.http.get<KitData[]>(`${this.baseUrl}/kits/allkits`)
  }

  addNewKit(kit: KitData): Observable<KitData>{
    return of(kit)
  }
}
