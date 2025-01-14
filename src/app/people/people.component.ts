import { Component,inject, computed } from '@angular/core';
import { SwapiData, SwapiService } from '../swapi.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable, startWith, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',


})
export class PeopleComponent {

  searchControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  swapiService = inject(SwapiService)

  search = this.searchControl.valueChanges
    .pipe(
      startWith(''),
      filter(() => this.searchControl.valid || this.searchControl.value === ''),
      debounceTime(500),
      distinctUntilChanged(),
    )

  character$: Observable<SwapiData> = this.search
    .pipe(
      switchMap((serchedCharacter: string | null) => {
        return this.swapiService.searchCharacter(serchedCharacter)
      })
    )

  characters = toSignal(this.character$, { initialValue: {} as SwapiData });
  totalPeople = computed(() => this.characters().count || 0);
  totalResults = computed(() => this.characters().results?.length || 0);
}


