$('#formdate').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function (response) {
            location.reload();
        },
        error: function (err) {
            var err = JSON.parse(err.responseText)
            alert(err.message);
        }
    });
    return false;
})

$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        let html = template('userTpl', {
            data: response
        });
        $('#userBox').html(html);
    }
});

$('#modifyBox').on('change', '#avatar', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$ajax方法不要解析请求参数
        processData: false,
        //告诉$ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
})

// 编辑
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function (response) {
            console.log(response);
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    });
})

// 修改
$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        success: function (response) {
            location.reload();
        }
    });

    return false;
})

// 删除
$('#userBox').on('click', '.del', function () {
    var isConfirm = confirm('您确定要删除吗？');
    var id = $(this).attr('data-id');
    if (isConfirm) {
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function (response) {
                location.reload();
            }
        });
    }
})

// 批量删除
var statusAll = $('#statusAll');
var delMany = $('#delMany');
statusAll.on('change', function () {
    var status = $(this).prop('checked');
    $('#userBox').find('input').prop('checked', status);
    if (status) {
        delMany.show();
    } else {
        delMany.hide();
    }
})

$('#userBox').on('change', '.userStatus', function () {
    var inputs = $('#userBox').find('input');
    var users = inputs.filter(':checked').length;

    if (inputs.length == users) {
        statusAll.prop('checked', true);
    } else {
        statusAll.prop('checked', false);
    }

    if (users > 0) {
        delMany.show();
    } else {
        delMany.hide();
    }
})

// 批量删除按钮
delMany.on('click', function () {
    var ids = [];
    var checkedUser = $('#userBox').find('input').filter(':checked');
    checkedUser.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    });

    if(confirm("您确定要批量删除吗？")){
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join('-'),
            success: function (response) {
                location.reload();
            }
        });
    }
})