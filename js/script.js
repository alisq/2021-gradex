var url="https://2021.ocadu.gd/feed/json/";

fetch(url)
.then(response => response.json())
  .then(p => {
    //console.log(p.length)
    shuffle(p)
      for (i=0;i<p.length;i++) {
        //console.log(p[i])
        $("#students").append("<div class='student' id='student-"+p[i].nid+"'><div class='initials'>"+intialize(p[i].field_last_name)+"</div><div class='profile-img' style='background-image:url(https://2021.ocadu.gd"+p[i].field_profile_image+")'></div><div class='thumb-img' style='background-image:url(https://2021.ocadu.gd"+p[i].field_thumbnail_image+")'></div><div class='profile-name'>"+p[i].field_last_name+"</div></div>")

         
      }
    
  });


  $("h1").click(function(){
    $("#site-title").fadeIn(200);
    $("#student").fadeOut(200).delay(300).remove();
    $("#students").delay(300).removeClass("selected");

  })

  
     

//   <div class='student'  id='student-"+p[i].nid+"'>
//   <div class='initials'>"+intialize(p[i].field_last_name)+"</div>
//   <div class='profile-img' style='background-image:url(https://2021.ocadu.gd"+p[i].field_profile_image+")'></div>
//   <div class='thumb-img' style="background-image:url(https://2021.ocadu.gd"+p[i].field_thumbnail_image+")'></div>
//    <div class='profile-name'>"+p[i].field_last_name+"</div>
// </div>

$(document).on("click",".student", function(){
  nid = $(this).attr("id").replace("student-","");
  $("#site-title").delay(200).fadeOut(200);

  $("#student").fadeOut(200).delay(200).remove();

  $("#students").addClass("selected")
  
  fetch("https://2021.ocadu.gd/s/"+nid)
.then(response => response.json())
  .then(p => {
      window.history.pushState("https://2021.ocadu.gd", p[0].field_given_names+" "+p[0].field_last_name)

      
      $("<div id='student'></div>")
      /* html */  
      .append(`
        <div class="student--left">
          <h2>${p[0].title}</h2>
          <div class='gallery'>
            ${p[0].field_project_images.replaceAll("\/sites","https:\/\/2021.ocadu.gd\/sites")}
          </div>
          <p>${p[0].body}</p>
          <p>${p[0].field_project_description}</p>
          <label>tags:</label> ${p[0].field_tags} ${p[0].field_additional_}
          <label>workshop instructor:</label> ${[0].field_workshop_}
          
        </div>
        <div class="student--right">
          <h2>${p[0].field_given_names}<br />${p[0].field_last_name}</h2>
          <p>${p[0].field_profile_image.replace("\/sites","https:\/\/2021.ocadu.gd\/sites")}</p>
          <p>${p[0].field_short_biography}</p>
          <p>${p[0].field_email}</p>
          
        </div>
          
          
          
          
          
          

          
          
          
          

        `)
      
          
          // .append("<h2>"+p[0].title+"</h2>")
          // .append("<p>"+p[0].field_project_description+"</p>")
          // .append("<p>"+p[0].field_profile_image.replace("\/sites","https:\/\/2021.ocadu.gd\/sites")+"</p>")
          // .append("<p>"+p[0].field_given_names+" "+p[0].field_last_name+"</p>")
          // .append("<p>"+p[0].field_email+"</p>")
          
          // .append("<p>"+p[0].field_short_biography+"</p>")
          // .append("<p>"+p[0].body+"</p>")
          // .append("<label>tags:</label> "+p[0].field_tags+" "+p[0].field_additional_)
          // .append("<label>workshop instructor:</label> "+p[0].field_workshop_)
          
// field_portfolio_site_link: "<a href=\"https://kmiron.ca\">https://kmiron.ca</a>"
// field_additional_: ""
// field_behance_link: ""
// field_instagram_link: "<a href=\"https://www.instagram.com/kmiron_/\">https://www.instagram.com/kmiron_/</a>"
// field_linked_in_link: "<a href=\"https://ca.linkedin.com/in/kyle-miron-9209731a7\">https://ca.linkedin.com/in/kyle-miron-9209731a7</a>"

// field_project_: "<a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\">annog reven</a>, <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\">uoy evig</a>, <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\">pu</a>"


// field_tags: "<a href=\"/taxonomy/term/14\" hreflang=\"en\">Typography</a>"



          .prependTo("main")


          $('.gallery ul').flickity({
            // options
            cellAlign: 'left',
            contain: true
          });
    
  });
})


  //function to convert to initials

  function intialize(text) {
    const fullName = text.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
  }


  //function to shuffle


  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }