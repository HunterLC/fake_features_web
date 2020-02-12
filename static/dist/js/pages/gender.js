var tGender = null;
console.log("gender 111")
var pieChartCanvas = $('#pieChartGender')
var pieChart = new Chart(pieChartCanvas, {
    type: 'pie',
    data: {
      labels: [
          '男',
          '女',
          '未知'
      ],
      datasets: [
        {
          data: [700,500,400],
          backgroundColor : ['#f56954', '#f39c12', '#00c0ef'],
        }
      ]
    },
    options: {
    maintainAspectRatio : false,
    responsive : true,
}
});
console.log("gender 2222")
function updateGender(){
    console.log("gender 3333")
    jQuery.ajax({
            //几个参数需要注意一下
                type: "GET",//方法类型
                async: false,
                dataType: "json",//预期服务器返回的数据类型
                url: "/getGender" ,//url
                success: function (data) {
                  console.log("gender的success")
                    pieChart.data.datasets[0].data = data.gender.split(",");
                    pieChart.update();
                    window.clearTimeout(tGender);
                },
                error : function() {
                    alert("异常！");
                }
            });
};

$(document).ready(function() {
      //每隔3s自动调用方法，实现图表的实时更新
    console.log("gender的ready")
    tGender = window.setTimeout(updateGender,5000);
});