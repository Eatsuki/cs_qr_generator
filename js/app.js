$(window).ready(function(){
        

    refreshlist();
       
      
  


       function refreshlist(){

        var content=$("#text_content").val();
       
      $.ajax ({
          url:"listrecords.php",
          type:"GET",
          data:"content="+content,
          success:function(res) {
              
              var data = JSON.parse(res);
              var temp= "<table class='table table-striped table-sm'>";
              
              temp += "<tr><th>STUDENT NUMBER</th>" +
                      "<th class='text-right'>NAME</th><th class='text-center'>ADDRESS</th><th class='text-center'>CONTACT NUMBER</th><th class='text-end'>ACTION</th>"+  "</tr>";
              
              var i=0;
              for(i=0;i<data.length-1;i++){
                  
                  temp += "<tr>";
                  temp += "<td class='w-15 p-1'>" + data[i].student_no + "</td>";
                  temp += "<td class='w-10 p-1'>" + data[i].name + "</td>";
                  temp += "<td class='w-15 p-1 text-center'>" + data[i].address + "</td>";
                  temp += "<td class='w-15 p-1 text-center'>" + data[i].contact_no + "</td>";
        temp += "<td class='w-10 p-1 text-end'><button type='button' empno='" + data[i].student_no+ "' class='showbtn btn btn-warning btn-sm p-1 ms-3'><i class='fas fa-eye'></i></button>";
                  temp += "<button type='button' empno='" + data[i].student_no+ "' class='editbtn btn btn-warning btn-sm p-1 ms-3'><i class='far fa-edit fa-s'></i></button>";
                  temp += "<button type='button' empno='" + data[i].student_no+ "' class='delbtn btn btn-warning btn-sm p-1 ms-3'><i class='fas fa-trash-alt fa-s'></i></button>";
                  temp+= "</td>";
                  temp += "</tr>";
              }
              temp += "</table>";
              


              $("#listdisplay").html(temp);

          }
      });

   }


   $("body").on("keyup","#text_content",function(){
    refreshlist();
    });
  
  
   $("#btnAdd").click(function(){

    $("#mode").val("1");
    $("#student_no").val("");
    $("#name").val("");
    $("#address").val("");
    $("#contact_no").val("");
  
   



    $("#student_no").prop("readonly", false);
    $("#name").prop("readonly", false);
    $("#address").prop("readonly", false);
    $("#contact_no").prop("readonly", false);
    
  

    $("#btnSubmit").val("Submit");



    $("#btnSubmit").addClass("disabled");

    $("#student_no, #name, #address, #contact_no").keyup(function(){

    var student_no = $("#student_no").val();
    var name = $("#name").val();
    var address = $("#address").val();
    var contact_no = $("#contact_no").val();
  
    

    if(student_no != "" && name != "" && address != "" && contact_no != ""){

        $("#btnSubmit").removeClass("disabled");
        $("#msg").html("<b>You can now submit!</b>").removeClass("text-danger disabled").addClass("text-success");
       


    } else{
        $("#msg").html("<b>Please fill up all fields!</b>").addClass("text-danger");
        $("#btnSubmit").addClass("disabled");
    }


    });



    $("#btnSubmit").removeClass("bg-danger").addClass("bg-primary");

   });
  
  
  
  
  

  
   $("body").on("click", ".showbtn", function(){
          var empno = $(this).attr("empno");
          $("#myform").modal("show");
          $.ajax({
              url:"select.php",
              type:"GET",
              data:"empno="+empno,
              success: function(res){

        var data = JSON.parse(res);
        $("#student_no").val(data[0].student_no);
        $("#name").val(data[0].name);
        $("#address").val(data[0].address);
        $("#contact_no").val(data[0].contact_no);
      
       
    
    
    
        $("#student_no").prop("readonly", true);
        $("#name").prop("readonly", true);
        $("#address").prop("readonly", true);
        $("#contact_no").prop("readonly", true);

        $("#btnSubmit").val("Submit");


        $("#btnSubmit").addClass("disabled bg-primary").removeClass("bg-danger");

              }
          });

   });


  



   $("body").on("click", ".editbtn", function(){
    var empno = $(this).attr("empno");
    $("#myform").modal("show");
    $.ajax({
        url:"select.php",
        type:"GET",
        data:"empno="+empno,
        success: function(res){

  var data = JSON.parse(res);

    $("#mode").val(2)
    $("#student_no").val(data[0].student_no);
    $("#name").val(data[0].name);
    $("#address").val(data[0].address);
    $("#contact_no").val(data[0].contact_no);


    $("#student_no").prop("readonly", true);
    $("#name").prop("readonly", false);
    $("#address").prop("readonly", false);
    $("#contact_no").prop("readonly", false);


  $("#btnSubmit").val("Update");

  $("#btnSubmit").removeClass("disabled");


          $("#student_no, #name, #address, #contact_no").keyup(function(){

    var student_no = $("#student_no").val();
    var name = $("#name").val();
    var address = $("#address").val();
    var contact_no = $("#contact_no").val();
  
    

    if(student_no != "" && name != "" && address != "" && contact_no != ""){

        $("#btnSubmit").removeClass("disabled");
        $("#msg").html("<b>You can now submit!</b>").removeClass("text-danger disabled").addClass("text-success");
       


    } else{
        $("#msg").html("<b>Please fill up all fields!</b>").addClass("text-danger");
        $("#btnSubmit").addClass("disabled");
    }


    });

  $("#btnSubmit").removeClass("bg-danger").addClass("bg-primary");

        }
    });

});





$("body").on("click", ".delbtn", function(){
    var empno = $(this).attr("empno");
    $("#myform").modal("show");
    $.ajax({
        url:"select.php",
        type:"GET",
        data:"empno="+empno,
        success: function(res){

  var data = JSON.parse(res);

  $("#mode").val(3)
  $("#student_no").val(data[0].student_no);
  $("#name").val(data[0].name);
  $("#address").val(data[0].address);
  $("#contact_no").val(data[0].contact_no);


  $("#student_no").prop("readonly", true);
  $("#name").prop("readonly", true);
  $("#address").prop("readonly", true);
  $("#contact_no").prop("readonly", true);

  $("#btnSubmit").val("Delete");
  $("#btnSubmit").removeClass("disabled bg-primary").addClass("bg-danger");

        }
    });

});





    $("#btnSubmit").click(function(e){

var formData = new FormData($("#form1")[0]);


  $.ajax({
         url:"insert.php",
         type:"POST",
         data:formData,
         success:function(res){
          
 },
         cache:false,
         contentType: false,
         processData:false		   
}); 
                  
        refreshlist();


  });














  });