const myChart = echarts.init(document.getElementById('map'));
// 市区坐标
const geoCoordMap = {
  "武胜县": [106.295966, 30.349444],
  "岳池县": [106.437577, 30.537899],
  "广安区": [106.641332, 30.47392],
  "前锋区": [106.893188, 30.494804],
  "华蓥区": [106.783095, 30.390993],
  "陵水县": [110.037218, 18.505006]

};
const rawData = [
  ["武胜县", 590],
  ["岳池县", 490],
  ["广安区", 1000],
  ["前锋区", 508],
  ["华蓥区", 700],
  ["陵水县", 690],
];

const option = {
  // 地图背景颜色
  backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.4, [{
    offset: 0,
    color: '#4b5769'
  }, {
    offset: 1,
    color: '#404a59'
  }]),
  geo: {
    map: '北京',
    roam: true, // 是否开启鼠标缩放和平移漫游
    zoom: 1.155, // 地图初始大小
    center: [116.366794, 40.400309], // 初始中心位置
    label: { // 区域文字
      emphasis: { // 区域激活时配置
        show: false
      }
    },
    itemStyle: { // 地区块儿颜色
      normal: { // 普通状态
        areaColor: '#55C3FC',
        borderColor: '#fff'
      },
      emphasis: { // 激活状态
        areaColor: '#21AEF8'
      }
    }
  },
  series: []
};
myChart.setOption(option);
// 渲染各区域上的柱状图
renderEachArea()
// 监听geo变化，并使用防抖
myChart.on('geoRoam', _.debounce(renderEachArea, 0));
// 封装方法--渲染各区域上的柱状图
function renderEachArea() {
  const areaOption = {
    xAxis: [],
    yAxis: [],
    tooltip: {
      trigger: 'axis'
    },
    grid: [],
    series: []
  };
  echarts.util.each(rawData, function (dataItem, idx) {
    // 获取坐标
    var geoCoord = geoCoordMap[dataItem[0]];
    // 转换坐标系上的点到像素坐标值
    var coord = myChart.convertToPixel('geo', geoCoord);
    idx += '';
    // X轴配置
    areaOption.xAxis.push({
      id: idx, // 组件id，在配置中引用标识
      gridIndex: idx, // x轴所在的grid的索引
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
      data: ["数据A", "数据B", "数据C"], // 类目数据
      z: 100
    });
    // Y轴配置
    areaOption.yAxis.push({
      id: idx, // 组件id，在配置中引用标识
      gridIndex: idx, // x轴所在的grid的索引
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
    });
    // 坐标系配置
    areaOption.grid.push({
      id: idx, // 组件id，在配置中引用标识
      width: 30, // 组件的宽度
      height: 40, // 组件的高度
      left: coord[0] - 15, // 离容器左侧的距离
      top: coord[1] - 15, // 离容器上侧的距离
      z: 100
    });
    // 图标系列配置
    areaOption.series.push({
      id: idx, // 组件id，在配置中引用标识
      type: 'bar', // 柱状图
      xAxisId: idx, // 使用的x轴的id
      yAxisId: idx, // 使用的y轴的id
      barGap: 0, // 柱间距离
      barCategoryGap: 0, // 同一系列的柱间距离
      data: [30, 50, 20], // 柱子数据
      z: 100,
      itemStyle: { // 柱子样式
        normal: {
          color: function (params) {
            // 柱状图每根柱子颜色
            var colorList = ['#F75D5D', '#59ED4F', '#4C91E7'];
            return colorList[params.dataIndex];
          }
        }
      }
    });
  });
  // 应用配置
  myChart.setOption(areaOption);
}
