
let marquee;
currentURL = window.location.hash.replace("#","").split("/"); 
let $carousel;
let isFlickity = false;
route(currentURL)


window.addEventListener("hashchange", function(e) {
  console.log(e)
})


$("#menu-filter").click(function(){
  $("body").removeClass("about-active")

  if ($("body").hasClass("filter-active")) {
    
    $("body").removeClass("filter-active")
    window.location.hash = ""
  } else {
    //resetToHome();
    $("body").addClass("filter-active")
    window.location.hash = "filters"
  }
  
})

$("#menu-about").click(function(){
  $("body").removeClass("filter-active")

  if ($("body").hasClass("about-active")) {
    //resetToHome();
    $("body").removeClass("about-active")
    window.location.hash = ""
  } else {
    //resetToHome();
    $("body").addClass("about-active")
    window.location.hash = "about"
  }
  
})

const phrases = [
"You're on mute!",
"Can you see my screen?",
"How are you holding up?",
"In these unprecedented times...",
"Quick check-in up top",
"Is it moving on your screen? Because we're not seeing anything",
"I think they dropped",
"You cut out for a second",
"Oh, you go ahead",
"Is there supposed to be audio?",
"Internet's bad, turning off video",
"Someone's feeding back",
"Do you think you could use headphones?",
"Can I get a show of hands?",
"Is your hand still up?",
"I can't share my screen",
"Do you have co-host permissions?"
]

i = 0;

i = Math.floor(Math.random() * phrases.length)

mVars = {
  
    duration:5000,
    gap:100
  
}

marquee = $('.marquee')
  .text(phrases[i])
  .bind('finished', function(){
		//Change text to something else after first loop finishes
		marqueeRestart(mVars)

		
	})
	.marquee(mVars);




  function marqueeRestart(mVars) {
    i = Math.floor(Math.random() * phrases.length)
    marquee
      .marquee('destroy')
      .html(phrases[i])
      .marquee(mVars)
      .bind('finished', function(){
        //Change text to something else after first loop finishes
        marqueeRestart(mVars)
    
        
      })
  }
//   .bind('finished', function(){
//     console.log("fff")
//   })
  
//   .marquee({
// 	//duration in milliseconds of the marquee
// 	duration: 5000,
// 	//gap in pixels between the tickers
// 	gap: 500,
// 	//time in milliseconds before the marquee will start animating
// 	delayBeforeStart: 0,
// 	//'left' or 'right'
// 	direction: 'left',
// 	//true or false - should the marquee be duplicated to show an effect of continues flow
// 	duplicated: true
// })


// //random hover
// let hoverStudents = setInterval(function(){
//   $(".student.active").removeClass("active")
//     r = Math.floor(Math.random()*$(".student").length)

//     setTimeout(function(){
//     $('.student').eq(r).addClass("active");
//     },500)
// },2000);


// $(document).on("mouseover", ".student", function(){
//   clearInterval(hoverStudents)
// })
// $(document).on("mouseout", ".student", function(){
//   //random hover
// hoverStudents = setInterval(function(){
//   $(".student.active").removeClass("active")
//     r = Math.floor(Math.random()*$(".student").length)

//     setTimeout(function(){
//     $('.student').eq(r).addClass("active");
//     },500)
// },2000);
// })

// fetch('https://2021.ocadu.gd/feed/tags')
// .then(response => response.json())
//   .then(p => {
//     for (k=0;k<p.length;k++) {
//       /* html */
//       $("#tags-filter").append(`<li class="tag-filter" data-link='t_${p[k].tid[0].value}'>${p[k].name[0].value}</li>`);      
//     }
    
//   });


var url="https://2021.ocadu.gd/feed/json/";

fetch(url)
.then(response => response.json())
  .then(p => {
    //console.log(p.length)
    shuffle(p)
      for (i=0;i<p.length;i++) {
        
        /* html */
        $("#students-filter").append(`
          <li class="student-filter s ${p[i].field_additional_} ${p[i].field_tags}" data-link="${p[i].nid}"><div class='initials'>${intialize(p[i].field_last_name)}</div> ${p[i].field_last_name}</li>
        `)
        
        /* html */
        $("#students").append(`
          <div class='student s ${p[i].field_additional_} ${p[i].field_tags}' id='student-${p[i].nid}'>
            <div class='initials'>${intialize(p[i].field_last_name)}</div>
            <div class='profile-img' style='background-image:url(https://2021.ocadu.gd${p[i].field_profile_image})'></div>
            <div class='thumb-img' style='background-image:url(https://2021.ocadu.gd${p[i].field_thumbnail_image})'></div>
            <div class='profile-name'>${p[i].field_last_name}</div>
          </div>`)

         
      }
      shuffle();
    
  });


  //### FILTERS

  //TAGS
  $(document).on("click","#filters .tag-filter",function(){
    //resetToHome();
    filter = "."+$(this).data("link");
    
      $(".tag-filter").removeClass("active");
    $(this).addClass("active");
    $(filter).show(200);
    if (!$('#students').hasClass("selected")) {
      
      $(".student").not(filter).hide(200);        

    }
    
    $(".student-filter").not(filter).hide(200);        
    
  })

  //STUDENTS
  $(document).on("click",".student-filter",function(){
    resetToHome();
    // $("body").addClass("one-student")
    filter = "#student-"+$(this).data("link");
    $(filter).click();
  })

  $("h1").click(function(){
    resetToHome();
  })



