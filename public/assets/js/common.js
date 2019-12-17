$("#logout").on('click', function () {
    var isConfirm = confirm('确定要退出吗？');
    if (isConfirm) {
        $.ajax({
            type: "post",
            url: "/logout",
            success: function (response) {
                location.href = 'login.html'
            },
            error: function (err) {
                alert('退出失败')
            }
        });
    }
})

$.ajax({
    type: "get",
    url: "/users/" + userId,
    success: function (response) {
        $('.avatar').attr('src',response.avatar);
        $('.profile .name').html(response.nickName)
    }
});