// 修改密码
$('#resetPass').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function (response) {
            alert(response.message);
            location.href = '/admin/login.html'
        }
    });
    return false;
})