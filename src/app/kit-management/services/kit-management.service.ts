import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KitManagementService {

  private readonly baseUrl = `${environment.apiBaseUrl}`;
  
  constructor(private http: HttpClient) { }

  getMyKits(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/kits/mykits`)
  }

  getCommunityKits(): Observable<any[]>{
    return this.http.get<any>(`${this.baseUrl}/kits/allkits`)
  }
}
