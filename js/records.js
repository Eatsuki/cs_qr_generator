
  //LOGS SCRIPT


  refreshlogs();
       
      
  


  function refreshlogs(){

   var content=$("#text_search").val();
  
 $.ajax ({
     url:"record_list.php",
     type:"GET",
     data:"content="+content,
     success:function(res) {
         
         var data = JSON.parse(res);
         var temp= "<table class='table table-striped table-sm'>";
         
         temp += "<tr><th>STUDENT NUMBER</th>" +
                 "<th class='text-right'>NAME</th><th class='text-center'>ADDRESS</th><th class='text-center'>CONTACT NUMBER</th><th class=''>Date & Time</th><th class=''>Temperature</th>"+  "</tr>";
         
         var i=0;
         for(i=0;i<data.length-1;i++){
             
             temp += "<tr>";
             temp += "<td class='w-15 p-1'>" + data[i].student_no + "</td>";
             temp += "<td class='w-10 p-1'>" + data[i].name + "</td>";
             temp += "<td class='w-15 p-1 text-center'>" + data[i].address + "</td>";
             temp += "<td class='w-15 p-1 text-center'>" + data[i].contact_no + "</td>";
             temp += "<td class='w-15 p-1 text-center'>" + data[i].date + " " + data[i].time+ "</td>";
             if(data[i].temperature > 37.5){
             temp += "<td class='w-15 p-1 text-center text-danger fw-bold'>" + data[i].temperature + "</td>";
             } else {
                temp += "<td class='w-15 p-1 text-center'>" + data[i].temperature + "</td>";
             }
             temp += "</tr>";
         }
         temp += "</table>";
         
         $("#listlogs").html(temp);
     }
 });

}


$("body").on("keyup","#text_search",function(){
refreshlogs();
});