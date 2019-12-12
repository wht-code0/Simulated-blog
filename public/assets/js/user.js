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

$('#avatar').on('change', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#preview').attr('src',response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
})