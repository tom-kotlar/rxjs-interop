import { Component } from '@angular/core';
import { SwapiService } from '../swapi.service';
import { AsyncPipe, JsonPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, ReactiveFormsModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',


})
export class PeopleComponent {

  searchControl = new FormControl<string>('', [Validators.required, Validators.minLength(2)]);

  constructor(private swapiService: SwapiService) { }

  search$ = this.searchControl.valueChanges
    .pipe(
      startWith(''),
      filter(() => this.searchControl.valid || this.searchControl.value === ''),
      debounceTime(500),
      distinctUntilChanged(),
    )

  character$ = this.search$
    .pipe(
      switchMap((serchedCharacter: string | null) => {
        return this.swapiService.searchCharacter(serchedCharacter)
      })
    )
}
