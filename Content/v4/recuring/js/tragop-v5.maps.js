(function ($) {
    $(document).ready(function () {
        //map  
        $(document).on("click", ".maps_icon", function () {
            var _this = $(this);
            $("#maps").modal("show");
            $("#titlechoseshop").text("FPT Shop " + _this.attr("data-address"));

            $('#maps').on('shown.bs.modal', function () {
                var lat = _this.attr('data-xvalue');
                var long = _this.attr('data-yvalue');
                initMap(parseFloat(lat), parseFloat(long));
            });
        });
        var map, bounds;
        function initMap(lat, long) {
            var map = new google.maps.Map(
                document.getElementById("map_canvas"), {
                    center: new google.maps.LatLng(lat, long),
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

            bounds = new google.maps.LatLngBounds();

            //var long = $(lov).attr('data-yvalue');
            //var lat = $(lav).attr('data-xvalue'); 
            var latlng = new google.maps.LatLng(lat, long);

            bounds.extend(latlng);
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: name,
                icon: 'http://fptshop.com.vn/Content/v3/images/icons/pin-maps_03.png'
            });
        }
        google.maps.event.addDomListener(window, 'load', initMap);
        //end map
    });
})(window.jQuery);