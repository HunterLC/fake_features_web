const Toast = Swal.mixin({toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000
                         });

$('#image_text_verify_button').on('click', function() {
    var pictureFile = document.getElementById('pictureInputFile').files[0];
    var reader = new FileReader();//这是核心,读取操作就是由它完成.
    reader.readAsDataURL(pictureFile);//读取文件的内容,也可以读取文件的URL
    reader.onload = function () {
        //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
        //console.log(this.result);
        var mc = document.getElementById('imagetextsrc').src = this.result;
        var img = new Image();
        img.src = this.result;
        img.onload = function () {
            var mc = document.getElementById('imagetextsrc');
            var cxt = mc.getContext('2d');
            cxt.drawImage(image,0,0)
        }
        //upload(this.result)
    }

        Toast.fire({
                    type: 'info',
                    title: '检测中，请稍后...'});
        $.ajax({
            //几个参数需要注意一下
                type: "POST",//方法类型
                dataType: "json",//预期服务器返回的数据类型
                data: $('#image_detect_form').serialize(),
                url: "/detect/imagetextscore" ,//url
                success: function (result) {

                    Toast.fire({
                        type: 'success',
                        title: '检验完成'
                    });
                    var result_res = [];
                    data = result.score;
                    document.getElementById("imageTextResult").innerHTML=data;

                },
                error : function() {
                    alert("异常！");
                }
            });

    });