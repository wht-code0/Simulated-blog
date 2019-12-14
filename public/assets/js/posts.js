// 展示文章界面
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        var html = template('postsTpl', response);
        $("#postsBox").html(html);

        var page = template('pagesTpl', response);
        $('#page').html(page);
    }
});

// 处理日期格式
function formteDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

// 分页
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function (response) {
            var html = template('postsTpl', response);
            $("#postsBox").html(html);
            var page = template('pagesTpl', response);
            $('#page').html(page);
        }
    });
}

// 筛选展示
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        let html = template('categoriesTpl', {
            data: response
        });
        $('#categories').html(html);
    }
});

// 点击筛选按钮
$('#categoryForm').on('submit', function () {
    var formData = $(this).serialize();
    // 展示文章界面
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function (response) {
            var html = template('postsTpl', response);
            $("#postsBox").html(html);

            var page = template('pagesTpl', response);
            $('#page').html(page);
        }
    });
    return false;
})