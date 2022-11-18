import React from 'react';
import 'antd/dist/antd.css';
import { Space, Table, Tag } from 'antd';

const columns = [
  {
    title: 'Tên tài liệu',
    dataIndex: 'name',
    key: 'name',
    
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Đường dẫn',
    dataIndex: 'link',
    key: 'link',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Danh mục',
    dataIndex: 'category',
    key: 'category',
  },
];

const data = [
  {
    key: '1',
    name: 'Tôi thấy hoa vàng trên cỏ xanh',
    link: 'https://thuvienpdf.com/xem-sach/toi-thay-hoa-vang-tren-co-xanh',
    description: 'Tiểu thuyết hay đã được chuyển thể thành phim',
    category: 'tiểu thuyết'
  },
  {
    key: '2',
    name: 'Tôi thấy hoa vàng trên cỏ xanh',
    link: 'https://thuvienpdf.com/xem-sach/toi-thay-hoa-vang-tren-co-xanh',
    description: 'Tiểu thuyết hay đã được chuyển thể thành phim',
    category: 'tiểu thuyết'
  },
  {
    key: '3',
    name: 'Tôi thấy hoa vàng trên cỏ xanh',
    link: 'https://thuvienpdf.com/xem-sach/toi-thay-hoa-vang-tren-co-xanh',
    description: 'Tiểu thuyết hay đã được chuyển thể thành phim',
    category: 'tiểu thuyết'
  },
];
export default function Document() {
  return (
    <>
    <Table columns={columns} dataSource={data} style={{width: "73vw"}} />
    </>
  )
}
