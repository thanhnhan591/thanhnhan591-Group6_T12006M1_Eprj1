var Util = function (element) {
    this.element = element;
};
Object.defineProperty(Element.prototype, "util", {
    get: function () {
        Object.defineProperty(this, "util", {
            value: new Util(this)
        });
        return this.util;
    },
    configurable: true,
    writeable: false
});
Util.prototype.show = function () {
    this.element.style.display = "block";
};
Util.prototype.hide = function () {
    this.element.style.display = "none";
};
(function () {
    var utilModule = function ($) {
        function f_IsFriend() {
            return parseInt(f_URLPara("ffriend") || 0);
        }
        function f_URLPara(a_Name) {
            var url = new URL(window.location.href);
            return url.searchParams.get(a_Name);
        }
        return {
            f_IsFriend: f_IsFriend,
            f_URLPara: f_URLPara
        }
    };

    typeof define == "function" && window.mtpsAmd ? define("rating", ["jquery"], function ($) {
        return utilModule($)
    }) : (window.epx = window.epx || {}, window.epx.Util = utilModule($));
})();