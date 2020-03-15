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
$(document).ready(function() {
            //每隔3s自动调用方法，实现图表的实时更新
    t1 = window.setTimeout(updateChart,5000);
  });