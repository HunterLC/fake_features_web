const Toast = Swal.mixin({toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000
                         });
$('#verify_button').on('click', function() {
        Toast.fire({
                    type: 'info',
                    title: '检验中，请稍后...'});
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
                    document.getElementById("acc_score").innerHTML=result.acc;
                    document.getElementById("f1_score").innerHTML=result.f1;
                    document.getElementById("auc_score").innerHTML=result.auc;
                },
                error : function() {
                    alert("异常！");
                }
            });
    });