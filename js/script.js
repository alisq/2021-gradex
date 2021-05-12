var url="http://2021.ocadu.gd/feed/json/";

fetch(url)
.then(response => response.json())
  .then(p => {
    //console.log(p.length)
      for (i=0;i<p.length;i++) {
        //console.log(p[i])
        $("#students").append("<div class='student' id='student-"+p[i].nid+"'><div class='initials'>"+intialize(p[i].field_last_name)+"</div><div class='profile-img' style='background-image:url(http://2021.ocadu.gd"+p[i].field_profile_image+")'></div><div class='thumb-img' style='background-image:url(http://2021.ocadu.gd"+p[i].field_thumbnail_image+")'></div><div class='profile-name'>"+p[i].field_last_name+"</div></div>")

         
      }
    
  });


  
     

//   <div class='student'  id='student-"+p[i].nid+"'>
//   <div class='initials'>"+intialize(p[i].field_last_name)+"</div>
//   <div class='profile-img' style='background-image:url(http://2021.ocadu.gd"+p[i].field_profile_image+")'></div>
//   <div class='thumb-img' style="background-image:url(http://2021.ocadu.gd"+p[i].field_thumbnail_image+")'></div>
//    <div class='profile-name'>"+p[i].field_last_name+"</div>
// </div>

$(document).on("click",".student", function(){
  nid = $(this).attr("id").replace("student-","");

  
  fetch("http://2021.ocadu.gd/s/"+nid)
.then(response => response.json())
  .then(p => {
      console.log(p);
    $("#students, #site-title").fadeOut(200).delay(200).remove();
      
      $("<div></div>")
          .append("<h2>"+p[0].title+"</h2>")
          .appendTo("#student")
    
  });
})


  //function to convert to initials

  function intialize(text) {
    const fullName = text.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
  }