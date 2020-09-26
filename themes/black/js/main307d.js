(function($){
	 "use strict";
	$(document).ready(function(){
		 $("#nav-mobile").mmenu();
		$('.owl-slideshow').owlCarousel({			
			singleItem: true,
			autoPlay: 8000,
			pagination: true			
		});
		$('.owl-top-collection').owlCarousel({			
			items: 4,
			itemsDesktop: [1199,3],
			itemsDesktopSmall: [991,2],
			itemsTablet: [767,1],
			itemsTabletSmall: false,
			itemsMobile: [479,1],
			autoPlay: 8000,
			pagination: false,
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']			
		});
		$('.owl-mid-collection').owlCarousel({			
			items: 4,
			itemsDesktop: [1199,3],
			itemsDesktopSmall: [991,2],
			itemsTablet: [767,1],
			itemsTabletSmall: false,
			itemsMobile: [479,1],
			autoPlay: 8000,
			pagination: false,
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']			
		});
		$('.owl-testimonial').owlCarousel({	
			items: 2,
			itemsDesktop: [1199,1],
			itemsDesktopSmall: [991,1],
			itemsTablet: [767,1],
			itemsTabletSmall: false,
			itemsMobile: [479,1],
			autoPlay: 8000,
			pagination: true,
			navigation: false
		});
		$('.owl-brands').owlCarousel({	
			items: 6,
			itemsDesktop: [1199,5],
			itemsDesktopSmall: [991,4],
			itemsTablet: [767,3],
			itemsTabletSmall: false,
			itemsMobile: [479,2],
			autoPlay: 8000,
			pagination: false,
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
		});
		$('.owl-related').owlCarousel({			
			items: 4,
			itemsDesktop: [1199,3],
			itemsDesktopSmall: [991,2],
			itemsTablet: [767,2],
			itemsTabletSmall: false,
			itemsMobile: [479,1],
			autoPlay: 8000,
			pagination: false,
			navigation: true,
			navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']			
		});
		
		$('.product-tabs').find('.head-tabs').on('click', function(){
	      if(!$(this).hasClass('active')) {
	         $('.product-tabs .head-tabs').removeClass('active');
	         var $src_tab = $(this).attr('data-src');
	         $($src_tab).addClass('active');
	         $('.tab-container').children('.content-tabs').hide();
	         var $selected_tab = $(this).attr("href");
	         $($selected_tab).show();
	      }
	      return false;    
	 	});
		
	});
	
})(jQuery)