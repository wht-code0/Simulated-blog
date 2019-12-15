$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        var html = template('commentsTpl', response);
        $('#commentsBox').html(html);
        var page = template('pageTpl', response);
        $('#pageBox').html(page);
    }
});


// 分页函数
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data: {
            page: page
        },
        success: function (response) {
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            var page = template('pageTpl', response);
            $('#pageBox').html(page);
        }
    });
}

// 处理日期格式
function formteDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

// 批准驳回操作
$('#commentsBox').on('click', '.status', function () {
    var state = $(this).attr('data-state');
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/comments/" + id,
        data: {
            state : state == 0 ? 1 : 0
        },
        success: function (response) {
            location.reload();
        }
    });
})

// 删除操作
$('#commentsBox').on('click', '.del', function(){
    var id = $(this).attr('data-id');
    if(confirm('您确定要删除此评论吗？')){
        $.ajax({
            type: "delete",
            url: "/comments/" + id,
            success: function (response) {
                location.reload();
            }
        });
    }

})