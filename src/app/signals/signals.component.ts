import { NgFor } from '@angular/common';
import {Component, computed, effect, signal} from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {

  constructor() {
    // Whenever a signal changes, it runs code
    // define code that depends on signal and Angular is executed automatically when the counter is changed
    effect(() => console.log(this.counter()));
  }

  // can be mutated by pushing new value to an existing one
  actions = signal<string[]>([]);

  // signal object by returning a function
  counter = signal(0);

  // values that depend on other signal values
  // if the counter() changed, the value will be changed
  doubleCounter = computed(() => this.counter() * 2);

  increment() {
    //this.counter.update((oldCounter) => oldCounter + 1);
    this.counter.set(this.counter() + 1);
    // mutate, modify an existing value except for number
    this.actions.mutate((oldValue) => oldValue.push('INCREMENT'));
  }

  decrement() {
    this.counter.update((oldCounter) => oldCounter - 1);
    this.actions.update((oldValue) => [...oldValue, 'DECREMENT']);
  }
}
