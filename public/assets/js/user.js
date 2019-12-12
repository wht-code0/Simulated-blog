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

$('#avatar').on('change', function () {
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

$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function (response) {
            console.log(response);
            var html = template('modifyTpl',response);
            $('#modifyBox').html(html);
        }
    });
})