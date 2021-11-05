$(function () {

	$(".provider_play").click(function() {
		$(".modal2").addClass("show");
	})
	$(function() {
		$(".modal2_overlay").click(function() {
			$(".modal2").removeClass("show");
		})
	});


	$("a").click(function(){
		var scrollValue = $("html, body").scrollTop();
		var elem = $(this).attr("href");
		var dist = $(elem).offset().top;
		if( scrollValue == 0){
			dist -= 180;
		} else {
			dist -= 90;
		}

		$("html, body").animate({"scrollTop": dist}, 1000);
		return false;
	});

	$(".search_field").click(function (){
	});


	// grab the initial top offset of the navigation 
	   	var stickyNavTop = $('.header_menu').offset().top;
   	
	   	// our function that decides weather the navigation bar should have "fixed" css position or not.
	   	var stickyNav = function(){
		    var scrollTop = $(window).scrollTop(); // our current vertical position from the top
		         
		    // if we've scrolled more than the navigation, change its position to fixed to stick to top,
		    // otherwise change it back to relative
		    if (scrollTop > stickyNavTop) { 
		        $('.header_menu').addClass('sticky');
		    } else {
		        $('.header_menu').removeClass('sticky'); 
		    }
		};

		stickyNav();
		// and run it again every time you scroll
		$(window).scroll(function() {
			stickyNav();
		});



	function selectFunc(){
		$(".awesome_services select").addClass("worldwide_sel_bg");
		$(".awesome_services select").removeClass("worldwide_sel_unactive_bg");	
	}
	$(".awesome_services select").on("click", function(){
		if($(".awesome_services select").hasClass("worldwide_sel_unactive_bg")){
			selectFunc();
		} else {
			$(this).addClass("worldwide_sel_unactive_bg");
			$(this).removeClass("worldwide_sel_bg");
		}
		event.stopPropagation(); //Убираем вызовы обработок родительских элементов
		$("body, html, a, button").click(function(){
			selectFunc();
		});
	});


	// $(".form_label2").click(function() {
	// 	$(".logistics_form").removeClass("del");
	// 	$(".express_form").addClass("del");
	// })                                     //вариант переключения вкладок "в лоб"
	// $(".form_label1").click(function() {
	// 	$(".express_form").removeClass("del");
	// 	$(".logistics_form").addClass("del");
	// })

	$(".block_form label").click(function(){
		$(".form-tab").removeClass("del");
		var tab = $(this).attr("title");              // универсальный вариант переключения вкладок
		$(".form-tab").not("#"+tab).addClass("del");
	});


	// $(function (){
// 	if($(window).width() <= '992') {
// 		$(".search_field").removeClass("del");
// 		$(".right_s_f").addClass("del");
// 	} else {
// 		$(".search_field").removeClass("del");
// 		$(".center_s_f").addClass("del");
// 	}
// })

	$(".simply_button").click(function(){
	if (!$(".hidden_p").hasClass('del')) {
    	$(".hidden_p").addClass('del');
    	$(".simply_button").text("LEARN MORE");
	} else {
    	$(".hidden_p").removeClass('del');
    	$(".simply_button").text("HIDE");
	}
	});
})


