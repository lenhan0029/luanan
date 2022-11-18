import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { getTimeTable } from '../../../api/TimeTable';
import Data from './Data';
import './style.css'

export default function TimeTable() {
  return (
    <div>
        <Data />
    </div>
  )
}
