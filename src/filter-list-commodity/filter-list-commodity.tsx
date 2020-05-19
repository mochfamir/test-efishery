import React, { Component, ReactNode } from 'react';
import './filter-list-commodity';

export class FilterListCommodity extends Component<{
  handleSearch: (e: any) => void;
}> {
  state = {
    search: '',
    columnSelected: '',
    sortBy: '',
  };

  handleSearch(e) {
    const value = e.target.value as string;

    this.setState({ ...this.state, search: value });
    setTimeout(() => {
      if (value === this.state.search) {
        this.props.handleSearch(value.toLowerCase());
      }
    }, 500)
  }

  render(): ReactNode {
    return (
      <form>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Search'
            value={this.state.search}
            onChange={(e) => this.handleSearch(e)}
          />
        </div>
      </form>
    );
  }
}
