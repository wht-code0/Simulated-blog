$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        // template('commentsTpl',)
        console.log(response);
        
    }
});