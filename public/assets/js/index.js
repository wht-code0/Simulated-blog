// 文章统计
$.ajax({
    type: "get",
    url: "/posts/count",
    success: function (response) {
        console.log(response);
        $('#post').html('<strong>'+response.postCount+'</strong>篇文章（<strong>'+response.draftCount+'</strong>篇草稿）')
    }
});

// 分类统计
$.ajax({
    type: "get",
    url: "/categories/count",
    success: function (response) {
        $('#cate').html('<strong>'+response.categoryCount+'</strong>个分类')
    }
});

// 评论统计
$.ajax({
    type: "get",
    url: "/comments/count",
    success: function (response) {
        $('#comment').html('<strong>'+response.commentCount+'</strong>条评论')
    }
});