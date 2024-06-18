import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { AuthResponse } from '../models/authresponse';
import { User } from '../models/user';
import { Trip } from '../models/trip';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage)
   { }

  private url = 'http://localhost:3000/api';

  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.url}/trips`);
  }
  addTrip(formData: Trip) : Observable<Trip[]> {
    return this.http.post<Trip[]>(`${this.url}/trips`, formData);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.url}/trips/${tripCode}`);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    return this.http.put<Trip>(`${this.url}/trips/${formData.code}`, formData);
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Something has gone wrong', error);
    return throwError(error.message || error);
  }

  public makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const url: string = `${this.url}/${urlPath}`;
    return this.http.post<AuthResponse>(url, user)
      .pipe(catchError(this.handleError));
  }

  public login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/login`, user)
      .pipe(catchError(this.handleError));
  }
  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }
}


