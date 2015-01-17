(function () {
  'use strict';

  changePositioning();
  var querySelector = document.querySelector.bind(document);

  // grab an element
  // var header = querySelector("header");
  // // construct an instance of Headroom, passing the element
  // var headroom  = new Headroom(header);
  // // initialise
  // // headroom.init();

  var navdrawerContainer = querySelector('.navdrawer-container');
  var body = document.body;
  var about = querySelector('#about');
  var appbarElement = querySelector('.app-bar');
  var menuBtn = querySelector('.menu');
  var main = querySelector('main');
  var mobile;

  // Initial page load causes scroll event to fire despite not receiving user input
  // After first "detection", counter increases to one
  var count = 0;

  function closeMenu() {
      about.classList.remove('open');
      main.classList.remove('open');
      navdrawerContainer.classList.remove('open');
  }

  function toggleMenu() {
    about.classList.toggle('open');
    main.classList.toggle('open');
    if( navdrawerContainer.classList.contains('open') )
      navdrawerContainer.classList.remove('open');
    else
      navdrawerContainer.classList.add('open');
  }

  // For when the user is on a mobile device or resizes their screen
  function changePositioning() {
    if( window.innerWidth > 990 )
      mobile = false;
    else
      mobile = true;

    if( window.innerHeight < 688 && window.innerWidth < 600 ) {
      document.querySelector('#about').classList.add('relative-position');
      document.querySelector('main').classList.add('remove-top-position');
    } else {
      document.querySelector('#about').classList.remove('relative-position');
      document.querySelector('main').classList.remove('remove-top-position');
    }

    if( window.innerWidth < 400 ) {
      var iconList = document.querySelectorAll('#profile-icons ul li a');
      document.querySelector('nav').appendChild(document.querySelector('#profile-icons'));
      for( var i = iconList.length; i--; ) {
        iconList[i].classList.add('profile-icon-adjust');
        iconList[i].parentNode.classList.add('profile-icon-adjust');
      }
    } else {
      var iconList = document.querySelectorAll('#profile-icons ul li a');
      document.querySelector('header > div').appendChild(document.querySelector('#profile-icons'));
      for( var i = iconList.length; i--; ) {
        iconList[i].classList.remove('profile-icon-adjust');
        iconList[i].parentNode.classList.remove('profile-icon-adjust');
      }
    }
  }

  window.addEventListener('resize', function() {
    changePositioning();
  }, true);
  window.addEventListener('scroll', function() {
    count++;
    if( count > 1 && !mobile && body.scrollTop > 477 )
      console.log("SHRINK!");
  }, true);

  main.addEventListener('click', closeMenu);
  about.addEventListener('click', closeMenu);
  menuBtn.addEventListener('click', toggleMenu);

  navdrawerContainer.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
      closeMenu();
    }
  });
})();
