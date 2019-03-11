$(document).ready(function(){

  const fetch=()=>{
    $('#todo').val('')
    $.ajax({
      url: '/api',
      type: 'get',
      success: function(res) {
        var tableData=``
        if (res.status) {
          if (res.data.length>0) {
            res.data.forEach((row)=>{
              tableData+=`
              <tr>
              <td>${row.todo}</td>
              <td>
              <a href="./edit/?id=${row._id}">Edit</a>
              <a href="./delete?id=${row._id}">Delete</a>
              </td>
              </tr>`
            })
            $("tbody").html(tableData)
          }
          else {
            console.log(res.data);            
          }
        } else {
          console.log(res.data);
        }
      }
    });
  }

  fetch();

  $("#add").click(function(){
    var todo=$("#todo").val();
    if (todo!="") {
      var todoData={
        todo:todo,
      }
      $.ajax({
        url: "/api",
        type: "post",
        data: todoData,
        success: function(resData) {
          console.log(resData);
          fetch()
        }
      });

    }
  })

})
