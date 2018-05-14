function create_rating(e){
  var url;
  adfreescore = get_starrate(document.getElementById("adfree_starrate"));
  contentscore = get_starrate(document.getElementById("content_starrate"));
  comment = document.getElementById("Comment").value;
  base_url = "http://localhost:8000/api/rating"
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(e){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        consol.log("Success")
      }else if(xhr.status == 400){
        window.alert("Error: Please return your valid rating");
      }
    }
  };

  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
    url = tabs[0].url;
    xhr.open("POST", base_url, true); // FIXME localhost
    xhr.setRequestHeader("Content-type", "application/json");
    json_rating = JSON.stringify({
      adfreescore: adfreescore,
      contentscore: contentscore,
      comment: comment,
      url: url
    });
    xhr.send(json_rating);
  });
  //window.close();
<<<<<<< HEAD
 }
=======
}
>>>>>>> 410bc1d815ce83ebd4f2fef0ef51566ec66d7829

function get_starrate(star_class){
  var obj = star_class.getElementsByTagName("input");
  var checked_value = '';
  for (i = 0 ; i < obj.length ; i++){
    if(obj[i].checked == true){
      checked_value = obj[i].value;
    }
  }
  return checked_value
}

function sign_up(e) {
  chrome.tabs.create({
    url: "http://localhost:4200/welcome"
  });
}

function sign_in(e) {
  chrome.tabs.create({
    url: "http://localhost:4200/welcome"
  });
}

function duplicate_current_tab(e) {
  chrome.tabs.query({
    'active': true,
    'windowId': chrome.windows.WINDOW_ID_CURRENT
  }, function(tabs) {
    url = tabs[0].url;
    chrome.tabs.create({
      url: url
    });
  })
}

function get_post_score(){
  var url;
  chrome.tabs.query({
    'active': true,
    'windowId': chrome.windows.WINDOW_ID_CURRENT
  }, function(tabs) {
    url = tabs[0].url;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/api/score/" + url, false);
    var scores;
    xhr.onload = function() {
      if (xhr.readyState == 4 && xhr.status == "200") {
        scores = JSON.parse(xhr.responseText);
      } else if (xhr.status == "404") {
        //window.alert("No one evaluate this post yet. Please be the first one!");
      } else {
        window.alert("Error: fail to get score of this post")
      }
    }
    xhr.send();
    document.getElementById("post_adfreescore").innerHTML = scores['adfreescore'];
    document.getElementById("post_contentscore").innerHTML = scores['contentscore'];
    document.getElementById("numadfreerating").innerHTML = scores['numadfreerating'];
    document.getElementById("numcontentrating").innerHTML = scores['numcontentrating'];

  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("SubmitButton").addEventListener('click', create_rating);
  document.getElementById("sign_up").addEventListener('click', sign_up);
<<<<<<< HEAD
  document.getElementById("duplicate_current_tab").addEventListener('click', duplicate_current_tab);
  document.getElementById("SubmitButton").addEventListener('click', create_rating);
=======
  document.getElementById("sign_in").addEventListener('click', sign_in);
  document.getElementById("rate1").addEventListener('click', duplicate_current_tab);
>>>>>>> 410bc1d815ce83ebd4f2fef0ef51566ec66d7829
  get_post_score()
});
