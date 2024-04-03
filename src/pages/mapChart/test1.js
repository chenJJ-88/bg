import React, { useEffect, useRef } from 'react';
import echarts from 'echarts';
import '../../../../map-json/jiangmen';

const geoCoordMap = {
  市区1: [113.0989, 22.81677],
  市区2: [113.200601, 22.672211],
  市区3: [113.038584, 22.440247],
  市区4: [112.793414, 22.250713],
  市区5: [112.592262, 22.566286],
  市区6: [112.761795, 22.766104],
  市区7: [112.314051, 22.382956],
};

const ChartMap = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const mapData = [
      ['市区1', 50, 20, 30],
      ['市区2', 10, 60, 30],
      ['市区3', 40, 10, 50],
      ['市区4', 30, 50, 70],
      ['市区5', 50, 50, 30],
      ['市区6', 60, 30, 30],
      ['市区7', 45, 90, 60],
    ];

    const categoryType = ['数据1', '数据2', '数据3'];

    const renderEachCity = () => {
      const MyCubeRect = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
          width: 10,
          zWidth: 10,
          zHeight: 0,
        },
        buildPath(ctx, shape) {
          const { api } = shape;
          const xAxisPoint = api.coord([shape.xValue, 0]);
          const p0 = [shape.x, shape.y];
          const p1 = [shape.x - 5, shape.y];
          const p4 = [shape.x + 5, shape.y];
          const p2 = [xAxisPoint[0] - 5, xAxisPoint[1]];
          const p3 = [xAxisPoint[0] + 5, xAxisPoint[1]];
          ctx.moveTo(p0[0], p0[1]);
          ctx.lineTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.lineTo(p3[0], p3[1]);
          ctx.lineTo(p4[0], p4[1]);
          ctx.lineTo(p0[0], p0[1]);
          ctx.closePath();
        },
      });

      const MyCubeShadow = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
          width: 15,
          zWidth: 6,
          zHeight: 4,
        },
        buildPath(ctx, shape) {
          const { api } = shape;
          const xAxisPoint = api.coord([shape.xValue, 0]);
          const p1 = [shape.x - 5, shape.y];
          const p4 = [shape.x + 5, shape.y];
          const p6 = [shape.x + 5 + 8, shape.y - 4];
          const p7 = [shape.x - 5 + 8, shape.y - 4];
          const p3 = [xAxisPoint[0] + 5, xAxisPoint[1]];
          const p5 = [xAxisPoint[0] + 5 + 8, xAxisPoint[1] - 4];

          ctx.moveTo(p4[0], p4[1]);
          ctx.lineTo(p3[0], p3[1]);
          ctx.lineTo(p5[0], p5[1]);
          ctx.lineTo(p6[0], p6[1]);
          ctx.lineTo(p4[0], p4[1]);

          ctx.moveTo(p4[0], p4[1]);
          ctx.lineTo(p6[0], p6[1]);
          ctx.lineTo(p7[0], p7[1]);
          ctx.lineTo(p1[0], p1[1]);
          ctx.lineTo(p4[0], p4[1]);
          ctx.closePath();
        },
      });

      echarts.graphic.registerShape('MyCubeRect', MyCubeRect);
      echarts.graphic.registerShape('MyCubeShadow', MyCubeShadow);

      const option = {
        xAxis: [],
        yAxis: [],
        grid: [],
        series: [
          {
            type: 'map',
            map: '地市地图',
            tooltip: {
              show: false,
            },
            label: {
              show: true,
              color: '#FFFFFF',
              fontSize: 16,
            },
            roam: false,
            aspectScale: 1.5,
            zoom: 1,
            center: [112.699885, 22.36442],
            itemStyle: {
              normal: {
                borderColor: 'rgba(147, 235, 248, 0.6)',
                borderWidth: 0.8,
                areaColor: '#ADDEFF',
              },
              emphasis: {
                areaColor: '#ADDEFF',
              },
            },
            zlevel: -100,
          },
        ],
      };

      echarts.util.each(mapData, (dataItem, idx) => {
        const inflationData = [dataItem[1], dataItem[2], dataItem[3]];
        const geoCoord = geoCoordMap[dataItem[0]];
        const coord = myChart.convertToPixel('geo', geoCoord);
        if (!coord && !geoCoord) {
          return;
        }

        const colorList = ['#2364EE', '#F3A612', '#20C0B7', '#748CF3', '#EE8031', '#C52DAD',
          '#F26266', '#0283EA', '#16BA58', '#6E00FF', '#FFCE2F', '#F08C45'];
        const colorListShadow = ['#0346D3', '#EBB34D', '#14A599', '#7D95FC', '#F19350', '#862B77',
          '#F26266', '#0283EA', '#16BA58', '#6E00FF', '#FFCE2F', '#F08C45'];

        const index = `${idx}`;
        option.xAxis.push({
          id: index,
          gridId: index,
          type: 'category',
          name: dataItem[0],
          nameTextStyle: {
            color: '#fff',
          },
          nameLocation: 'middle',
          nameGap: 3,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: categoryType,
          z: 200,
        });
        option.yAxis.push({
          id: index,
          gridId: index,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 200,
        });
        option.grid.push({
          id: index,
          width: 30,
          height: 40,
          left: coord[0] - 15,
          top: coord[1] - 15,
          z: 200,
        });
        option.series.push({
          type: 'custom',
          xAxisId: index,
          yAxisId: index,
          data: inflationData,
          z: 200,
          renderItem(params, api) {
            if (!api.value(1)) {
              return null;
            }
            const location = api.coord([api.value(0), api.value(1)]);
            return {
              type: 'group',
              children: [
                {
                  type: 'MyCubeRect',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                  },
                  style: {
                    fill: colorList[params.dataIndex],
                  },
                },
                {
                  type: 'MyCubeShadow',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                  },
                  style: {
                    fill: colorListShadow[params.dataIndex],
                  },
                }],
            };
          },
        });
      });

      myChart.resize();
      myChart.setOption(option);
    };

    const initEcharts = () => {
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
        },
        z: 100,
        geo: {
          map: '地市地图',
          roam: false,
          aspectScale: 1.5,
          zoom: 1,
          center: [112.699885, 22.31442],
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#fff',
              },
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff',
              },
            },
          },
          itemStyle: {
            normal: {
              areaColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#409EFD',
                },
                {
                  offset: 1,
                  color: '#0866CC',
                },
              ]),
              borderColor: '#fff',
              borderWidth: '2',
            },
            emphasis: {
              areaColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#38D2FF',
                },
                {
                  offset: 1,
                  color: '#0396E8',
                },
              ]),
            },
          },
        },
        series: [],
      };

      myChart.setOption(option);
    };

    initEcharts();
    renderEachCity();

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={chartRef} />;
};

export default ChartMap;
