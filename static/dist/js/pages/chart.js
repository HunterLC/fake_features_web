var t1 = null;
var ticksStyle = {
    fontColor: '#495057',
    fontStyle: 'bold'
  };
var mode      = 'index';
var intersect = true;

var $performanceChart = $('#performance-chart');
var performanceChart  = new Chart($performanceChart, {
    data   : {
      labels  : ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [{
        type                : 'line',
        data                : [30, 30, 30, 30, 30, 30, 30],
        backgroundColor     : 'transparent',
        borderColor         : '#007bff',
        pointBorderColor    : '#007bff',
        pointBackgroundColor: '#007bff',
        fill                : false
        // pointHoverBackgroundColor: '#007bff',
        // pointHoverBorderColor    : '#007bff'
      },
        {
          type                : 'line',
          data                : [10, 10, 10, 10, 10, 10, 10],
          backgroundColor     : 'tansparent',
          borderColor         : '#ced4da',
          pointBorderColor    : '#ced4da',
          pointBackgroundColor: '#ced4da',
          fill                : false
          // pointHoverBackgroundColor: '#ced4da',
          // pointHoverBorderColor    : '#ced4da'
        }]
    },
    options: {
      maintainAspectRatio: false,
      tooltips           : {
        mode     : mode,
        intersect: intersect
      },
      hover              : {
        mode     : mode,
        intersect: intersect
      },
      legend             : {
        display: false
      },
      scales             : {
        yAxes: [{
          // display: false,
          gridLines: {
            display      : true,
            lineWidth    : '4px',
            color        : 'rgba(0, 0, 0, .2)',
            zeroLineColor: 'transparent'
          },
          ticks    : $.extend({
            beginAtZero : false,
            suggestedMax: 1
          }, ticksStyle)
        }],
        xAxes: [{
          display  : true,
          gridLines: {
            display: false
          },
          ticks    : ticksStyle
        }]
      }
    }
  })

function updateChart(){
    jQuery.ajax({
            //几个参数需要注意一下
                type: "GET",//方法类型
                async: false,
                dataType: "json",//预期服务器返回的数据类型
                url: "/getTable" ,//url
                success: function (result) {
                    console.log(result.riseRatio);
                    performanceChart.data.datasets[0].data = result.msg1.split(",");
                    performanceChart.data.datasets[1].data = result.msg2.split(",");
                    document.getElementById("performance-score").innerHTML=result.riseRatio * 100 + "%";
                    performanceChart.update();
                    window.clearTimeout(t1);

                },
                error : function() {
                    alert("异常！");
                }
            });
}

var areaChartData = {
      labels  : ['无特征约简数据集', 'PCA+RFE特征选择数据集'],
      datasets: [
        {
          label               : '数据集读取时间',
          backgroundColor     : 'rgba(60,141,188,0.9)',
          borderColor         : 'rgba(60,141,188,0.8)',
          pointRadius          : false,
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(60,141,188,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data                : [36.964, 1.500]
        },
        {
          label               : '数据集模型训练时间',
          backgroundColor     : 'rgba(210, 214, 222, 1)',
          borderColor         : 'rgba(210, 214, 222, 1)',
          pointRadius         : false,
          pointColor          : 'rgba(210, 214, 222, 1)',
          pointStrokeColor    : '#c1c7d1',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data                : [119.376, 8.607]
        },
      ]
    }

var stackedBarChartCanvas = $('#stackedBarChart').get(0).getContext('2d')
var stackedBarChartData = jQuery.extend(true, {}, areaChartData)

var stackedBarChartOptions = {
      responsive              : true,
      maintainAspectRatio     : false,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
};

var stackedBarChart = new Chart(stackedBarChartCanvas, {
      type: 'bar',
      data: stackedBarChartData,
      options: stackedBarChartOptions
});

//-------------
    //- BAR CHART -
    //-------------

var featureChartData = {
      labels  : ['原始特征', 'PCA','PCA+RFE','PCA+Filter+RFE'],
      datasets: [
        {
          label               : ['特征个数'],
          backgroundColor     : 'rgba(60,141,188,0.9)',
          borderColor         : 'rgba(60,141,188,0.8)',
          pointRadius          : false,
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(60,141,188,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data                : [2155, 108, 88, 68]
        }
      ]
    };
    var barChartCanvas = $('#barChart').get(0).getContext('2d');
    var barChartData = jQuery.extend(true, {}, featureChartData);
    var temp0 = featureChartData.datasets[0];
    barChartData.datasets[0] = temp0;

    var barChartOptions = {
      responsive              : true,
      maintainAspectRatio     : false,
      datasetFill             : false
    };

    var barChart = new Chart(barChartCanvas, {
      type: 'bar',
      data: barChartData,
      options: barChartOptions
    });


$(document).ready(function() {
            //每隔3s自动调用方法，实现图表的实时更新
    t1 = window.setTimeout(updateChart,5000);
});