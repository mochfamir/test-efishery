import React, { Component, ReactNode } from 'react';
import { Commodity } from '../services/commodity';

import './list-commodity.scss';

export class ListCommodity extends Component<{ listCommodity: Commodity[] }> {
  render(): ReactNode {
    return (
      <div className='table-responsive table-wrapper'>
        <table className='table table-sm table-hover'>
          <thead>
            <tr>
              <th scope='col'>No.</th>
              <th scope='col'>ID</th>
              <th scope='col'>Komoditas</th>
              <th scope='col'>Harga</th>
              <th scope='col'>Ukuran</th>
              <th scope='col'>Provinsi</th>
              <th scope='col'>Kota</th>
            </tr>
          </thead>
          <tbody>
            {this.props.listCommodity
              .filter((item) => item.uuid && item.komoditas)
              .map((item, i) => (
                <tr key={i}>
                  <th scope='row'>{i + 1}</th>
                  <td>{item.uuid}</td>
                  <td>{item.komoditas}</td>
                  <td>{item.price}</td>
                  <td>{item.size}</td>
                  <td>{item.area_provinsi}</td>
                  <td>{item.area_kota}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
