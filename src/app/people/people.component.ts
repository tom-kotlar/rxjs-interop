import { Component, inject } from '@angular/core';
import { SwapiService } from '../swapi.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',


})
export class PeopleComponent {

  searchControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  swapiService = inject(SwapiService) 

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
