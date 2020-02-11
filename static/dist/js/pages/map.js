//初始化
var dom = document.getElementById("world-map");
var myChart = echarts.init(dom);
var cnDataset = [];
option = null;
var data1 = [
     {"name":"安徽","value":15},{"name":"江西","value":2},{"name":"山西","value":0},{"name":"湖南","value":0},{"name":"湖北","value":10},{"name":"河南","value":2},{"name":"上海","value":105},{"name":"江苏","value":19},{"name":"浙江","value":10},{"name":"福建","value":0},{"name":"山东","value":2},{"name":"北京","value":54},{"name":"天津","value":14},{"name":"河北","value":1},{"name":"广东","value":32},{"name":"海南","value":0},{"name":"台湾","value":25},{"name":"香港","value":36},{"name":"澳门","value":0},{"name":"黑龙江","value":0},{"name":"吉林","value":0},{"name":"辽宁","value":5},{"name":"内蒙古","value":1},{"name":"广西","value":1},{"name":"四川","value":5},{"name":"贵州","value":2},{"name":"云南","value":1},{"name":"重庆","value":3},{"name":"西藏","value":0},{"name":"陕西","value":2},{"name":"甘肃","value":0},{"name":"青海","value":0},{"name":"宁夏","value":0},{"name":"新疆","value":0},{"name":"南海诸岛","value":0}
];
option = {
    baseOption: {
        backgroundColor: 'transparent',
        title: [{
            text: '数据集微博用户地址统计',
            subtext: '',
            sublink: '',
            left: 'center',
            top: '3%',
            textStyle: {
                fontSize: 15,
                color: 'rgba(0, 0, 0, 0.7)'
            }
        }],
        // 鼠标移至省份时的显示标签
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                var value = params.value
                return params.seriesName + '<br/>' + params.name + ': ' + value;
            }
        },
        visualMap: {
            //orient: 'horizontal',
            right: '13%',
            bottom:'35%',
            min: 0,
            max: 420,
            inRange: {
                // http://www.personal.psu.edu/cab38/ColorBrewer/ColorBrewer.html
                color: ['#f7fcfd', '#e4f5f9', '#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#006d2c','#00441b']
                // 按绿色建立colorbrew，LEED项目数数值越大绿色约亮
                //color: ['#fff', '#00441b', '#006d2c', '#238b45','#41ab5d','#74c476','#a1d99b']
            },
            text:['High','Low'],           // 文本，默认为数值文本
            textStyle: {
                color: 'rgba(0, 0, 0, 0.7)'
            },
            calculable: true
        },
        // 工具条
        toolbox: {
            show: false,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        // 初始数据
        series: [
            {
                name: '人数详情1',
                type: 'map',
                roam: true,
                map: 'china',
                itemStyle: {
                    emphasis:{label:{show:true}}
                    },
                data: []
            }],
    },
    options: []
};



var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = data[i].name;
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: data[i].value
            });
        }
    }
    return res;
};


//myChart.showLoading();

function updateMap(){
    jQuery.ajax({
                //几个参数需要注意一下
                type: "GET",//方法类型
                async: false,
                dataType: "json",//预期服务器返回的数据类型
                url: "/getMap" ,//url
                success: function (data) {
                    myChart.setOption({
                        baseOption: {
        backgroundColor: 'transparent',
        title: [{
            text: '数据集微博用户地址统计',
            subtext: '',
            sublink: '',
            left: 'center',
            top: '3%',
            textStyle: {
                fontSize: 15,
                color: 'rgba(0, 0, 0, 0.7)'
            }
        }],
        // 鼠标移至省份时的显示标签
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                var value = params.value
                return params.seriesName + '<br/>' + params.name + ': ' + value;
            }
        },
        visualMap: {
            //orient: 'horizontal',
            right: '13%',
            bottom:'35%',
            min: 0,
            max: 60,
            inRange: {
                // http://www.personal.psu.edu/cab38/ColorBrewer/ColorBrewer.html
                color: ['#f7fcfd', '#e4f5f9', '#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#006d2c','#00441b']
                // 按绿色建立colorbrew，LEED项目数数值越大绿色约亮
                //color: ['#fff', '#00441b', '#006d2c', '#238b45','#41ab5d','#74c476','#a1d99b']
            },
            text:['High','Low'],           // 文本，默认为数值文本
            textStyle: {
                color: 'rgba(0, 0, 0, 0.7)'
            },
            calculable: true
        },
        // 工具条
        toolbox: {
            show: false,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        // 初始数据
        series: [
            {
                name: '人数详情1',
                type: 'map',
                roam: true,
                map: 'china',
                itemStyle: {
                    emphasis:{label:{show:true}}
                    },
                data: data1
            }],
    },
                        options: []
                    });
                },
                error : function() {
                    alert("异常！");
                }
            });
  }


if (option && typeof option === "object") {
    myChart.setOption(option, true);
}

$(document).ready(function() {
    //每隔5s自动调用方法，实现图表的实时更新
    window.setInterval(updateMap,5000);
});