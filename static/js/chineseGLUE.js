/**
 @Name：layui.chineseGLUE
 @Author：CongYu
 @License：MIT
 @Site：https://github.com/chineseGLUE/
 */

layui.define(['element', 'form', 'table','laypage','jquery','laytpl'],function(exports){
  var element = layui.element
  ,form = layui.form
  ,laypage = layui.laypage
  ,$ = layui.jquery
  ,table = layui.table
  ,laytpl = layui.laytpl;

  try{
      if($("#index")[0]){
        console.log($("#index")[0]);
        var is_index = 1;
      }else{
        var is_index = 0;
      }
  }
  catch{
    var is_index = 0;
  }
  console.log("is index",is_index);
  
  // *************  排行榜  *************
  function update_table(score_data){
      table.render({
        elem: '#leader_board'
        //,width: 1000
    //        ,height: 330
        ,cols: [[ //标题栏
          {field: 'id', type:"numbers", title: '排名', width: 50 , unresize: true}
          ,{field: 'team_name', title: '队伍名', width: 150, unresize: true}
          ,{field: 'model_name', title: '模型简称', minWidth: 150, unresize: true}
          ,{field: 'url', title: '链接', minWidth: 100, unresize: true}
          ,{field: 'TNEWS', title: 'TNEWS', width: 100, sort: true, unresize: true}
          ,{field: 'LCQMC', title: 'LCQMC', width: 100, sort: true, unresize: true}
          ,{field: 'XNLI', title: 'XNLI', width: 100, sort: true, unresize: true}
          ,{field: 'INEWS', title: 'INEWS', width: 100, sort: true, unresize: true}
          ,{field: 'avg', title: '最终得分', width: 100, sort: true, unresize: true}
        ]]
        ,data: score_data
        //,skin: 'line' //表格风格
        ,even: true
        ,page: true //是否显示分页
        //,limits: [5, 7, 10]
        ,limit: 10 //每页默认显示的数量
      });
  }
  try{
      if($("#leader_board")[0]){
        var is_leader_board = 1;
        console.log($("#leader_board"));
      }else{
        var is_leader_board = 0;
      }
  }
  catch{
  var is_leader_board = 0;
  }

  if(is_leader_board){
      console.log("加载排行榜...");
      $.ajax({
            url:"http://106.13.187.75:8003/get_score/",
            type: "POST",
            data: {},
            async: true,
            cashe: false,
            //contentType:true,
            //processData:false,
            processData: false,   // jQuery不要去处理发送的数据
            contentType: false,
            success:function (return_data) {
                // 处理数据
                var obj = JSON.parse(return_data);
                console.log(obj);
                if(obj["status"]){
                    update_table(obj["data"]);
                }else{
                    update_table([]);
                }
        　　},
        　　error: function (returndata) {
        　　　　　console.log("upload failed!");
            }
        });
  }
  else{
      //console.log(is_leader_board);
  }
  // *************  排行榜  *************

  // *************  数据集  *************
  try{
      if($("#LAY-msg-box")[0]){
        console.log($("#LAY-msg-box"));
        var is_data_set = 1;
      }else{
        var is_data_set = 0;
      }
  }
  catch{
     var is_data_set = 0;
  }
  if(is_data_set){
    console.log("异步加载数据集...");
    $.ajax({
            url:"http://106.13.187.75:8003/get_data_set/",
            type: "POST",
            data: {},
            async: true,
            cashe: false,
            //contentType:true,
            //processData:false,
            processData: false,   // jQuery不要去处理发送的数据
            contentType: false,
            success:function (return_data) {
                // 处理数据
                var obj = JSON.parse(return_data);
                console.log(obj["data"]);
//                var view = $('#LAY-msg-tpl').html();
                if(obj["status"]){
                    var html = "";
                    for ( var i = 0; i < obj["data"].length; i++){
                        var info = obj["data"][i]["desc"].replace("href=\"/download/","href=\"http://106.13.187.75:8003/download/");
                        //console.log(info);
                        var s1 = '<div class="info-box"><div class="info-item"><img class="info-img" src="#" alt=""><div class="info-text"><p class="title count"><span class="name">' + obj["data"][i]["name"] + '</span><span class="info-img like"><i class="layui-icon layui-icon-praise"></i><em>' + obj["data"][i]["thumb_up_count"]  + '</em></span></p><p class="info-intr">' + info + '</div></div></div>';
                        html += s1;
                    }
                    $('#LAY-msg-box').append(html);
                    element.init();
                }else{
                    //update_table([]);
                }
        　　},
        　　error: function (returndata) {
        　　　　　console.log("upload failed!");
            }
        });
  }
  else{
    //console.log("非数据集");
  }
  // *************  数据集  *************
  
  laypage.render({
    elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
    ,count: 50 //数据总数，从服务端得到
    ,theme: '#1e9fff'
  });

  // *************  start 导航显示隐藏  *************
  $("#mobile-nav").on('click', function(){
    $("#pop-nav").toggle();
  });
  // *************  start 导航显示隐藏  *************
  //start 评论的特效
  
  (function ($) {
    $.extend({
        tipsBox: function (options) {
          options = $.extend({
            obj: null,  //jq对象，要在那个html标签上显示
            str: "+1",  //字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
            startSize: "12px",  //动画开始的文字大小
            endSize: "30px",    //动画结束的文字大小
            interval: 600,  //动画时间间隔
            color: "red",    //文字颜色
            callback: function () { }    //回调函数
          }, options);
          $("body").append("<span class='num'>" + options.str + "</span>");
          var box = $(".num");
          var left = options.obj.offset().left + options.obj.width() / 2;
          var top = options.obj.offset().top - 10;
          box.css({
            "position": "absolute",
            "left": left + "px",
            "top": top + "px",
            "z-index": 9999,
            "font-size": options.startSize,
            "line-height": options.endSize,
            "color": options.color
          });
          box.animate({
            "font-size": options.endSize,
            "opacity": "0",
            "top": top - parseInt(options.endSize) + "px"
          }, options.interval, function () {
            box.remove();
            options.callback();
          });
        }
      });
  })($);

  function niceIn(prop){
    prop.find('i').addClass('niceIn');
    setTimeout(function(){
      prop.find('i').removeClass('niceIn'); 
    },1000);    
  }

  // *************   点赞功能   *************
  $(function () {
    //事件委托，请看下方注释
    $(".container").on('click', ".like", function () {
      console.log("点赞...",$(this).hasClass("laychineseGLUE-this"));
      console.log($(this));
      if(!($(this).hasClass("laychineseGLUE-this"))){
        if($(this).find("em")[0]){
            console.log($(this).find("em")[0]);
            var thumb_up_count = parseInt($(this).find("em")[0].innerHTML);
            thumb_up_count += 1;
            $(this).find("em")[0].innerHTML = thumb_up_count;
        }

        this.text = '已赞';
        $(this).addClass('laychineseGLUE-this');
        $.tipsBox({
          obj: $(this),
          str: "+1",
          callback: function () {
          }
        });
        // ajax 更新点赞 数
        if(is_index){
            console.log("首页点赞");
            $.ajax({
                url:"http://106.13.187.75:8003/thumb_up/",
                type: "POST",
                data: {},
                async: true,
                cashe: false,
                //contentType:true,
                //processData:false,
                processData: false,   // jQuery不要去处理发送的数据
                contentType: false,
                success:function (return_data) {
                    // 处理数据
                    var obj = JSON.parse(return_data);
                    console.log(obj);
                    if(obj["status"]){
                        //
                        niceIn($(this));
                        layer.msg(obj["info"], {
                          icon: 6
                          ,time: 1000
                        })
                    }else{
                        //
    //                    niceIn($(this));
                        layer.msg(obj["info"], {
                          icon: 6
                          ,time: 1000
                        })
                    }
            　　},
            　　error: function (returndata) {
            　　　　　console.log("upload failed!");
                }
            });
        }else if(is_data_set){
            console.log("is_data_set, thumb up");
            var data_set_name = $(this).prev()[0].innerHTML
            console.log(data_set_name);
            var form_data = new FormData();
            form_data.append("data_set_name", data_set_name);
            $.ajax({
                url:"http://106.13.187.75:8003/thumb_up_data_set/",
                type: "POST",
                data: form_data,
                async: true,
                cashe: false,
                //contentType:true,
                //processData:false,
                processData: false,   // jQuery不要去处理发送的数据
                contentType: false,
                success:function (return_data) {
                    // 处理数据
                    var obj = JSON.parse(return_data);
                    console.log(obj);
                    if(obj["status"]){
                        //
                        niceIn($(this));
                        layer.msg(obj["info"], {
                          icon: 6
                          ,time: 1000
                        })
                    }else{
                        //
    //                    niceIn($(this));
                        layer.msg(obj["info"], {
                          icon: 6
                          ,time: 1000
                        })
                    }
            　　},
            　　 error: function (returndata) {
            　　　　　console.log("upload failed!");
                }
            });

        }
        else{
            console.log("");
        }
      } 
    });
  });
  //*************   点赞功能   *************


  //*************  上传成绩   *************

  $("#submit").on('click', function () {
    var team_name= document.getElementById('team_name').value;
    var model_name= document.getElementById('model_name').value;
    var url= document.getElementById('url').value;
    var data_set= document.getElementById('data_set').value;
    console.log(team_name,model_name,url,data_set);
    var file = document.getElementById("file_name").files[0];

    var form_data = new FormData();
    form_data.append("team_name", team_name);
    form_data.append("model_name", model_name);
    form_data.append("url", url);
    form_data.append("data_set", data_set);
    form_data.append("file_name", file);
    if(file){
        fileType = file.name.split('.');	//取到文件名并使用“.”进行切割
    }
    //console.log(file);
	if(! file|| team_name == "" || model_name == "") {	//判断文件类型
		console.log('请确定填写完成！');	//给用户提示，具体怎么调用提示看自己的项目
		layer.msg('请确定填写完成！', {
            icon: 0
            ,time: 1000
        })
		return
	}
	$.ajax({
        url:"http://106.13.187.75:8003/upload_score/",
        type: "POST",
        data: form_data,
        async: true,
        cashe: false,
        //contentType:true,
        //processData:false,
        processData: false,   // jQuery不要去处理发送的数据
        contentType: false,
        success:function (return_data) {
            // 处理数据
            var obj = JSON.parse(return_data);
            console.log(obj);
            layer.msg(obj["info"], {
                icon: 6
                ,time: 2000
            })
            //window.location.href = 'leaderBorder.html';
    　　},
    　　error: function (returndata) {
    　　　　 console.log("upload failed!");
            layer.msg("上传失败", {
                icon: 6
                ,time: 1000
            })
        }
    });
  });
  //*************  上传成绩   *************

  // start  图片遮罩
  var layerphotos = document.getElementsByClassName('layer-photos-demo');
  for(var i = 1;i <= layerphotos.length;i++){
    layer.photos({
      photos: ".layer-photos-demo"+i+""
      ,anim: 0
    }); 
  }
  // end 图片遮罩
  
  //输出test接口
  exports('chineseGLUE', {});
});