$(document).on("click",".student", function(){
  resetToHome();
  $(".student").show(200)
  nid = $(this).attr("id").replace("student-","");

  
  $("#site-title").delay(200).removeClass("active");

  $("#student").fadeOut(200).delay(200).remove();

  $carousel = $("#students")
    .addClass("selected")
    .flickity({
      // options
      cellAlign: 'left',
      wrapAround:true,
      contain: true,
      pageDots: false
    });

    isFlickity = true;

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
    
      instructor = "";
      
      if ((p[0].field_workshop_ != "Did not take Workshop") && (p[0].field_workshop_ != "")) {
        instructor = `<p><label>workshop instructor:</label> ${p[0].field_workshop_}</p>`
      }

      tags = "";
      if (p[0].field_tags != "") {
        for (l=0;l<p[0].field_tags.split(", ").length;l++) {
          /* html */
          tags+=`
          <li class="tag-filter" data-link="${p[0].field_tags_1.split(", ")[l]}">${p[0].field_tags.split(", ")[l]}</li>          
          `
        }
      }
      console.log(p[0].field_additional__1)
      if (p[0].field_additional_ != undefined) {
        for (l=0;l<p[0].field_additional_.split(", ").length;l++) {
          /* html */
          tags+=`
          <li class="tag-filter" data-link="${p[0].field_additional__1.split(", ")[l]}">${p[0].field_additional_.split(", ")[l]}</li>          
          `
        }
      }
      
      portfolioURI = p[0].field_portfolio_site_link;
      portfolioLabel = p[0].field_portfolio_site_link
          .replace("http://www.","")
          .replace("https://www.","")
          .replace("http://","")
          .replace("https://","");
      $("<div id='student'></div>")
      /* html */  
      .append(`
        <div class="student--left">
          <h2 class='student-name'>${p[0].title}</h2>
          
          <div class='gallery'>
            ${vidz}
            ${p[0].field_project_images.replaceAll("\/sites","https:\/\/2021.ocadu.gd\/sites")}
          </div>
          <p>${p[0].body}</p>
          <p>${p[0].field_project_description}</p>
          
          <p>${tags.replace('<li class=\"tag-filter\" data-link=\"\"></li>','')}</p>
          ${instructor}
          
          
        </div>
        <div class="student--right">
        <div class='stick'>
          <h2>${p[0].field_given_names}<br />${p[0].field_last_name}</h2>
          <p>${p[0].field_profile_image.replace("\/sites","https:\/\/2021.ocadu.gd\/sites")}</p>
          <p>${p[0].field_short_biography}</p>
          <p><a href="mailto:${p[0].field_email}">${p[0].field_email}</a></p>
          <p><a href="${portfolioURI}" target="_blank">${portfolioLabel}</a></p>
          <div class='social-links'>
            <div class='social-link'>${p[0].field_instagram_link}</div>
            <div class='social-link'>${p[0].field_linked_in_link}</div>
            <div class='social-link'>${p[0].field_behance_link}</div>
            </div>
          </div>
          
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
    } else if (currentURL[0] == "about") {
      setTimeout(function(){
        $("#menu-about").click()
      },500)
    } else if (currentURL[0] == "filters") {
      setTimeout(function(){
        $("#menu-filter").click()
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


    function resetToHome() {
      if (isFlickity==true) { $carousel.flickity('destroy')};
      $("title").text("Virtual by Necessity | OCADU Graphic Design 2021 Graduates")
      //shuffle();
      $("body").removeClass("filter-active about-active")
      $("#filters, #about").removeClass("active");
      $("#tags-filter option[value=all]").attr('selected', 'selected');
      $("#students-filter option[value=all]").attr('selected', 'selected');
      $(".student").show(200)
      $("#site-title").addClass("active");
      $("#student").fadeOut(200).delay(300).remove();
      $("#students").delay(300).removeClass("selected");
      window.location.hash = ""
    }