// 添加分类表单
$('#categories').on('submit', function () {
    var formData = $(this).serialize();

    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });

    return false;
})

// 获取所有分类列表数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('cateTpl', {
            data: response
        });
        $('#cateBox').html(html);
    }
});
// 处理日期格式
function formteDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

// 为编辑按钮添加事件
$("#cateBox").on('click', '.edit', function () {
    var id = $(this).attr('data-id');

    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function (response) {
            var html = template('bjTpl', response);
            $('#cateBj').html(html);
        }
    });

})

// 为修改按钮添加事件
$('#cateBj').on('submit', '#categories', function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function (response) {
            location.reload();
        }
    });

    return false;
})

// 为删除按钮添加事件
$("#cateBox").on('click', '.del', function () {
    var id = $(this).attr('data-id');
    if(confirm('您确定要删除此分类吗？')){
        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success: function (response) {
                location.reload();
            }
        });
    }
})