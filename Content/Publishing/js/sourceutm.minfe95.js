var fhistory = (function () {
    function fa() {
        if (typeof $.cookie('log_6dd5cf4a-73f7-4a79-b6d6-b686d28583fc') == 'undefined') {
            createCookie("log_6dd5cf4a-73f7-4a79-b6d6-b686d28583fc", generateUUID(), 365);
        }


    }

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    return {
        fa: fa
    };
})();
fhistory.fa();


if (window.location.href.indexOf("masoffer") > 0) {
    if (getQueryParams("utm_source") != null) {
	utm_eraseCookie("srf_b686d28583fc");
        utm_createCookie("srf_b686d28583fc", getQueryParams("utm_source") + "/#" + getQueryParams("traffic_id"), 30);
    }

} else if (window.location.href.indexOf("accesstrade") > 0) {
    if (getQueryParams("utm_source") != null) {
	utm_eraseCookie("srf_b686d28583fc");
        utm_createCookie("srf_b686d28583fc", getQueryParams("utm_source") + "/#" + getQueryParams("aff_sid"), 30);
    }
} else if (window.location.href.toLowerCase().indexOf("involveasia") > 0) {
    if (getQueryParams("utm_source") != null) {
	utm_eraseCookie("srf_b686d28583fc");
        utm_createCookie("srf_b686d28583fc", getQueryParams("utm_source") + "/#" + getQueryParams("session_id"), 30);
    }
} else if (window.location.href.indexOf("adpia") > 0) {
    if (getQueryParams("utm_source") != null) {
	utm_eraseCookie("srf_b686d28583fc");
        utm_createCookie("srf_b686d28583fc", getQueryParams("utm_source") + "/#" + getQueryParams("utm_param"), 30);
    }
} else if (window.location.href.indexOf("affiliator") > 0) {
    if (getQueryParams("utm_source") != null) {
	utm_eraseCookie("srf_b686d28583fc");
        utm_createCookie("srf_b686d28583fc", getQueryParams("affiliator") + "/#123", 30);
    }
}else if (window.location.href.indexOf("ecomobi") > 0) {
    if (getQueryParams("utm_source") != null) {
	utm_eraseCookie("srf_b686d28583fc");
        utm_createCookie("srf_b686d28583fc", getQueryParams("utm_source") + "/#" + getQueryParams("aff_click_id") + "/#" + getQueryParams("aff_pub_id"), 30);
    }
}else if (window.location.href.indexOf("bbscode") > 0) {
    if (getQueryParams("utm_source") != null) {
	utm_eraseCookie("srf_b686d28583fc");
        utm_createCookie("srf_b686d28583fc", getQueryParams("bbscode") + "/#" + getQueryParams("bbsusercode"), 30);
    }
}else if (window.location.href.indexOf("_idt") > 0) {
    if (getQueryParams("utm_source") != null) {
	utm_eraseCookie("srf_b686d28583fc");
        utm_createCookie("srf_b686d28583fc", getQueryParams("utm_source") + "/#" + getQueryParams("_idt"), 30);
    }
}
else if (window.location.href.indexOf("cityads") > 0) {
    if (getQueryParams("utm_source") != null) {
	utm_eraseCookie("srf_b686d28583fc");
        utm_createCookie("srf_b686d28583fc", getQueryParams("utm_source") + "/#" + getQueryParams("click_id"), 30);
    }
}else {

    var beginSRF = $.cookie('srf_b686d28583fc');
    if (getQueryParams("utm_source") != null) {

        utm_createCookie("srf_b686d28583fc", beginSRF + "/#" + getQueryParams("utm_source") + "/#" + getQueryParams("utm_campaign"), 7);
    }
    else {
        if (document.referrer != "" && document.referrer.indexOf("fptshop.com.vn") < 0) {
            utm_createCookie("srf_b686d28583fc", beginSRF + "/#" + document.referrer, 7);
        }
    }
}

function getQueryParams(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

function utm_createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
}

function utm_readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function utm_eraseCookie(name) {
    utm_createCookie(name, "", -1);
}