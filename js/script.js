var url="http://2021.ocadu.gd/feed/json/";

var allData = ["one","two","three","five","four"];

fetch(url)
.then(response => response.json())
  .then(p => {
      console.log(p)
  });


  var obj = {
    foo: 'bar'
  }
  
  //Object.freeze(obj)
  


  // Define a new component called button-counter
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})


new Vue({
  el: '#app',
  data: obj
})

new Vue({ el: '#cd' })