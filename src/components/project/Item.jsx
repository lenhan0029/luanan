import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Card, Col, Modal, Row } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useNavigate } from 'react-router-dom';

export default function Item({data,priority}) {
  let navigate = useNavigate();
  const renderPriority = (d,p) => {
    let arr = [];
    d.forEach(e => {
      if(e.priority == p){
        arr.push(
          <SwiperSlide>
          <Card title={e.name} bordered={false} onClick={() => { navigate('/home/duan/'+ e.id)}}>
            Từ {e.timeStart} đến {e.timeEnd}
          </Card>
        </SwiperSlide>
        )
      }
    });
    return arr;
  }
  
  return (
    <div className="site-card-wrapper">
      <Swiper
      freeMode={true}
      grabCursor={true}
      modules={[FreeMode]}
      className="project-swiper"
      slidesPerView={4}
      spaceBetween={30}>
        {renderPriority(data,priority)}
      </Swiper>
  </div>
  )
}
