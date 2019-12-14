$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryTpl', {
            data: response
        });
        $('#category').html(html);
    }
});

$('#feature').on('change', function () {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('cover', file);

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$ajax方法不要解析请求参数
        processData: false,
        //告诉$ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            $('#thumbnail').val(response[0].cover)
        }
    });
})

// 添加文章表单提交
$('#addForm').on('submit', function () {
    var formData = $(this).serialize();
    
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            location.href = '/admin/posts.html';
            console.log(response);
            
        }
    });

    return false;
})

