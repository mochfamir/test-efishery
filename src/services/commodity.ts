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
}

export const commodityService = new CommodityService();
