import React, { Component, ReactNode } from 'react';
import { commodityService, Commodity } from './services/commodity';
import { Form } from './form-add-commodity/form-add-commodity';

import { ListCommodity } from './list-commodity/list-commodity';
import { FilterListCommodity } from './filter-list-commodity/filter-list-commodity';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

type State = {
  commodities: Commodity[];
  dataStoreCommodities: Commodity[];
  classModal: string;
  search: string;
};

export default class App extends Component {
  state: State = {
    dataStoreCommodities: [],
    commodities: [],
    search: '',
    classModal: 'modal-hide',
  };

  showModal = (show: boolean) => {
    this.setState({
      ...this.state,
      classModal: show ? 'modal' : 'modal-hide',
    });
  };

  componentDidMount() {
    commodityService.list$.subscribe((commodities) => {
      this.setState({
        ...this.state,
        dataStoreCommodities: commodities,
      });

      this.handleSearch(this.state.search);
    });
  }

  handleSearch = (search: string) => {
    const commodities = [...this.state.dataStoreCommodities];

    const result = commodities.filter((item) => {
      const index = [
        item.komoditas,
        item.price,
        item.size,
        item.area_provinsi,
        item.area_kota,
      ]
        .join('*')
        .toLowerCase() as string;

      if (item?.uuid === search) {
        return true;
      } else if (index.includes(search)) {
        return true;
      }
      return false;
    });

    this.setState({
      ...this.state,
      commodities: result,
      search,
    });
  };

  render(): ReactNode {
      return (
        <div className='app'>
          <div className='header'>
            <FilterListCommodity handleSearch={this.handleSearch} />
            <button
              type='button'
              className='btn btn-success'
              onClick={() => this.showModal(true)}
            >
              Tambah Komoditas
            </button>
          </div>
          <div className={this.state.classModal}>
            <div className='modal-content'>
              <Form showModal={this.showModal} />
            </div>
          </div>
          <ListCommodity listCommodity={this.state.commodities} />
        </div>
      );
  }
}
