// 展示文章界面
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        var html = template('postsTpl', response);
        $("#postsBox").html(html);

        $('#page').twbsPagination({
            totalPages: response.pages,
            visiblePages: 5,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                changePage(page);
            }
        });
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

// 点击删除按钮
$('#postsBox').on('click', '.del', function () {
    var id = $(this).attr('data-id');
    if(confirm('您确定要删除此文章吗？')){
        $.ajax({
            type: "delete",
            url: "/posts/" + id,
            success: function (response) {
                location.reload();
            }
        });
    }
})