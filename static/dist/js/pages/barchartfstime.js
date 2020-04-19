//-------------
//- BAR CHART -
//-------------

var featureChartData_fstime = {
      labels  : ['PCA+RFE','PCA+Filter+RFE'],
      datasets: [
        {
          label               : ['特征选择所需要的时间'],
          backgroundColor     : 'rgba(60,141,188,0.9)',
          borderColor         : 'rgba(60,141,188,0.8)',
          pointRadius          : false,
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(60,141,188,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data                : [436.961, 343.727]
        }
      ]
};
var barChartCanvas_fstime = $('#barChart_fstime').get(0).getContext('2d');
var barChartData_fstime = jQuery.extend(true, {}, featureChartData_fstime);
var temp0_fstime = featureChartData_fstime.datasets[0];
barChartData_fstime.datasets[0] = temp0_fstime;
var barChartOptions_fstime = {
      responsive              : true,
      maintainAspectRatio     : false,
      datasetFill             : false
};

var barChart_fstime = new Chart(barChartCanvas_fstime, {
      type: 'bar',
      data: barChartData_fstime,
      options: barChartOptions_fstime
});