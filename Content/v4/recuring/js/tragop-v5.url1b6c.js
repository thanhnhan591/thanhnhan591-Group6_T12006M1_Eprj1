(function ($) {
    $(document).ready(function () {
        function urlParam(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results != null)
                return results[1] || 0;
        }

        //Change tab & url
        var tabParam = "tab";
        function ChangeUrl(title, url) {
            if (typeof (history.pushState) != "undefined") {
                var obj = { Title: title, Url: url };
                history.pushState(obj, obj.Title, obj.Url);
            } else {
                console.log("Browser does not support HTML5.");
            }
        }

        $(".tg-lbar a[role=tab][data-param=" + urlParam(tabParam) + "]").trigger('click');

        $(document).on('click', '.tg-lbar a[role=tab]', function () {
            var param = $(this).data("param");
            if (param != null && param != "") {
                //insertParam(tabParam, param);
                //ChangeUrl(document.title, "?tab=" + param);
            }
        });

        $(document).on('click', '.tf-sec3 .backSelectPacket a', function () {
            $('.tf-sec3').hide();
            $('.tf-sec1').show();
            return false;
        });
        //end tab & url
    });
}) (window.jQuery);