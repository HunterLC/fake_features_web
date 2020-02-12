//初始化
var dom = document.getElementById("world-map");
var myChart = echarts.init(dom);
var cnDataset = [];
option = null;
updateFlag = true;
var tMap = null;

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
                //color: ['#f7fcfd', '#e4f5f9', '#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#006d2c','#00441b']
                // 按绿色建立colorbrew
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

myChart.showLoading();

function updateMap(){
    jQuery.ajax({
                //几个参数需要注意一下
                type: "GET",//方法类型
                async: false,
                dataType: "json",//预期服务器返回的数据类型
                url: "/getMap" ,//url
                success: function (data) {
                    console.log(data)
                    var res = [];
                    for (var i = 0; i < data.length - 3; i++) {
                        res.push({
                            name: data[i].name,
                            value: data[i].value
                        });
                    }
                    myChart.setOption({
                        baseOption: {
                            backgroundColor: 'transparent',
                            title: [{
                                text: '',
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
                                max: 6500,
                                inRange: {
                                    color: ['#ffecec', '#ffd2d2', '#ffb5b5','#ff9797','#ff7575','#ff5151','#ff2d2d','#ff0000','#ea0000','#ce0000','#ae0000','#930000','#750000','#600000','#4d0000','#2f0000']
                                },
                                text:['高','低'],           // 文本，默认为数值文本
                                textStyle: {
                                    color: 'rgba(0, 0, 0, 0.7)'
                                },
                                calculable: true
                            },
                            // 工具条
                            toolbox: {
                                show: false,
                                left: 'left',
                                top: 'top',
                                feature: {
                                    dataView: {readOnly: false},
                                    restore: {},
                                    saveAsImage: {}
                                }},
                            // 初始数据
                    series: [
                        {
                            name: '人数详情',
                            type: 'map',
                            roam: true,
                            map: 'china',
                            itemStyle: {
                                emphasis:{label:{show:true}}
                                },
                            data: res
                        }],
                        },
                        options: []
                    });
                    myChart.hideLoading();
                    window.clearTimeout(tMap);
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
    tMap = window.setTimeout(updateMap,5000);

});