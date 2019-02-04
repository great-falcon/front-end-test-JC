// menuToggle

var navToggle = document.getElementById("navToggle");
var overlay = document.querySelector(".overlay");
var body = document.getElementsByTagName('body')[0];
var navActiveLinks = document.querySelectorAll(".overlayMenu a");

navToggle.addEventListener('click', toggleBurger);

function toggleBurger(){
	navToggle.classList.toggle("burgerActive");
	overlay.classList.toggle("open");
  body.classList.toggle("locked");
  if(navToggle.classList.contains("burgerActive")){
    for(var i=0; i<navActiveLinks.length; i++){
      navActiveLinks[i].addEventListener('click', toggleBurger);
    }
  }
};

//sticky header


var STICKY = 1;
var header = document.querySelector("header");
var headerHeight = header.offsetHeight;

var sections = document.getElementsByTagName("section");

document.addEventListener("scroll", function(e) {
  e.preventDefault();
  var scrollTop =
    document.documentElement.scrollTop || document.scrollingElement.scrollTop;
  if (scrollTop > STICKY) {
    header.classList.add("sticky");

    for (let i = 0; i < sections.length; i++) {
      const element = sections[i];
      if (scrollTop >= element.offsetTop-headerHeight) {
        var active = document.querySelector("nav .active");
        active.classList.remove("active");
        active = document.querySelector('nav [href*="#' + element.id + '"]');
        active.classList.add("active");
      }
    }

    
  } else {
    header.classList.remove("sticky");
  }
});


// scroll animation


var anchors = document.querySelectorAll('[href*="#"]');

for (var i = 0; i < anchors.length; i++) {
  anchors[i].onclick = function() {
    var anchorId = this.getAttribute("href").slice(1);
    if (anchorId) {
      return smoothScroll(anchorId);
    }
  };
}

document.addEventListener('click', function(event){
	if(event.target.classList.contains('scroll')){
    event.preventDefault();
    var id = event.target.getAttribute('href').substr(1);
		smoothScroll(id);
	}
});


function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(eID) {
  var elm = document.getElementById(eID);
  var y = elm.offsetTop - headerHeight;
  var node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

function smoothScroll(eID) {
  var startY = currentYPosition();
  var stopY = elmYPosition(eID);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (var i = startY; i > stopY; i -= step) {
    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
}