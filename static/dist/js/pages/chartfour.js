var ChartData_four = {
      labels  : ['原始特征','PCA+RFE','PCA+Filter+RFE','PCA+Xgboost'],
      datasets: [
        {
          label               : ['ACC'],
          backgroundColor     : 'rgba(60,141,188,0.9)',
          borderColor         : 'rgba(60,141,188,0.8)',
          pointRadius          : false,
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(60,141,188,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data                : [0.9020, 0.9418, 0.9404, 0.9404]
        },
        {
          label               : ['AUC'],
          backgroundColor     : 'rgba(210, 214, 222, 1)',
          borderColor         : 'rgba(210, 214, 222, 1)',
          pointRadius          : false,
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(210, 214, 222, 1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data                : [0.9028, 0.9423, 0.9407, 0.9404]
        },
        {
          label               : ['F1'],
          backgroundColor     : 'rgba(34 ,139 ,34,0.9)',
          borderColor         : 'rgba(34 ,139 ,34,0.8)',
          pointRadius          : false,
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(34 ,139 ,34,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(34 ,139 ,34,1)',
          data                : [0.9018, 0.9418, 0.9404, 0.9404]
        }
      ]
};
var barChartCanvas_four = $('#barChart_four').get(0).getContext('2d');
var barChartData_four = jQuery.extend(true, {}, ChartData_four);
var temp0_four = ChartData_four.datasets[0];
barChartData_four.datasets[0] = temp0_four;

var barChartOptions_four = {
    responsive              : true,
    maintainAspectRatio     : false,
    datasetFill             : false
};

var barChart_four = new Chart(barChartCanvas_four, {
    type: 'bar',
    data: barChartData_four,
    options: barChartOptions_four
});