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

// 获取浏览器传递过来的id值
var id = getUrlParams('id');

if (id != -1) {
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function (response) {
            $.ajax({
                type: "get",
                url: "/categories",
                success: function (categories) {
                    response.categories = categories;
                    // console.log(response);
                    var html = template('modifyTpl', response);
                    $('#parentBox').html(html);
                }
            });
        }
    });
}

// 从浏览器地址中获取参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;

}

// 修改文章信息表单提交行为
$('#parentBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    console.log(formData.split('&'));
    
    console.log(id);
    
    $.ajax({
        type: "put",
        url: "/posts/" + id,
        data: formData,
        success: function (response) {
            console.log(response);
            
            location.href = '/admin/posts.html'
        }
    });

    return false;
})