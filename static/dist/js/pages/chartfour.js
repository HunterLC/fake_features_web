// var ChartData_four = {
//       labels  : ['原始特征','PCA+RFE','PCA+Filter+RFE','PCA+SelectFromModel+Xgboost'],
//       datasets: [
//         {
//           label               : ['ACC'],
//           backgroundColor     : 'rgba(60,141,188,0.9)',
//           borderColor         : 'rgba(60,141,188,0.8)',
//           pointRadius          : false,
//           pointColor          : '#3b8bba',
//           pointStrokeColor    : 'rgba(60,141,188,1)',
//           pointHighlightFill  : '#fff',
//           pointHighlightStroke: 'rgba(60,141,188,1)',
//           data                : [0.9020, 0.9475, 0.9435, 0.9404]
//         },
//         {
//           label               : ['AUC'],
//           backgroundColor     : 'rgba(210, 214, 222, 1)',
//           borderColor         : 'rgba(210, 214, 222, 1)',
//           pointRadius          : false,
//           pointColor          : '#3b8bba',
//           pointStrokeColor    : 'rgba(210, 214, 222, 1)',
//           pointHighlightFill  : '#fff',
//           pointHighlightStroke: 'rgba(220,220,220,1)',
//           data                : [0.9028, 0.9477, 0.9436, 0.9404]
//         },
//         {
//           label               : ['F1'],
//           backgroundColor     : 'rgba(34 ,139 ,34,0.9)',
//           borderColor         : 'rgba(34 ,139 ,34,0.8)',
//           pointRadius          : false,
//           pointColor          : '#3b8bba',
//           pointStrokeColor    : 'rgba(34 ,139 ,34,1)',
//           pointHighlightFill  : '#fff',
//           pointHighlightStroke: 'rgba(34 ,139 ,34,1)',
//           data                : [0.9018, 0.9475, 0.9435, 0.9404]
//         }
//       ]
// };
// var barChartCanvas_four = $('#barChart_four').get(0).getContext('2d');
// var barChartData_four = jQuery.extend(true, {}, ChartData_four);
// var temp0_four = ChartData_four.datasets[0];
// barChartData_four.datasets[0] = temp0_four;
//
// var barChartOptions_four = {
//     responsive              : true,
//     maintainAspectRatio     : false,
//     datasetFill             : false
// };
//
// var barChart_four = new Chart(barChartCanvas_four, {
//     type: 'bar',
//     data: barChartData_four,
//     options: barChartOptions_four
// });

var ChartData_four_1 = {
      labels  : ['完整特征集','X2-RFE-RF选择的特征子集'],
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
          data                : [90.395, 94.300]
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
          data                : [90.421, 94.311]
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
          data                : [90.373, 94.298]
        }
      ]
};
var barChartCanvas_four_1  = $('#barChart_four_1 ').get(0).getContext('2d');
var barChartData_four_1  = jQuery.extend(true, {}, ChartData_four_1);
var temp0_four_1 = ChartData_four_1.datasets[0];
barChartData_four_1.datasets[0] = temp0_four_1;

var barChartOptions_four_1 = {
    responsive              : true,
    maintainAspectRatio     : false,
    datasetFill             : false
};

var barChart_four_1 = new Chart(barChartCanvas_four_1, {
    type: 'bar',
    data: barChartData_four_1,
    options: barChartOptions_four_1
});