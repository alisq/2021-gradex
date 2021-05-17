currentURL = window.location.hash.replace("#","").split("/"); 

route(currentURL)


window.addEventListener("hashchange", function(e) {
  console.log(e)
})


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
    window.location.hash = "#";
    $("#site-title").fadeIn(200);
    $("#student").fadeOut(200).delay(300).remove();
    $("#students").delay(300).removeClass("selected");
    shuffle();

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

  window.onpopstate = function(event) {
  console.log(event)
};
  
  fetch("https://2021.ocadu.gd/s/"+nid)
.then(response => response.json())
  .then(p => {
    
    vids = p[0].video.split(", ");
    vidz = ""
    for (j=0;j<vids.length;j++) {
      
      if (vids[j].includes("youtube")) {
        vidz += `<div class="project-vid"><style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/${vids[j].replace("https://www.youtube.com/watch?v=","").split("&")[0]}' frameborder='0' allowfullscreen></iframe></div></div>`
      } else if (vids[j].includes("vimeo")) {
        vidz += `<div class="project-vid"><style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://player.vimeo.com/video/${vids[j].replace("https://vimeo.com/","")}' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></div>`
      }
    }
    
   // if (p[0].video.contains("youtube"))


    pageTitle = p[0].field_given_names+" "+p[0].field_last_name + ' | Virtual by Necessity';
    $("title").text(pageTitle)
      window.history.pushState("https://2021.ocadu.gd", pageTitle)
      window.location.hash="student/"+nid

          
      $("<div id='student'></div>")
      /* html */  
      .append(`
        <div class="student--left">
          <h2>${p[0].title}</h2>
          <div class='gallery'>
            ${vidz}
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
      
        

          .prependTo("main")


          // $('.gallery ul').flickity({
          //   // options
          //   cellAlign: 'left',
          //   contain: true
          // });
    
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


  function route(currentURL) {
    if  (currentURL[0] == "") {
      setTimeout(function(){
        $('h1').click()
      },500)
    
    } else if (currentURL[0] == "student") {
      setTimeout(function(){
        $("#student-"+currentURL[1]).click()
      },500)
    }
    }



    function shuffle() {
      var container = document.getElementById("students");
      var elementsArray = Array.prototype.slice.call(container.getElementsByClassName('student'));
      elementsArray.forEach(function(element){
        container.removeChild(element);
      })
      shuffleArray(elementsArray);
      elementsArray.forEach(function(element){
      container.appendChild(element);
    })
    }
    
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }