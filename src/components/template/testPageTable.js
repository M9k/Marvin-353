import React from 'react';
import PageTableForm from './PageTableForm';

export default class testPageTable extends React.Component {
  getTableData() {
    const a = ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
      '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
      '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69',
      '0x1efF47bc3a10a45D4B230B5d10E37751FE6AA718',
    ];
    return a;
  }
  deleteTableData() {
    return 1;
  }
  render() {
    return (
      <div>
        <PageTableForm getTableData={this.getTableData} deleteTableData={this.deleteTableData} />
      </div>
    );
  }
}
