const Toast = Swal.mixin({toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000
                         });
var resultTable = $("#detectResult").jsGrid({
        height: "100%",
        width: "100%",

        sorting: false,
        paging: false,

        data: [
            {Id: "X", Content: "XXXXX", Type: "X"}
        ],

        fields: [
            { name: "Id", type: "text", width: 10, title: "编号" },
            { name: "Content", type: "text", width: 200, title: "新闻内容" },
            { name: "Type", type: "text", width: 10, title: "检测结果" }
        ]
});

$('#verify_button').on('click', function() {

        Toast.fire({
                    type: 'info',
                    title: '上传数据中，请稍后...'});
        $.ajax({
            //几个参数需要注意一下
                type: "POST",//方法类型
                dataType: "json",//预期服务器返回的数据类型
                url: "/detect/test" ,//url
                success: function (result) {

                    Toast.fire({
                        type: 'success',
                        title: '检验完成'
                    });
                    var result_res = [];
                    data = result.result;
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        result_res.push({
                            Id: data[i].Id,
                            Content: data[i].Content,
                            Type: data[i].Type
                        });
                    }
                    console.log(result_res);
                    resultTable.jsGrid({
                        data: result_res
                    });
                    document.getElementById("acc_score").innerHTML=result.acc;
                    document.getElementById("f1_score").innerHTML=result.f1;
                    document.getElementById("auc_score").innerHTML=result.auc;

                },
                error : function() {
                    alert("异常！");
                }
            });

    });