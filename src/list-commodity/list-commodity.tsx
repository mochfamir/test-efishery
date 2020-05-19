import React, { Component, ReactNode } from 'react';
import { Commodity } from '../services/commodity';

import './list-commodity.scss';

export class ListCommodity extends Component<{
  listCommodity: Commodity[];
  handleSort: (c: string, dir: 'ASC' | 'DSC' | 'NONE') => void;
}> {
  sortDirection = ['ASC', 'DSC', 'NONE'];
  state = {
    sortDir: 2,
    column: '',
  };

  onSorting(col: string): void {
    const { sortDir, column } = this.state;
    const dir = column === col ? (sortDir === 2 ? 0 : sortDir + 1) : 0;
    this.setState({
      sortDir: dir,
      column: col,
    });
    console.log(col, this.sortDirection[dir]);
    const sortDirection = this.sortDirection[dir] as any
    this.props.handleSort(col, sortDirection);
  }

  render(): ReactNode {
    return (
      <div className='table-responsive table-wrapper'>
        <table className='table table-sm table-hover'>
          <thead>
            <tr>
              <th scope='col'>No.</th>
              <th scope='col'>ID</th>
              <th
                scope='col'
                className='sortable'
                onClick={(e) => this.onSorting('komoditas')}
              >
                Komoditas
              </th>
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
