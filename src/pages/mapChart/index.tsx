import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';
import guangan from '../../guangan.json';
import Map from '@/components/chengDu/chengduChart'
import nanbu from '../../nanbu.json';
import request from '@/utils/request';
const geoCoordMap = {
  "邻水县": [106.988398, 30.334333],
  "武胜县": [106.295966, 30.349444],
  "岳池县": [106.437577, 30.537899],
  "广安区": [106.641332, 30.47392],
  "前锋区": [106.893188, 30.494804],
  "华蓥区": [106.783095, 30.390993],
};
const rawData = [
  ["邻水县", 690],
  ["武胜县", 590],
  ["岳池县", 490],
  ["广安区", 1000],
  ["前锋区", 508],
  ["华蓥区", 700],

];
export default function Index() {

  return (
    <div style={{ border: '1px solid red' }} className='w-[1920px] h-[1080px] flex justify-center items-center' >
      <div className='w-[1000px] h-[800px] border-solid border-2 border-gray-950'
      //  ref={mapChart}
      >
        <Map></Map>
      </div>

    </div>
  )
}
