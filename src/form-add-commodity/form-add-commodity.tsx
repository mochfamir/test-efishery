import React, { Component, ReactNode } from 'react';
import { options, Area, Size } from '../services/options';
import { commodityService, Commodity } from '../services/commodity';

import './form-add-commodity.scss';

type State = {
  optionArea: Area[];
  optionSize: Size[];
  provinces: string[];
  cities: string[];
  inputCommodity: string;
  inputProvince: string;
  inputCity: string;
  inputSize: string;
  inputPrice: string;
};

export class Form extends Component<{ showModal: any }> {
  state: State = {
    optionArea: [],
    optionSize: [],
    provinces: [],
    cities: [],
    inputCommodity: '',
    inputProvince: '',
    inputCity: '',
    inputSize: '',
    inputPrice: '',
  };

  componentDidMount() {
    options.optionArea$.subscribe((areas) => {
      if (areas?.length) {
        setTimeout(() => {
          const newState = {
            ...this.state,
            optionArea: areas,
          };
          this.setState(newState);
        }, 200);
      }
    });

    options.optionSize$.subscribe((optionSize) => {
      if (optionSize?.length) {
        setTimeout(() => {
          const newState = {
            ...this.state,
            optionSize,
          };
          this.setState(newState);
        }, 100);
      }
    });
  }

  onSubmit(e) {
    const {
      inputCommodity,
      inputPrice,
      inputSize,
      inputProvince,
      inputCity,
    } = this.state;
    const input: Commodity = {
      komoditas: inputCommodity,
      area_provinsi: inputProvince,
      area_kota: inputCity,
      size: inputSize,
      price: inputPrice,
    };

    commodityService.create(input);

    this.onCancel();
    e.preventDefault();
  }

  onCancel() {
    const newState = {
      ...this.state,
      inputCommodity: '',
      inputPrice: '',
      inputSize: '',
      inputProvince: '',
      inputCity: '',
    };

    setTimeout(() => {
      this.setState(newState);
    }, 500);

    this.props.showModal(false);
  }

  render(): ReactNode {
    if (this.state.optionArea.length && this.state.optionSize.length) {
      return (
        <div className='form-wrapper'>
          <div className='form-title'>
            <span>Tambah Komoditas</span>
          </div>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <div className='form-group'>
              <label>Komoditas</label>
              <input
                type='text'
                className='form-control'
                value={this.state.inputCommodity}
                onChange={(e) =>
                  this.setState({
                    ...this.state,
                    inputCommodity: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className='form-group'>
              <label>Area Provinsi</label>
              <select
                className='form-control'
                value={this.state.inputProvince}
                placeholder='Pilih area provinsi'
                onChange={(e) => {
                  const value = e.target.value;
                  this.setState({
                    ...this.state,
                    inputProvince: value,
                    inputCity: '',
                    cities: this.state.optionArea
                      .filter((v) => v.province === value)
                      .map((v) => v.city),
                  });
                }}
                required
              >
                <option value='' disabled>
                  ...
                </option>
                {this.state.optionArea
                  .filter(
                    (v, i, a) =>
                      a.findIndex((e) => e.province === v.province) === i
                  )
                  .map((area, i) => (
                    <option key={i} value={area.province as string}>
                      {area.province}
                    </option>
                  ))}
              </select>
            </div>
            {this.state.cities[0] ? (
              <div className='form-group'>
                <label>Area Kota</label>
                <select
                  className='form-control'
                  value={this.state.inputCity}
                  placeholder='Pilih area kota'
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      inputCity: e.target.value,
                    });
                  }}
                  required
                >
                  <option value='' disabled>
                    ...
                  </option>
                  {this.state.cities.map((city, i) => (
                    <option key={i} value={city as string}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div className='form-group'>
              <label>Ukuran</label>
              <select
                className='form-control'
                value={this.state.inputSize}
                placeholder='Pilih area size'
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    inputSize: e.target.value,
                  });
                }}
                required
              >
                <option value='' disabled>
                  ...
                </option>
                {this.state.optionSize.map((option, i) => (
                  <option key={i} value={option.size as string}>
                    {option.size}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label>Harga</label>
              <input
                type='number'
                className='form-control'
                value={this.state.inputPrice}
                onChange={(e) =>
                  this.setState({ ...this.state, inputPrice: e.target.value })
                }
                required
              />
            </div>
            <div className='action-button'>
              <div className='btn-wrapper'>
                <button
                  type='button'
                  className='btn btn-cancel'
                  onClick={() => this.onCancel()}
                >
                  Cancel
                </button>
                <button type='submit' className='btn btn-success btn-submit'>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }

    return <h1>Halo</h1>;
  }
}
