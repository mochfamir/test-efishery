import { BehaviorSubject } from 'rxjs';
import stein from 'stein-js-client';
import { v4 as uuid } from 'uuid';

export type Commodity = {
  uuid?: string | null;
  komoditas: string | null;
  area_provinsi: string | null;
  area_kota: string | null;
  size: string | null;
  price: string | null;
  tgl_parsed?: string | null;
  timestamp?: string | null;
};

export class CommodityService {
  _list$ = new BehaviorSubject<Commodity[]>([]);
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

  create(params: Commodity) {
    const input: Commodity = {
      uuid: uuid(),
      komoditas: params.komoditas,
      area_provinsi: params.area_provinsi,
      area_kota: params.area_kota,
      size: params.size,
      price: params.price,
      tgl_parsed: new Date().toISOString(),
      timestamp: `${new Date().getTime()}`,
    };
    
    this.store.append('list', [input]).then((res) => {
      const list = this._list$.getValue() ;
      
      this._list$.next([...list, input])
    });
  }
}

export const commodityService = new CommodityService();
