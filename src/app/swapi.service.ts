import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface SwapiData {
  count: number
  next: string
  previous: any
  results: Character[]
}

export interface Character {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private base_URL = 'https://swapi.dev/api/people/';
  private http = inject(HttpClient)

  searchCharacter(searchTerm: string | null): Observable<SwapiData> {
    const url = searchTerm ? `${this.base_URL}?search=${searchTerm}` : this.base_URL;
    return this.http.get<SwapiData>(url)
  }
}
