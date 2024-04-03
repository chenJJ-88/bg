
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { countryData } from './areaData'
import { request } from 'utils';

export default function Index(props) {

  const colors = ['#4ab2e5', '#4fb6d2', '#52b9c7', '#5abead', '#f34e2b', '#f34e2b', '#f56321', '#f56f1c', '#f58414', '#f58f0e', '#f5a305', '#e7ab0b']
  let points = [
    { name: '成都', value: [104.07274, 30.57899], itemStyle: { color: '#4ab2e5' } } // 四川成都
    , { name: '渝中区', value: [106.55844, 29.56900], itemStyle: { color: '#4fb6d2' } } // 重庆市 渝中区
    , { name: '毕节市', value: [105.29859, 27.29021], itemStyle: { color: '#52b9c7' } } // 贵州省 毕节市
    , { name: '琼海', value: [110.48055, 19.26425], itemStyle: { color: '#5abead' } } // 海南省 琼海市
    , { name: '武汉', value: [114.31159, 30.59847], itemStyle: { color: '#f34e2b' } } // 湖北省 武汉市
    , { name: '张家口', value: [114.89257, 40.77324], itemStyle: { color: '#f56321' } } // 河北省 张家口市
    , { name: '拉萨', value: [91.17846, 29.65949], itemStyle: { color: '#f56f1c' } } // 西藏自治区 拉萨
    , { name: '广州', value: [113.27143, 23.13534], itemStyle: { color: '#f58414' } } // 广东省 广州
    , { name: '无锡', value: [120.31858, 31.49881], itemStyle: { color: '#f58f0e' } } // 江苏省 无锡市
    , { name: '贵阳', value: [106.63658, 26.65332], itemStyle: { color: '#f5a305' } } // 贵州省 贵阳市
    , { name: '深圳', value: [114.06455, 22.54846], itemStyle: { color: '#e7ab0b' } } // 广东省 深圳市

    , { name: '德阳', value: [104.40442, 31.13312], itemStyle: { color: '#4ab2e5' } } // 四川 德阳市
    , { name: '绵阳', value: [104.68556, 31.47366], itemStyle: { color: '#4ab2e5' } } // 四川 绵阳市
    , { name: '内江', value: [105.06459, 29.58589], itemStyle: { color: '#4ab2e5' } } // 四川 内江市
    , { name: '资阳', value: [104.63444, 30.13496], itemStyle: { color: '#4ab2e5' } } // 四川 资阳市
    , { name: '眉山', value: [103.85657, 30.08253], itemStyle: { color: '#4ab2e5' } } // 四川 眉山市
    , { value: [102.83944, 24.88627], itemStyle: { color: '#4ab2e5' } } // 云南
  ]

  let lines = [
    { coords: [[104.07274, 30.57899], [106.55844, 29.56900]], lineStyle: { color: '#4ab2e5' } }
    , { coords: [[104.07274, 30.57899], [105.29859, 27.29021]], lineStyle: { color: '#4fb6d2' } }
    , { coords: [[104.07274, 30.57899], [110.48055, 19.26425]], lineStyle: { color: '#52b9c7' } }
    , { coords: [[104.07274, 30.57899], [114.31159, 30.59847]], lineStyle: { color: '#5abead' } }
    , { coords: [[104.07274, 30.57899], [114.89257, 40.77324]], lineStyle: { color: '#f34e2b' } }
    , { coords: [[104.07274, 30.57899], [91.17846, 29.65949]], lineStyle: { color: '#f5a305' } }
    , { coords: [[104.07274, 30.57899], [113.27143, 23.13534]], lineStyle: { color: '#f56321' } }
    , { coords: [[104.07274, 30.57899], [120.31858, 31.49881]], lineStyle: { color: '#f56f1c' } }
    , { coords: [[104.07274, 30.57899], [106.63658, 26.65332]], lineStyle: { color: '#f58414' } }
    , { coords: [[104.07274, 30.57899], [114.06455, 22.54846]], lineStyle: { color: '#f58f0e' } }
    , { coords: [[104.07274, 30.57899], [104.40442, 31.13312]], lineStyle: { color: '#f5a305' } }
    , { coords: [[104.07274, 30.57899], [104.68556, 31.47366]], lineStyle: { color: '#e7ab0b' } }
    , { coords: [[104.07274, 30.57899], [105.06459, 29.58589]], lineStyle: { color: '#dfae10' } }
    , { coords: [[104.07274, 30.57899], [104.63444, 30.13496]], lineStyle: { color: '#d5b314' } }
    , { coords: [[104.07274, 30.57899], [103.85657, 30.08253]], lineStyle: { color: '#c1bb1f' } }
    , { coords: [[104.07274, 30.57899], [102.83944, 24.88627]], lineStyle: { color: '#b9be23' } }
  ]

  useEffect(() => {
    const myChart = echarts.init(document.getElementById('city_chart_id'));

    myChart.showLoading();
    echarts.registerMap('china', countryData);
    myChart.hideLoading();

    let data = [
      {
        name: '西藏',
        value: 1
      },
      {
        name: '云南',
        value: 1
      },
      {
        name: '海南',
        value: 1
      },
      {
        name: '江苏',
        value: 1
      },
      {
        name: '湖北',
        value: 1
      },
      {
        name: '河北',
        value: 1
      },
      {
        name: '重庆',
        value: 1
      },
      {
        name: '贵州',
        value: 1
      },
      {
        name: '广东',
        value: 1
      },
      {
        name: '四川',
        value: 3
      }
    ]


    request(
      { url: '/apSign/keeper-special/nationwide/projectList' },
      {
        method: 'GET'
      }
    ).then(res => {
      if (res && res.data) {
        const resdata = res.data
        if (resdata && resdata.length > 0) {
          let lins = [], pots = [], dats = []
          resdata.forEach((item, index) => {
            let col = colors[0]
            if (index < 12) {
              col = colors[index]
            } else {
              const ii = index % 12
              if (colors[ii]) {
                col = colors[ii]
              }
            }
            lins.push({
              coords: [[104.07346, 30.57754], [item.lng, item.lat]],
              lineStyle: { color: col }
            })
            pots.push({
              name: '',//item.name, 
              value: [item.lng, item.lat],
              itemStyle: { color: col }
            })
            let val = 1, na = item.name
            if (item.value <= 5) {
              val = 1
            } else if (item.value <= 10) {
              val = 2
            } else {
              val = 3
            }
            na = na.replace('省', '')
            na = na.replace('市', '')
            na = na.replace('回族自治区', '')
            na = na.replace('壮族自治区', '')
            na = na.replace('维吾尔自治区', '')
            na = na.replace('自治区', '')
            dats.push({
              name: na,
              value: val
            })
          })
          lines = lins
          points = pots
          data = dats
        }
      }
      const option = {
        visualMap: [
          {
            right: 90,
            bottom: '10%',
            min: 0,
            max: 1000,
            show: true,
            // realtime: false,
            // calculable: false,
            seriesIndex: [0],
            // orient: 'horizontal',
            textStyle: {
              color: 'rgba(175,224,254,.9)',
            },
            pieces: [
              // 1~2个项目：62dcfb
              // 3~5个项目：097cf4
              // 6个及以上：f2a437
              {
                gte: 3,
                lte: 3,
                label: '10个以上',
                color: '#f2a437',
              },
              {
                gte: 2,
                lte: 2,
                label: '6~10',
                color: '#097cf4',
              },
              {
                gte: 1,
                lte: 1,
                label: '1~5',
                color: '#62dcfb',
              }
            ],
          },
        ],
        geo: {
          map: 'china',
          aspectScale: 0.75, //长宽比
          zoom: 1.1,
          roam: false,
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
          regions: [{
            name: '南海诸岛',
            itemStyle: {
              areaColor: 'rgba(0, 10, 52, 1)',
              borderColor: 'rgba(0, 10, 52, 1)',
              normal: {
                opacity: 0,
                label: {
                  show: false,
                  color: "#009cc9",
                }
              }
            },
          }],
        },
        series: [
          {
            type: 'map',
            roam: false,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff'//'#1DE9B6'
                }
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgb(147, 235, 248)',
                borderWidth: 1,
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [{
                    offset: 0,
                    color: '#757f88'//'#09132c' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#757f88'  // 100% 处的颜色
                  }],
                  globalCoord: true // 缺省为 false
                },
              },
              emphasis: {
                disabled: true,
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
              }
            },
            zoom: 1.1,
            map: 'china',
            data: data,
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 1,
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: 'fill'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                offset: [15, 0],
                color: '#fff',
                show: true
              },
            },
            itemStyle: {
              normal: {
                color: '#1DE9B6'/* function (value){ //随机颜色
 return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
 }*/,
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            symbolSize: 7,
            data: points
          }, //地图线的动画效果
          {
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 3, //箭头指向速度，值越小速度越快
              trailLength: 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', //箭头图标
              symbolSize: 4, //图标大小
            },
            lineStyle: {
              normal: {
                color: '#1DE9B6',
                /* function (value){ //随机颜色
                
                ['#f21347','#f3243e','#f33736','#f34131','#f34e2b',
                '#f56321','#f56f1c','#f58414','#f58f0e','#f5a305',
                '#e7ab0b','#dfae10','#d5b314','#c1bb1f','#b9be23',
                '#a6c62c','#96cc34','#89d23b','#7ed741','#77d64c',
                '#71d162','#6bcc75','#65c78b','#5fc2a0','#5abead',
                '#52b9c7','#4fb6d2','#4ab2e5']
return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
}*/
                width: 1, //线条宽度
                opacity: 0.1, //尾迹线条透明度
                curveness: .3 //尾迹线条曲直度
              }
            },
            data: lines
          }
        ]
      };
      myChart.setOption(option, true);
    });
    return () => {
      myChart.dispose()
    }
  }, [])
  const getData = async () => {
    let data = ''
    await request(
      { url: '/apSign/keeper-special/nationwide/projectList' },
      {
        method: 'GET'
      }
    ).then(res => {
      if (res && res.data) {
        data = res.data
      }
    });
    return data
  }
  return <div id='city_chart_id' style={{ width: '100%', height: '100%' }}></div>
}



