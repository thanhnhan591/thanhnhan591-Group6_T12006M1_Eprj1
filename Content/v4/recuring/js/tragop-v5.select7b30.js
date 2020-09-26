(function ($) {
    $(document).ready(function () {
        //Select Mon
        $(document).on("change", "input[name=rboSelMon]", function (e) {
            if (this.checked) {
                var selMon = this.value;
                $('.iselmon li.c-dropdown__item[data-dropdown-value=' + selMon + ']').click();
                $('.js-dropdown').removeClass('is-open');
            }

            var resal = getOptionCreditRecuringsuggestionsDetais();
        });
        //end select mon
        //Select Tiền trả trước
        $(document).on('click.ui.dropdown', '.js-dropdown', function (e) {
            e.preventDefault();
            $(this).toggleClass('is-open');
        });
        $(document).on('click.ui.dropdown', '.js-dropdown [data-dropdown-value]', function (e) {
            e.preventDefault();
            var $item = $(this);
            var $dropdown = $item.parents('.js-dropdown');

            $dropdown.find('.js-dropdown__input').val($item.data('dropdown-value'));
            $dropdown.find('.js-dropdown__current').text($item.text());

            var resal = getOptionCreditRecuringsuggestionsDetais();
        });
        $(document).on('click.ui.dropdown', function (e) {
            var $target = $(e.target);
            if (!$target.parents().hasClass('js-dropdown')) {
                $('.js-dropdown').removeClass('is-open');
            }
        });
        $('.c-dropdown__item').click(function () {
            var $dropdown = $(this).parents('.js-dropdown');
            $dropdown.find('.c-dropdown__item').removeClass('active');
            $(this).addClass('active');
        });

        function getOptionCreditRecuringsuggestionsDetais() {
            $('.loadingselmon').fadeIn("fast");

            var url = "/Ajax/Installment/GetOptionCreditRecuringsuggestionsDetaisV2";
            var prepay = $('.iselpri li.active').data("dropdown-value");
            var month = $('[name=rboSelMon]:checked')[0].value;
            var variantId = $('#hidden-val').attr('data-variant');
        
            $.ajax({
                url: url,
                type: 'POST',
                //async: false,
                data: {
                    variantId: variantId,
                    prepay: prepay,
                    termID: month,
					v: 3
                },
                success: function (data) {
                    if (data !== undefined && variantId !== '') {
                        var divSeldata = $('#tgudselect');
                        divSeldata.find('ul[data-credit]').remove();
                        divSeldata.append(data);
                    } else {
                        console.log("error");
                    }
                    $('.loadingselmon').fadeOut("slow");
                    return false;
                },
                error: function (e) {
                    $('.loadingselmon').fadeOut("slow");
                    return false;
                }
            });
        }
        //end
    });
})(window.jQuery);