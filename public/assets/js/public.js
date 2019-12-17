// 处理日期格式
function formteDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

// 从浏览器地址中获取参数
function getUrlParams(name) {
  var paramsAry = location.search.substr(1).split('&');
  // 循环数据
  for (var i = 0; i < paramsAry.length; i++) {
      var tmp = paramsAry[i].split('=');
      if (tmp[0] == name) {
          return tmp[1];
      }
  }
  return -1;
}

$.ajax({
    type: "get",
    url: "/posts/random",
    success: function (response) {
        console.log(response);
        var randomTpl = `
        {{each data v}}
        <li>
            <a href="detail.html?id={{v._id}}">
              <p class="title">{{v.title}}</p>
              <p class="reading">{{v.meta.views}}</p>
              <div class="pic">
                <img src="{{v.thumbnail}}" alt="">
              </div>
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(randomTpl, {
            data: response
        });
        $('#randomBox').html(html);
    }
});

$.ajax({
    type: "get",
    url: "/comments/lasted",
    success: function (response) {
        var avatarTpl = `
        {{each data v}}
          <li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="{{v.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{v.author.nickName}}</span>{{$imports.formteDate(v.createAt)}}说:
                </p>
                <p>{{v.content}}</p>
              </div>
            </a>
          </li>
          {{/each}}
        `;
       var html = template.render(avatarTpl,{data:response});
        $('#avatarBox').html(html);
    }
});

$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var faTpl = `
        {{each data v}}
          <li><a href="list.html?categoryId={{v._id}}">
            <i class="fa {{v.className}}"></i>{{v.title}}</a></li>
        {{/each}}
        `;
        var html = template.render(faTpl,{data:response});
        $('#faBox').html(html);
        $('#navBox').html(html);
    }
});

// 获取到搜索表单 并为其添加表单提交事件
$('.search form').on('submit', function () {
	// 获取到用户在表单中输入的搜索关键字
	var keys = $(this).find('.keys').val();
	// 跳转到搜索结果页面 并且将用户输入的搜索关键字传递到搜索结果页面
	location.href = "/search.html?key=" + keys
	// 阻止表单默认提交行为
	return false;
});