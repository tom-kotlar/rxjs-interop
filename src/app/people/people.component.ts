import { Component, inject } from '@angular/core';
import { SwapiData, SwapiService } from '../swapi.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable, startWith, switchMap } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',


})
export class PeopleComponent {

  searchControl = new FormControl<string>('', [Validators.required, Validators.minLength(2)]);
  swapiService = inject(SwapiService)

  search = toSignal(this.searchControl.valueChanges
    .pipe(
      startWith(''),
      filter(() => this.searchControl.valid || this.searchControl.value === ''),
      debounceTime(500),
      distinctUntilChanged(),
    ), { initialValue: '' })

  character$: Observable<SwapiData> = toObservable(this.search)
    .pipe(
      switchMap((serchedCharacter: string | null) => {
        return this.swapiService.searchCharacter(serchedCharacter)
      })
    )
}


