import stein from 'stein-js-client';
import { BehaviorSubject } from 'rxjs';

export type Commodity = {
  uuid: string | null;
  komoditas: string | string;
  area_provinsi: string | null;
  area_kota: string | null;
  size: string | null;
  price: string | null;
  tgl_parsed: string | null;
  timestamp: string | null;
};

export class CommodityService {
  _list$ = new BehaviorSubject<Commodity[] | null>(null);
  list$ = this._list$.asObservable();

  store = new stein(
    'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4'
  );

  constructor() {
    this.list();
  }

  list() {
    this.store
      .read('list')
      .then((data) => {
        this._list$.next(data);
      })
      .catch((e) => console.warn(e));
  }
}

export const commodityService = new CommodityService();
