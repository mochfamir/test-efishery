import { BehaviorSubject } from 'rxjs';
import stein from 'stein-js-client';

export type Area = {
  province: string | null;
  city: string | null;
};

export type Size = {
  size: string | null;
};

export class Options {
  private _optionArea$ = new BehaviorSubject<Area[] | null>(null);
  private _optionSize$ = new BehaviorSubject<Size[] | null>(null);

  public optionArea$ = this._optionArea$.asObservable();
  public optionSize$ = this._optionSize$.asObservable();

  private store = new stein(
    'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4'
  );

  constructor() {
    this.listOptionArea();
    this.listOptionSize();
  }

  private listOptionArea() {
    this.store
      .read('option_area')
      .then((data) => {
        this._optionArea$.next(data);
      })
      .catch((e) => console.warn(e));
  }

  private listOptionSize() {
    this.store
      .read('option_size')
      .then((data) => {
        this._optionSize$.next(data);
      })
      .catch((e) => console.warn(e));
  }
}

export const options = new Options();
