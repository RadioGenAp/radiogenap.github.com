/*-----------------------------------------------------------------------------------
/*
/* Main JS - Updated Version
/*
-----------------------------------------------------------------------------------*/  

(function($) {

   /*---------------------------------------------------- */
   /* Preloader
   ------------------------------------------------------ */ 
   $(window).on('load', function() {
      $("#loader").fadeOut("slow", function(){
         $("#preloader").delay(300).fadeOut("slow");
      });     
   });

   /*---------------------------------------------------- */
   /* Final Countdown Settings
   ------------------------------------------------------ */
   var finalDate = '2017/01/01';
   $('div#counter').countdown(finalDate)
      .on('update.countdown', function(event) {
         $(this).html(event.strftime('<span>%D <em>days</em></span>' + 
                                      '<span>%H <em>hours</em></span>' + 
                                      '<span>%M <em>minutes</em></span>' +
                                      '<span>%S <em>seconds</em></span>'));
      });

   /*----------------------------------------------------*/
   /* Placeholder Plugin Settings
   ------------------------------------------------------ */   
   $('input').placeholder();

   /*----------------------------------------------------- */
   /* Modals
   ------------------------------------------------------- */   
   $('.modal-toggles ul').on('click', 'a', function(e) {
      var main = $('main, footer'),
          modal = $($(this).attr('href')),
          modClose = modal.find('#modal-close');          

      main.fadeOut(500, function(){
         $('html,body').scrollTop(0);
         modal.addClass('is-visible');
      });  

      e.preventDefault();

      // MediaSession API for controlling audio metadata and playback
      function mediaSession(data) {
         const { title, artist, album, art } = data;
         if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
               title,
               artist,
               album,
               artwork: [{ src: art, sizes: '512x512', type: 'image/png' }]
            });

            navigator.mediaSession.setActionHandler('play', play);
            navigator.mediaSession.setActionHandler('pause', pause);
         }
      }

      // Autoplay feature
      function play() {
         // Implement your logic to play audio here
         console.log('Playing audio...');
         // Actual audio play logic (e.g. audioElement.play();)
      }

      function pause() {
         // Implement your logic to pause audio here
         console.log('Pausing audio...');
         // Actual audio pause logic (e.g. audioElement.pause();)
      }

      // Close modal functionality for modern browsers
      modClose.on('click', function(evt) {
         $('html,body').scrollTop(0); 
         modal.removeClass('is-visible');
         setTimeout(function() {      
            main.fadeIn(500); 
         }, 500);       
         evt.preventDefault();
      });
   });

   /*---------------------------------------------------- */
   /* Owl Carousel
   ------------------------------------------------------ */ 
   $("#owl-slider").owlCarousel({
      navigation: false,
      pagination: true,
      items: 4,
      navigationText: false
   });

   /*----------------------------------------------------*/
   /* FitText Settings
   ------------------------------------------------------ */
   setTimeout(function() {
      $('main h1, #mod-about h1').fitText(1.1, { minFontSize: '28px', maxFontSize: '38px' });
   }, 100);

   /*---------------------------------------------------- */
   /* ajaxchimp
   ------------------------------------------------------ */
   var mailChimpURL = 'http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e65110b38d';
   $('#mc-form').ajaxChimp({
      language: 'es',
      url: mailChimpURL
   });

   $.ajaxChimp.translations.es = {
      'submit': 'Submitting...',
      0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
      1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
      2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
   };

   /*---------------------------------------------------- */
   /* Map
   ------------------------------------------------------ */
   var latitude = 14.549072,
      longitude = 121.046958,
      map_zoom = 15,       
      main_color = '#d8ac00',
      saturation_value= -30,
      brightness_value= 5,
      winWidth = $(window).width();        

   var marker_url = winWidth > 480 ? 'images/icon-location-b.png' : 'images/icon-location.png';

   var style = [ /* Map style settings */ ];

   var map_options = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 15,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      styles: style
   };

   var map = new google.maps.Map(document.getElementById('map-container'), map_options);
   var marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      map: map,
      visible: true,
      icon: marker_url
   });

   function CustomZoomControl(controlDiv, map) {
      var controlUIzoomIn = document.getElementById('map-zoom-in'),
          controlUIzoomOut = document.getElementById('map-zoom-out');
      controlDiv.appendChild(controlUIzoomIn);
      controlDiv.appendChild(controlUIzoomOut);

      google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
         map.setZoom(map.getZoom() + 1);
      });
      google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
         map.setZoom(map.getZoom() - 1);
      });
   }

   var zoomControlDiv = document.createElement('div');
   var zoomControl = new CustomZoomControl(zoomControlDiv, map);
   map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomControlDiv);

   /*---------------------------------------------------- */
   /* Handle page visibility for background audio
   ------------------------------------------------------ */
   document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
         console.log('Página en segundo plano, posible pausa.');
         // Optional: pause or take actions if needed
      } else {
         console.log('Página visible de nuevo.');
         // Optional: resume or adjust audio playback
      }
   });

})(jQuery);
