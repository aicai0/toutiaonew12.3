
$(function() {
    myScroll = new IScroll('#wrapper', {
        scrollX: true,
        scrollY: false,
        mouseWheel: true
    })
});

$.ajax({
        url:"http://api.jisuapi.com/news/channel?appkey=c96d81a2e6f52a48",
        dataType:"jsonp",
        success:function(e){
            // console.log(e);
            let xwpd=e.result;
            let str="";
            xwpd.forEach(function(val,index){
                if(index==0){
                    str+=`<li class="active">${val}</li>`;
                }else{
                    str+=`<li>${val}</li>`;
                }

            })
            $("#scroller ul").html(str);
            render();

          function render(x){
            x=0?0:x;
            let channel=$("#wrapper #scroller .active").text();
            $.ajax({
                url:"http://api.jisuapi.com/news/get?channel="+channel+"&start="+x+"&num=10&appkey=c96d81a2e6f52a48",
                dataType:"jsonp",
                success:function(e){
                    // console.log(e);
                    let xwnr=e.result.list;
                    console.log(xwnr);
                    let str="";
                    xwnr.forEach(function(val){
                        if(!val.pic){
                            str+=`<div class="xwlist">
                              <div class="rightwutu">
                                    <div class="xwtitle"><a href="${val.url}">${val.title}</a></div>
                                    <div class="xwqt">
                                         <div class="xwsrc">${val.src}</div>
                                          <div class="xwtime">${val.time}</div>
                                    </div>
                              </div>
                          </div>`;
                        }else{
                            str+=`<div class="xwlist">
                              <div class="xwtp"><img src="${val.pic}" alt=""></div>
                              <div class="right">
                                    <div class="xwtitle"><a href="${val.url}">${val.title}</a></div>
                                    <div class="xwqt">
                                         <div class="xwsrc">${val.src}</div>
                                          <div class="xwtime">${val.time}</div>
                                    </div>
                              </div>
                          </div>`;
                        }

                    });
                    $("main").html(str+"<div class='jzgd'>+加载更多</div>");


                    $(".jzgd").on("click",function(){
                        // console.log($("main").children().length);
                        render($("main").children().length);
                    })
                }
            });
          }
             $("#scroller ul").on("click","li",function(val){
                     // console.log(this);
                    let lis=$("#scroller ul li");
                    lis.each(function(index,val){
                        // console.log(index,val);
                        // console.log($(val));
                       val.classList.remove("active");
                    });
                    $(this).attr("class","active");
                    render();
             });



        }
});







