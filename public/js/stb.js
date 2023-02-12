$(function() {

  $("#inp").val("");
  $("#inp_check").val("");

  $("#gen").on("click", function() {
    // let text = $("#inp").val();
    $("#idk_gen").attr("style", "");
    $(".idc").attr("style", "");
    $("#dub").text("0");
    let country = $("#cty").val();
    let limit = $("#limit").val();
    $.ajax({
      url: '/gen',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ country, limit }),
      success: function(info) {
        $("#idk_gen").attr("style", "display:none");
        $(".idc").attr("style", "display:none");
        $("#inp").val(info.done);
        let text = $("#inp").val();
        let new_text = text.replace(/\r\n|\n|\r/gm, ",");
        let t = new_text.split(",");
        $("#count").text(t.length);
      }
    });
  });
  $("#clean").on("click", function() {
    // let text = $("#inp").val();
    let numbers = $("#inp").val();
    let find = $("#find").val();
    let rep = $("#rep").val();
    let sep = $("#sep").val();
    $(".idc").attr("style", "");
    $("#idk_clean").attr("style", "");
    $.ajax({
      url: '/gen/clean',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ numbers, find, rep, sep }),
      success: function(info) {
        $("#idk_clean").attr("style", "display:none");
        $(".idc").attr("style", "display:none");
        $("#inp").val(info.result.text);
        $("#count").text(info.result.count);
        $("#dub").text(info.result.dup);
      }
    });
  });

  $("#check").on("click", function() {
    // let text = $("#inp").val();
    $(".bord").html("");
    let numbers = $("#inp_check").val();
    let cty = $("#cty").val();
    let cari = $("#cari").val();
    const socket = io();
    $("#inp_check").val("");
    // $(".idk").attr("style", "");
    // $(".idc").attr("style", "");
    socket.emit("checknum", { numbers, cty, cari });
    socket.on("done", function(numbers) {
      // $("#inp_check").val(numbers);
      // $(".idk").attr("style", "display:none");
      // $(".idc").attr("style", "display:none");
    })
    socket.on("print", function(result) {
      let last = $("#inp_check").val();
      $("#vali").text(result.data.valid);
      $("#invali").text(result.data.invalid);
      if (result.info.active) {
        if(last == ""){
          $("#inp_check").val(result.info.number);
        }
        else{
          $("#inp_check").val(`${last}\r\n${result.info.number}`);
        }
        $(".bord").prepend(`<li>
          <div class="phone">
              <div class="n">
                  <h3>Number:</h3>
                  <h3 style="color: rgb(0, 255, 0);">${result.info.number}</h3>
              </div>
              <div class="c">
                  <h3>Carrier:</h3>
                  <h3 style="color: rgb(0, 255, 0);">${result.info.carrier}</h3>
              </div>
              <div class="t">
                  <h3>Type:</h3>
                  <h3 style="color: rgb(0, 255, 0);">${result.info.type}</h3>
              </div>
              <div class="v">
                  <h3>Active:</h3>
                  <h3 style="color: rgb(0, 255, 0);">${result.info.active}</h3>
              </div>
          </div>
      </li>`);
      }
      else {
        $(".bord").prepend(`<li>
          <div class="phone">
              <div class="n">
                  <h3>Number:</h3>
                  <h3 style="color: rgb(0, 255, 0);">${result.info.number}</h3>
              </div>
              <div class="c">
                  <h3>Carrier:</h3>
                  <h3 style="color: rgb(0, 255, 0);">${result.info.carrier}</h3>
              </div>
              <div class="t">
                  <h3>Type:</h3>
                  <h3 style="color: rgb(0, 255, 0);">${result.info.type}</h3>   
              </div>
              <div class="v">
                  <h3>Active:</h3>
                  <h3 style="color: rgb(255, 0, 0);">${result.info.active}</h3>
              </div>
          </div>
      </li>`)
      }
    });
    // $.ajax({
    //   url: '/check',
    //   type: 'POST',
    //   contentType: 'application/json',
    //   data: JSON.stringify({numbers,cty,cari}),
    //   success: function(info) {
    //     if(info.active){
    //       $(".bord").append(`<li>
    //       <div class="phone">
    //           <div class="n">
    //               <h3>Number:</h3>
    //               <h3 style="color: rgb(0, 255, 0);">${info.number}</h3>
    //           </div>
    //           <div class="c">
    //               <h3>Carrier:</h3>
    //               <h3 style="color: rgb(0, 255, 0);">${info.carrier}</h3>
    //           </div>
    //           <div class="t">
    //               <h3>Type:</h3>
    //               <h3 style="color: rgb(0, 255, 0);">${info.type}</h3>
    //           </div>
    //           <div class="v">
    //               <h3>Active:</h3>
    //               <h3 style="color: rgb(0, 255, 0);">${info.active}</h3>
    //           </div>
    //       </div>
    //   </li>`);
    //     }
    //     else{
    //       $(".bord").append(`<li>
    //       <div class="phone">
    //           <div class="n">
    //               <h3>Number:</h3>
    //               <h3 style="color: rgb(0, 255, 0);">${info.number}</h3>
    //           </div>
    //           <div class="c">
    //               <h3>Carrier:</h3>
    //               <h3 style="color: rgb(0, 255, 0);">${info.carrier}</h3>
    //           </div>
    //           <div class="t">
    //               <h3>Type:</h3>
    //               <h3 style="color: rgb(0, 255, 0);">${info.type}</h3>   
    //           </div>
    //           <div class="v">
    //               <h3>Active:</h3>
    //               <h3 style="color: rgb(255, 0, 0);">${info.active}</h3>
    //           </div>
    //       </div>
    //   </li>`)
    //     }
    //   }
    // });
  });

  $("#login").on("submit", function(e) {
    e.preventDefault();
    let user = $("#user").val();
    let pass = $("#pass").val();
    let token = $("#token").val();
    $.ajax({
      url: '/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ user, pass, token }),
      success: function(info) {
        console.log(info.ok);
        if (info.ok) {
          window.open("/dashboard", "_self");
        }
        else {
          if (info.online) {
            $(".error").removeClass("hide");
            $(".error p").text("err online");
          }
          else {
            $(".error").removeClass("hide");
            $(".error p").text("err info");
          }
        }
      }
    });
  });

  $("#logout").on("click", function() {
    let user = "none";
    $.ajax({
      url: '/logout',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ user }),
      success: function(info) {
        window.open(info.link, "_self");
      }
    });
  });

  $("#gen_btn").on("click", function() {
    let user = "none";
    $.ajax({
      url: '/buzz/generate',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ user }),
      success: function(info) {
        $("#gen_inp").val(info.token);
      }
    });
  });
  $("#uid").on("submit", function(e) {
    e.preventDefault();
    let user = $("#user_ad").val();
    let pass = $("#pass_ad").val();
    let token = $("#gen_inp").val();
    $.ajax({
      url: '/buzz/add',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ user, pass, token }),
      success: function(info) {
        $("#msg_bk").text(info.msg);
      }
    });
  });
  $("#remove_btn").on("click", function() {
    let token = $("#gen_inp").val();
    $.ajax({
      url: '/buzz/remove',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ token }),
      success: function(info) {
        $("#msg_bk").text(info.msg);
      }
    });
  });
});