// 上传二进制图片 并设置隐藏域
$('#file').on('change', function () {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('image', file);

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$ajax方法不要解析请求参数
        processData: false,
        //告诉$ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response[0].image);
            $('#image').val(response[0].image)
        }
    });
})

// 添加轮播图
$('#slidesPhoto').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
})

// 展示功能
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        var html = template('slideTpl', {
            data: response
        });
        $('#slidesBox').html(html);
    }
});

//删除功能
$('#slidesBox').on('click', '.del', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: "delete",
        url: "/slides/" + id,
        success: function (response) {
            location.reload();
        }
    });
})