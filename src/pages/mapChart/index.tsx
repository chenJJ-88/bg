import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';
import guangan from '../../guangan.json';
// import 'echarts-gl'; // 引入 echarts-gl
// import { Bar3DChart } from 'echarts/charts';
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
  const mapChart = useRef<HTMLDivElement>(null)


  const renderEachArea = (myChart) => {
    const areaOption: any = {
      xAxis: [],
      yAxis: [],
      tooltip: {
        trigger: 'axis'
      },
      grid: [],
      series: []
    };
    rawData.forEach((dataItem, index) => {
      // 获取坐标
      var geoCoord = geoCoordMap[dataItem[0]];

      // 转换坐标系上的点到像素坐标值
      var coord = myChart.convertToPixel('geo', geoCoord);
      index += '';
      areaOption.xAxis.push({
        id: index,
        gridIndex: index, // x轴所在的grid的索引
        type: 'category', // 坐标轴类型
        name: dataItem[0], // 坐标轴名称
        nameLocation: 'middle', // 坐标轴名称显示位置
        nameGap: 3, // 坐标轴名称与轴线之间的距离
        splitLine: { // 坐标轴在 grid 区域中的分隔线
          show: false
        },
        axisTick: { // 坐标轴刻度
          show: false
        },
        axisLabel: { // 坐标轴刻度标签
          show: false
        },
        axisLine: { // 坐标轴轴线
          onZero: false,
          lineStyle: {
            color: '#666'
          }
        },
        data: [dataItem[0]], // 类目数据
        z: 100
      })

      areaOption.yAxis.push({
        id: index, // 组件id，在配置中引用标识
        gridIndex: index, // x轴所在的grid的索引
        splitLine: { // 坐标轴在 grid 区域中的分隔线
          show: false
        },
        axisTick: { // 坐标轴刻度
          show: false
        },
        axisLabel: { // 坐标轴刻度标签
          show: false
        },
        axisLine: { // 坐标轴轴线
          show: false,
          lineStyle: {
            color: '#1C70B6'
          }
        },
        z: 100

      })

      // 坐标系配置
      areaOption.grid.push({
        id: index, // 组件id，在配置中引用标识
        width: 30, // 组件的宽度
        height: 40, // 组件的高度
        left: coord[0] - 15, // 离容器左侧的距离
        top: coord[1] - 15, // 离容器上侧的距离
        z: 100
      });

      // 图标系列配置
      areaOption.series.push({
        id: index, // 组件id，在配置中引用标识
        type: 'bar', // 柱状图
        xAxisId: index, // 使用的x轴的id
        yAxisId: index, // 使用的y轴的id
        barGap: 0, // 柱间距离
        barCategoryGap: 0, // 同一系列的柱间距离
        data: [dataItem[1]], // 柱子数据
        z: 100,
        itemStyle: { // 柱子样式
          normal: {
            color: function (params: any) {
              // 柱状图每根柱子颜色
              var colorList = ['#4C91E7'];
              return colorList[params.dataIndex];
            }
          }
        }
      });
    })
    // 应用配置
    myChart.setOption(areaOption);
    console.log(areaOption);

  }
  useEffect(() => {
    var myChart = echarts.init(mapChart.current);
    myChart.clear();
    myChart.showLoading();
    echarts.registerMap('guangan1', guangan as any);
    echarts.registerMap('guangan2', guangan as any);
    myChart.hideLoading();
    const option = {
      backgroundColor: "rgba(0,0,0,0)",
      geo: [
        { //关闭hover 上去的图层
          map: "guangan1",
          aspectScale: 0.9,
          roam: false, //是否允许缩放
          // roam:true,
          //zoom: 1.1, //默认显示级别
          layoutSize: "95%",
          layoutCenter: ["50%", "50%"],
          // itemStyle: {
          //   areaColor: "transparent",
          //   borderColor: "#37C1FD",
          //   borderWidth: 2,
          // },
          itemStyle: {
            normal: {
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: '#757f88' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#757f88'  // 100% 处的颜色
                }],
                globalCoord: true // 缺省为 false
              },
              shadowColor: 'rgb(58,115,192)',
              shadowOffsetX: 10,
              shadowOffsetY: 11
            },
            emphasis: {
              areaColor: '#757f88',
              borderWidth: 0,
              color: 'green',
              label: {
                show: false
              }
            }
          },
          emphasis: {
            itemStyle: {
              areaColor: "#72b2ff",
            },
            label: {
              show: true,
              color: "#fff",
              fontSize: 20,
            },
          },

          zlevel: 1,
        },
        // {
        //   map: "guangan2",
        //   aspectScale: 0.9,
        //   roam: false, //是否允许缩放
        //   //zoom: 1.1, //默认显示级别
        //   layoutSize: "95%",
        //   layoutCenter: ["50%", "50%"],
        //   itemStyle: {
        //     areaColor: {
        //       type: "radial",
        //       x: 0.7,
        //       y: 0.5,
        //       r: 0.4,
        //       colorStops: [
        //         {
        //           offset: 0,
        //           //color: "#72b2ff", // 0% 处的颜色
        //           // color:"rgba(8, 79, 207)"
        //           color: "rgba(1, 32, 137,0.5)"

        //         },
        //         {
        //           offset: 1,
        //           color: "rgba(1, 32, 137,0.5)", // 100% 处的颜色
        //         },
        //       ],
        //       global: false, // 缺省为 false
        //     },
        //     borderColor: "#37C1FD",
        //     borderWidth: 2,
        //   },
        //   label: {
        //     show: true,
        //     color: "#fff",
        //     fontSize: 20,
        //   },
        //   zlevel: 2,
        //   silent: true,
        // },
        // {
        //   map: "guangan2",
        //   aspectScale: 0.9,
        //   roam: false, //是否允许缩放
        //   //zoom: 1.1, //默认显示级别
        //   layoutSize: "95%",
        //   layoutCenter: ["50%", "52%"],
        //   itemStyle: {
        //     areaColor: "#005DDC",
        //     borderColor: "rgba(0,0,0,0)",
        //     borderWidth: 1,
        //   },
        //   zlevel: 1,
        //   silent: true,
        // },
      ],
      tooltip: {
        show: false
      },
      legend: {
        show: false
      },
      series: [
        // randomBar3D('武胜县', [106.295966, 30.349444], myChart),
        // randomBar3D('岳池县', [106.437577, 30.537899], myChart),
        // randomBar3D('广安区', [106.641332, 30.47392], myChart),
        // randomBar3D('前锋区', [106.893188, 30.494804], myChart),
        // randomBar3D('华蓥区', [106.783095, 30.390993], myChart),
        // randomBar3D('陵水县', [110.037218, 18.505006], myChart)
      ]
    };


    option && myChart.setOption(option);
    // 渲染各区域上的柱状图
    renderEachArea(myChart)
  }, [mapChart])
  return (
    <div className='w-[1920px] h-[1080px] border-solid border-2 border-gray-300 flex justify-center items-center' >
      <div className='w-[1000px] h-[800px] border-solid border-2 border-gray-950' ref={mapChart}></div>
    </div>
  )
}
