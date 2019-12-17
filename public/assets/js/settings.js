// 提交
$('#setting').on('submit', function () {
    var formData = $(this).serialize();

    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });

    return false;
})

// 上传图片
$('#logo').on('change', function () {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('logo', file);

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$ajax方法不要解析请求参数
        processData: false,
        //告诉$ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response);
            $('#sitelogo').val(response[0].logo);
            $('#imgBox').prop('src', response[0].logo)
        }

    })
})

// 获取网站配置

$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        if (response) {
            console.log(response);
            
            $('#sitelogo').val(response.logo);
            $('#imgBox').prop('src',response.logo);
            $('input[name="title"]').val(response.title);
            $('input[name="comment]').prop('checked',response.comment);
            $('input[name="review]').prop('checked',response.review);
        }
    }
});