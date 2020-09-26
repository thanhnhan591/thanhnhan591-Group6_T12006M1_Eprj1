(function($){
    $(document).ready(function () { 
        $(".tg-tabul li a").click(function (e) {
            debugger
            e.preventDefault();
            $('.p-tab1').css('display', 'none');
            var tab_id = $(this).attr('data-id');
            if (tab_id=="tab1") {
                $('.p-tab1').css('display', 'block');
            }
            $('.tab-pane').removeClass('active');
            $('.p-' + tab_id).addClass('active');
            //$(this).tab('show');
            $(".tg-tab-scroll").mCustomScrollbar("destroy");
            $(".tg-tab-scroll").mCustomScrollbar();
            $(".tg-tabul li").removeClass('active');
            $(this).parent().addClass('active');

           
            $('.tg-maintab-i').slideUp();
            $('.tg-maintab-i[data-id="' + tab_id + '"]').slideDown();
            if ($(window).width() < 768) {
                $('html, body').animate({ scrollTop: $(".tg-maintab").offset().top - 50 }, 1000);
            }

        });
        $(".trg-proimg").click(function () { 
            $('html, body').animate({ scrollTop: $(".tg-udthe").offset().top + 30 }, 1000);
        });
         
    });
})(window.jQuery);