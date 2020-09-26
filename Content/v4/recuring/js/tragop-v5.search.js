(function ($) {
    $(document).ready(function () {
        //Search
        $(document).mouseup(function (e) {
            var container = $(".tg-seasrbox");
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.hide();
            }
        });

        $(document).on("keyup", '.searchkeyword', function (e) {
            $('.tg-seasrbox').show();

            //var brand = $('.fshop-search-cate');
            //var old = $('.fshop-search-old-product');
            var searchResul = $('.tg-seasrbox ul');
            //var discharge = $('.fshop-search-discharge');
            //var promotion = $('.fshop-search-promotion');
            //var accessories = $('.fshop-search-acces');

            if (e.which == 38 || e.which == 40) {
                var min = 0;
                var listItem = searchResul.find("li");
                var max = listItem.length;
                var current = searchResul.find("li.active").index();
                if (current >= 0) {
                    searchResul.find("li.active").removeClass("active");
                }
                switch (e.which) {
                    case 38: //up
                        if (current >= 0) {
                            listItem.eq(current - 1).addClass("active");
                        }
                        else {
                            listItem.eq(max - 1).addClass("active");
                        }
                        break;
                    case 40: //down

                        if (current >= 0) {
                            listItem.eq(current + 1).addClass("active");
                        }
                        else {
                            listItem.eq(min).addClass("active");
                        }
                        break;
                    default: return;
                }
                return false;
            }
            if (e.which == 13) {
                var current = searchResul.find("li.active a");
                var url = current.attr("href");
                if (url != null && url != '')
                    location.href = url;
            }

            e.preventDefault();
            $keyword = $(this).val();
            if ($keyword.length > 0) {
                ga('send', 'pageview', '/tim-kiem/q=' + $keyword);
            }

            if ($.trim($keyword).length > 0) {
                var result = "";
                var resultbrand = "";
                var resultold = "";
                var resultdischarge = "";
                var resultpromotion = "";
                var resultNews = "";
                //var term = $.trim(decodeURI($keyword.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, " ")));
                var term = $.trim(decodeURI($keyword.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, " ").replace("-", " ")));
                term = term.replace("điện thoại", "dien thoai");
                term = term.replace("dt", "dien thoai");
                term = term.replace("máy tính bảng", "may tinh bang");
                term = term.replace("laptop", "may tinh xach tay");
                term = term.replace("máy tính xách tay", "may tinh xach tay");
                getDatafromElasticTG(term, resultNews, resultpromotion, result, searchResul, "* AND ");
            }
            else {
                searchResul.html('');
                //brand.html('');
                //old.html('');
                //discharge.html('');
                //promotion.html('');
                //accessories.html('');
            }
        });

        function getDatafromElasticTG(strInput, resultNews, resultpromotion, result, searchResul, Condition) {
            var term = "*" + strInput + "*";
            var stringQuery = "";
            //stringQuery = stringQuery + " AND isnottrade:0"
            if (strInput.indexOf("dien thoai") >= 0 || strInput.indexOf("may tinh bang") >= 0 || strInput.indexOf("may tinh xach tay") >= 0) {
                if (strInput.indexOf("dien thoai") >= 0) {
                    term = term.replace("dien thoai", "").trim();
                    stringQuery = term.replace(/ /g, Condition) + " AND typenameascii:dien-thoai";
                }
                else if (term.indexOf("may tinh bang") >= 0) {
                    term = term.replace("may tinh bang", "").trim();
                    stringQuery = term.replace(/ /g, Condition) + " AND typenameascii:may-tinh-bang";
                }
                else {
                    term = term.replace("may tinh xach tay", "").trim();
                    stringQuery = term.replace(/ /g, Condition) + " AND typenameascii:may-tinh-xach-tay";
                }
            }
            else
                stringQuery = term.replace(/ /g, Condition);
            //stringQuery += ' AND (typenameascii:dien-thoai OR typenameascii:may-tinh-bang OR typenameascii:may-tinh-xach-tay)';

            var data = {
                "query": {
                    "query_string": {
                        "query": stringQuery,
                        "fields": [
                            "nameproduct",
                            "nameascii"
                        ]
                    }
                },
                "from": 0,
                "size": 6,
                "sort": [
                    {
                        "typenameascii.keyword": {
                            "order": "asc"
                        }
                    }
                ],
                "aggs": {}
            };
            $.ajax({
                url: 'https://search.fptshop.com.vn/api/Search',
                type: "GET",
                dataType: "JSON",
                data: {
                    key: JSON.stringify(data),
                    type: "tragop"
                },
                success: function (data) {
                    if ((data.hits.hits == '' || data.hits.hits == null) && resultNews == '' && resultpromotion == '') {
                        var href = "//fptshop.com.vn/tim-kiem/" + term + "";
                        result = "";
                    } else {

                        if (term.toLowerCase().indexOf("samsung") > 0) {
                            result += "<li><a href='//fptshop.com.vn/samsung' style='text-align: center;'><img src='/Content/Mobile/V4/images/ss-logo.png'></a></li>";
                        }

                        if (data.hits.hits != '' && data.hits.hits != null) {
                            $.each(data.hits.hits, function (i, v) {
                                var t = v._source.nameproduct.replace($keyword, "<strong>" + $keyword + "</strong>");
                                var urlpic = '<img src="' + '//fptshop.com.vn/Uploads/Thumbs/' + v._source.urlpicture + '" alt = "' + v._source.nameproduct + '" >';
                                var url = "//fptshop.com.vn" + '/' + v._source.typenameascii + '/' + v._source.nameascii + "/" + v._source.id + "/tra-gop";
                                var price = formatPrice(parseInt(v._source.price).toString()) + ' ₫';

                                result += '<li>';
                                result += '<a href="' + url + '">';
                                result += '<span>' + urlpic + '</span>';
                                result += '<div>';
                                result += '<h3>' + t + '</h3>';
                                result += '<p>' + price + '</p>';
                                result += '</div></a></li>';
                            });
                        } else {
                            result = "";
                        }
                    }
                    searchResul.html(result);
                    if (Condition == "* AND " && data.hits.hits.length == 0)
                        getDatafromElasticTG(strInput, resultNews, resultpromotion, result, searchResul, "* OR ");
                }
            });
        }
        //end search
    });
})(window.jQuery);