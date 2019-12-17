$.ajax({
    type: "get",
    url: "/posts/recommend",
    success: function (response) {
        var recommendTpl = `
        {{each data v}}
        <li>
            <a href="detail.html?id={{v._id}}">
              <img src="{{v.thumbnail}}" alt="">
              <span>{{v.title}}</span>
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(recommendTpl, {
            data: response
        });
        $('#recommentBox').html(html);
    }
});

$.ajax({
    type: "get",
    url: "/posts/lasted",
    success: function (response) {
        console.log(response);
        var html = template('entryTpl', {
            data: response
        });
        $('#parentBox').html(html);
    }
});

