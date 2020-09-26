function checkAge(date, month, year, minAge) {
    var newDate = year + "-" + ("0" + month).slice(-2) + "-" + ("0" + date).slice(-2);
    //var birthday = +new Date(newDate);
    //var age = ~~((Date.now() - birthday) / (31557600000));

    var today = new Date();
    var birthDate = new Date(newDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= minAge;
}
var util = {
    config: {
        'FE': 1002,
        'ACS': 1,
        'Home': 2,
        'HDS': 1003,
        'MAF': 1004,
        //'AKulaku': 3,
        nameLocalStoreCustomerChoose: "csm_rc_cs",
        Mpost: 'tra-gop-mpos'
    },
    phoneformat: function (phone) {
        var regex = /^(098|095|097|096|090|093|091|094|092|099|086|088|089|087|039|038|037|036|035|034|033|032|070|079|077|076|078|084|081|082|083|085|052|056|058|059)[0-9]{7}$/;
        if (phone.match(regex)) {
            return true;
        } else {
            return false;
        }
    },
    getIdCredit: function (name) {
        var creditId = 0;

        if (name.indexOf('FE') !== -1) {
            creditId = util.config.FE;
        } else if (name.indexOf('ACS') !== -1) {
            creditId = util.config.ACS;
        } else if (name.indexOf('Home') !== -1) {
            creditId = util.config.Home;
        } else if (name.indexOf('HD') !== -1) {
            creditId = util.config.HDS;
        } else if (name.indexOf('Mirae') !== -1) {
            creditId = util.config.MAF;
            //} else if (name.indexOf('AKulaku') !== -1) {
            //    creditId = util.config.Akulaku;
        }
        return creditId;
    },
    convertDateToServer: function (stringDate) {
        var arr = stringDate.split('-'),
            newDate = '',
            monthConvert,
            dayConvert;

        if (Number(arr[1]) > 0 && Number(arr[1]) < 10) {
            monthConvert = "0" + Number(arr[1]);
        } else {
            monthConvert = Number(arr[1]);
        }

        if (Number(arr[0]) > 0 && Number(arr[0]) < 10) {
            dayConvert = "0" + Number(arr[0]);
        } else {
            dayConvert = Number(arr[0]);
        }
        return newDate = arr[2] + "-" + monthConvert + "-" + dayConvert;
    },
    convertDateToServer: function (day, month, year) {
        var newDate = '',
            monthConvert,
            dayConvert;

        if (Number(month) > 0 && Number(month) < 10) {
            monthConvert = "0" + Number(month);
        } else {
            monthConvert = Number(month);
        }

        if (Number(day) > 0 && Number(day) < 10) {
            dayConvert = "0" + Number(day);
        } else {
            dayConvert = Number(day);
        }
        return newDate = year + "-" + monthConvert + "-" + dayConvert;
    },
    hideArrayElement: function (arrayElement) {
        if (arrayElement.length > 0) {
            $.each(arrayElement, function (i, v) {
                $(v).hide();
            });
        }
    },
    showArrayElement: function (arrayElement) {
        if ($.isArray(arrayElement) && arrayElement.length > 0) {
            $.each(arrayElement, function (i, v) {
                $(v).show();
            });
        }
    },
    isPhone: function (phone) {
        var regex = /^(098|095|097|096|0169|0168|0167|0166|0165|0164|0163|0162|090|093|0122|0126|0128|0121|0120|091|094|0123|0124|0125|0127|0129|092|0188|0186|099|0199|086|088|089|087|039|038|037|036|035|034|033|032|070|079|077|076|078|084|081|082|083|085|056|058|059|052)[0-9]{7}$/;
        if (phone.match(regex)) {
            return true;
        } else {
            return false;
        }
    },
    isCmd: function (cmd) {
        var regex = /^[0-9]{9}$/;
        var regex1 = /^[0-9]{12}$/;

        if (cmd.match(regex)) {
            return true;
        } else {
            if (cmd.match(regex1))
                return true;
            return false;
        }
    },
    isEmail: function (email) {
        var regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/igm;

        if (email.match(regex)) {
            return true;
        } else {
            return false;
        }
    },
    isBirth: function (birthday) {
        var regex = /[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}/igm;

        if (birthday.match(regex)) {
            return true;
        } else {
            return false;
        }
    },
    isBirth: function (date, month, year, minAge = 18) {
        var newDate = date + "-" + month + "-" + year,
            regex = /[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}/igm,
            mess = {};

        if (!newDate.match(regex)) {
            return {
                error: false,
                messages: 'Vui lòng nhập đúng ngày tháng năm sinh.(ngày/tháng/năm)'
            };
        }

        if (date < 1 || date > 31) {
            return {
                error: false,
                messages: 'Ngày sinh không hợp lệ'
            };
        } else if (month < 1 || month > 12) {
            return {
                error: false,
                messages: 'Tháng sinh không hợp lệ'
            };
        } else if ((month == 4 || month == 6 || month == 9 || month == 11) && date == 31) {
            return {
                error: false,
                messages: 'Ngày sinh không hợp lệ'
            };
        } else if (month == 2) {
            var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));

            if (date > 29 || (date == 29 && !isleap)) {
                return {
                    error: false,
                    messages: 'Ngày sinh không hợp lệ'
                };
            }
        } else if (new Date(year, Number(month) - 1, date) > new Date()) {
            return {
                error: false,
                messages: 'Ngày tháng năm sinh không được lớn hơn ngày hiện tại'
            };
        } else if (!checkAge(date, month, year, minAge)) {
            return {
                error: false,
                messages: 'Bạn chưa đủ ' + minAge + ' tuổi'
            };
        } else if ((Number(new Date().getFullYear()) - Number(year)) > 100) {
            return {
                error: false,
                messages: 'Số tuổi không được quá 100 tuổi'
            };
        }

        return {
            error: true,
            messages: ''
        };
    },
    resetInput: function (arrayInput) {
        if ($.isArray(arrayInput) && arrayInput.length > 0) {
            $.each(arrayInput, function (i, v) {
                $(v).val('');
            });
        }
    },
    resetSelect: function (arraySelecttion) {
        if ($.isArray(arraySelecttion) && arraySelecttion.length > 0) {
            $.each(arraySelecttion, function (i, v) {
                $(v).find('option[value="0"]').prop('selected', true)
            });
        }
    }
};
var FullFlowInfo = {
    OrderID: 0,
    ProductName: "",
    ProductQuantity: 1,
    ProductColor: "",
    ProductPromotion: "",
    Sku: "",
    ProductID: 0,
    ProductVariant: 0,
    ListAccessori: "",
    ListPromotion: "",
    Discount: 0,
    Price: 0,
    PriceBeforeTax: 0,
    CustomerName: "",
    CustomerPhone: "",
    CustomerEmail: "",
    EmployeeCode: "",
    Company: "",
    Indentity: "",
    TotalLimit: 0,
    RemainingLimit: 0,
    ShippingMethod: 0,
    PaymentMethod: 0,
    CityID: 0,
    DistrictID: 0,
    Deliverydate: "",
    Address: "",
    ShopID: 0,
    ShopName: "",
    BankType: 0,
    BankCode: "",
    CampaingID: 0,
    SourceName: "",
    TemplateOrderID: 0,
    QuickNote: ""
};
var OrderItem = {
    sourceName: "",
    CampaignID: 0,
    TotalPriceCampaignOrder: 0,
    productVariantId: 0,
    gender: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: 0,
    district: 0,
    couponCode: "",
    accessories: "",
    talesSales: 1,
    ArrPromotioID: "",
    typePayment: "",
    refered: "",
    shopname: "",
    storeid: 0,
    sendoid: "",
    codeEmployee: null,
    NumSocial: 0,
    QuickNote: ""
};
(function ($) {
    var host = "";
    $(document).ready(function () {
        //Loaddata from cookie
        function loadDataFromcookie() {
            $("#txtName-ol").val($.cookie('_tgcusName') == null ? "" : $.cookie('_tgcusName'));
            $("#txtName").val($.cookie('_tgcusName') == null ? "" : $.cookie('_tgcusName'));

            $("#txtPhone-ol").val($.cookie('_tgcusPhone') == null ? "" : $.cookie('_tgcusPhone'));
            $("#txtPhone").val($.cookie('_tgcusPhone') == null ? "" : $.cookie('_tgcusPhone'));
        } loadDataFromcookie();
        //end Loaddata from cookie

        SetDefaultDataCookies();

        $(document).on("click", "#view-info-card", function () {
            $("#modalCardInfo").modal("show");
        });

        $(document).on('click', '.tg-bdvm-xt', function () {
            $(".tg-bdhei").addClass('tgbshow');
        });
        $(document).on('click', '.tg-bdvm-rg', function () {
            $(".tg-bdhei").removeClass('tgbshow');
        });

        $(".selsttg a").click(function (e) {
            var btnsttg = $("#btnsttg");
            $('#hidden-val').data("sttg-sttg", $(this).data("price"));
            $('#hidden-val').data("sttg-index", $(this).data("index"));
            $("#btnsttg").text($(this).text());
        });

        $(document).on('click', '#notiCard .gt-mdbtn button', function () {
            $('#loadingbtnol').show();
            $('#AddOrder').hide();
            $('#notiCard .gt-mdbtn button').hide();
            $('#notiCard .tf-seflbtns').show();

            $.cookie("_TGP", $('#hidden-val').attr('data-pro'), { path: '/', expires: 1 });
            //AddOrderOnline('');
            epx.Order.AddOrderOnline(epx.Order.f_GetTextQuickNote());
        });

        $(document).on("click", "#AddOrderRecurring", function () {
            var quickNote = "";
            $("#loadingbtn").show();
            $("#AddOrderRecurring").hide();
            var priceProduct = $('.atModalInfo').attr('data-price'),
                priceBefore = $('.atModalInfo').attr('data-pricebefore'),
                img = $('.atModalInfo').attr('data-img'),
                precentPrepay = $('.atModalInfo').attr('data-precent'),
                pricePrayPerMonth = $('.atModalInfo').attr('data-price-a-month'),
                monthPray = $('.atModalInfo').attr('data-month'),
                exhibit = $('.atModalInfo').attr('data-exhibit'), //giay to,
                credit = $('.atModalInfo').attr('data-credit'),
                urlImage = $('.atModalInfo').attr('data-img'),
                nameProduct = $('.atModalInfo').attr('data-name'),
                laisuatthuc = $('.atModalInfo').attr('data-laisuatthuc'),
                namePackage = $('.atModalInfo').attr('data-packe'),
                phiBH = $('.atModalInfo').attr('data-bh'),
                phiTH = $('.atModalInfo').attr('data-phith'),
                isInsurrance = $('.atModalInfo').attr('data-isinsurrance'),
                phoneNumberGuarantor = $('#txtPhoneNumberGuarantor').val(),
                storeId = $('.RaShop:checked').val(),
                shopName = $('.RaShop:checked').data("address"),
                userid = location.hash.substr(1),
                pricekm = $('.atModalInfo').attr('data-pricekm'),
                proid = $('.atModalInfo').attr('data-proid');
            var noteHC = "";
            if (credit == "Home Credit") {
                noteHC = "Hồ sơ ONLINE của HC cam kết trả kết quả trong tối đa 4h.Thời gian nhận cuộc gọi thẩm định sẽ từ 30' – 2h kể từ khi gửi hồ sơ . ";
            }
            if ($(".RaShop:checked").attr("data-address") != "undefined") {
                quickNote = noteHC + "Khách hàng nhận hàng tại shop " + $(".RaShop:checked").attr("data-address");
            }
            else {
                quickNote = noteHC + "Khách hàng bỏ qua bước chọn giao hàng";
            }
            // if (credit == "FE Credit"){
            // quickNote = quickNote + " .TẶNG USB 8GB KHI LÀM TG ONLINE FEC";
            // }
            if (validateFrm() === true) {
                AddOrderRecuring(precentPrepay, pricePrayPerMonth, priceBefore, monthPray, credit, exhibit, laisuatthuc, namePackage, userid, isInsurrance, phiBH, phiTH, phoneNumberGuarantor, quickNote, storeId, shopName, pricekm, proid);
            }
            else {
                $("#loadingbtn").hide();
                $("#AddOrderRecurring").show();
                //$('html, body').animate({ scrollTop: $(".wrapper").offset().top }, 1000);
                $('html, body').animate({ scrollTop: $(".tg-foifhd").offset().top - 50 }, 1000);
            }
        });

        $('#CityIDShop').on('change', function () {
            var cityId = $("#CityIDShop").val();
            var productid = $(".ProductID").val();
            var districtId = $("#DistrictIDShop").val() == "" ? "0" : $("#DistrictIDShop").val();
            var typeware = 1;
            var sku = $(".ProductID").attr("data-sku");
            loadDistrictOrder(cityId, districtId, typeware, sku, productid)
        });

        $(document).on('click', '.check-bn', function () {
            var data = $(this).attr("data-id");
            var month = parseInt($(this).attr("data-month"));
            var TienMoiThang = convertcurrency($(this).attr("data-priceone"));
            var TongTienTra = convertcurrency($(this).attr("data-price"));
            var TienChenhLech = convertcurrency($(this).attr("data-pricecl"));
            var ck = $(this).attr("data-ck");
            var text = "₫/tháng";
            var text2 = " (" + month + " Tháng)";
            var priceOld = convertcurrency((parseInt(($(this).attr("data-price").replace(/\./g, ''))) - (parseInt(($(this).attr("data-bh").replace(/\./g, ''))) * month)).toString());
            var priceOldcl = convertcurrency((parseInt(($(this).attr("data-pricecl").replace(/\./g, ''))) - (parseInt(($(this).attr("data-bh").replace(/\./g, ''))) * month)).toString());
            var priceOne = convertcurrency((parseInt(($(this).attr("data-priceone").replace(/\./g, ''))) - (parseInt(($(this).attr("data-bh").replace(/\./g, ''))))).toString());
            if (ck == "1") {
                text = "₫";
                text2 = "";
            }
            if ($(this).is(':checked')) {
                if (ck == "1") {
                    $(".tgs-" + data).attr("data-isinsurrance", 1);
                    $(".pricecls-" + data).text(TienChenhLech + '₫');
                    $(".allPrices-" + data).html("<span style=\"color: red; font-weight: bold;\">" + TongTienTra + "₫</span>");
                    $(".price-ones-" + data).text(TienMoiThang + '₫');
                    $(".tgs-" + data).attr('data-price', TongTienTra);
                    $(".tgs-" + data).attr('data-price-a-month', TienMoiThang);
                    $(".tgs-" + data).attr('data-tclgb', TienChenhLech);
                } else {
                    $(".tg-" + data).attr("data-isinsurrance", 1);
                    $(".allPrice-" + data).html("<span style=\"color: red; font-weight: bold;\">" + TongTienTra + "₫</span>");
                    $(".pricecl-" + data).text(TienChenhLech + '₫');
                    $(".price-one-" + data).text(TienMoiThang + '₫');
                    $(".price-one-" + data).append(text2);
                    $(".tg-" + data).attr('data-price', TongTienTra);
                    $(".tg-" + data).attr('data-price-a-month', TienMoiThang);
                    $(".tg-" + data).attr('data-tclgb', TienChenhLech);
                }
            } else {
                if (ck == "1") {
                    $(".tgs-" + data).attr("data-isinsurrance", 0);
                    $(".pricecls-" + data).text(priceOldcl + '₫');
                    $(".price-ones-" + data).text(priceOne + '₫');
                    $(".allPrices-" + data).html("<span style=\"color: red; font-weight: bold;\">" + priceOld + '₫</span>');
                    $(".tgs-" + data).attr('data-price', priceOld);
                    $(".tgs-" + data).attr('data-price-a-month', priceOne);
                    $(".tgs-" + data).attr('data-tclgb', priceOldcl);
                } else {
                    $(".tg-" + data).attr("data-isinsurrance", 0);
                    $(".allPrice-" + data).html("<span style=\"color: red; font-weight: bold;\">" + priceOld + '₫</span>');
                    $(".pricecl-" + data).text(priceOldcl + '₫');
                    $(".price-one-" + data).text(priceOne + '₫');
                    $(".price-one-" + data).append(text2);
                    $(".tg-" + data).attr('data-price', priceOld);
                    $(".tg-" + data).attr('data-price-a-month', priceOne);
                    $(".tg-" + data).attr('data-tclgb', priceOldcl);
                }
            }
        });

        /*move screen*/
        $(document).on('click', '.tg-rhtbtn', function () {
            $(".re-name-order").text($(this).attr("data-name"));
            $(".re-gt-order").text($(this).attr("data-exhibit"));
            $(".re-sttt-order").text($(this).attr("data-pricebefore") + "₫");
            $(".re-stg-order").text($(this).attr("data-price-a-month") + "₫");
            $(".re-month-order").text($(this).attr("data-month"));
            $(".re-ct-order").text($(this).attr("data-credit"));
            //if ($(this).attr("data-credit") == 'AKulaku') {
            //    $(".re-ct-order2").text('');
            //} else {
            //    $(".re-ct-order2").text(' - Duyệt hồ sơ trong vòng 4 giờ');
            //}
            $(".re-price-ol-order").text($(this).attr("data-price") + "₫");
            $(".re-clgb-order").text($(this).attr("data-tclgb") + "₫");
            $(".tf-seritimg img").attr('src', $(this).attr("data-img"));
            $(".atModalInfo").attr("data-img", $(this).attr("data-img"));
            $(".atModalInfo").attr("data-packe", $(this).attr("data-packe"));
            $(".atModalInfo").attr("data-phith", $(this).attr("data-phith"));
            $(".atModalInfo").attr("data-bh", $(this).attr("data-bh"));
            $(".atModalInfo").attr("data-price", $(this).attr("data-price"));
            $(".atModalInfo").attr("data-pricebefore", $(this).attr("data-pricebefore"));
            $(".atModalInfo").attr("data-precent", $(this).attr("data-precent"));
            $(".atModalInfo").attr("data-price-a-month", $(this).attr("data-price-a-month"));
            $(".atModalInfo").attr("data-month", $(this).attr("data-month"));
            $(".atModalInfo").attr("data-exhibit", $(this).attr("data-exhibit"));
            $(".atModalInfo").attr("data-credit", $(this).attr("data-credit"));
            $(".atModalInfo").attr("data-name", $(this).attr("data-name"));
            $(".atModalInfo").attr("data-laisuatthuc", $(this).attr("data-laisuatthuc"));
            $(".atModalInfo").attr("data-isinsurrance", $(this).attr("data-isinsurrance"));
            $(".atModalInfo").attr("data-pricekm", $(this).attr("data-pricekm"));
            $(".atModalInfo").attr("data-proid", $(this).attr("data-proid"));
            $('.tg4-imain').hide();
            var ulDiaChi = $('#sl-city').parent().parent();
            if (checkHCUuDai()) {
                ulDiaChi.hide();
                ulDiaChi.prev().hide();
                ulDiaChi.next().hide();
                $('#txtPhoneNumberGuarantor').parent().parent().hide();
                $('.tgudHC').show();
                $('#txtName').parent().hide();
                $('#txtCmd').parent().parent().after($('#txtPhone').parent().parent());
            }
            else {
                ulDiaChi.show();
                ulDiaChi.prev().show();
                ulDiaChi.next().show();
                $('#txtPhoneNumberGuarantor').parent().parent().show();
                $('.tgudHC').hide();
                $('#txtName').parent().show();
                $('#txtCmd').parent().parent().before($('#txtPhone').parent().parent());
            }
            $('.tf-sec1').hide();
            $('.tf-sec3').show();
            $('html, body').animate({ scrollTop: $(".fs-breadcrumb").offset().top - 50 }, 1000);
        });

        $('#sl-city').on('change', function () {
            var cityId = $(this).val();
            loadDistrict(cityId);
        });

        $('#DistrictIDShop').on('change', function () {
            var cityId = $("#CityIDShop").val();
            var productid = $(".ProductID").val();
            var districtId = $("#DistrictIDShop").val() == "" ? "0" : $("#DistrictIDShop").val();
            var typeware = 1;
            var sku = $(".ProductID").attr("data-sku");
            loadAutoSuggestShop(cityId, districtId, typeware, sku, productid)
        });

        $('#tg4-btn-gtg').click(function () {
            var data = {
                itemCode: $("#hidden-val").attr("data-sku"),
                price: $("#hidden-val").attr("data-price").replace(/\./igm, ""),
                proid: "10,11",
                prepay: "30",
                termID: "06",
                v: 123
            }
            //var info = "1 CMND, 1 sổ hộ khẩu";
            $('.tg4-load').show();
            $.get("/Ajax/Installment/GetOptionCreditRecuringDetaisV5", data, function (resp) {
                $("#recuring-choise").html(resp.View);
                //$('.tg-name-pro').text($(".trg-prodbtit span").text() + " ");
                $('.tg4-irt-btn').attr("data-name", $(".trg-prodbtit span").text());
                //$('.re-info').text(info);
                $('.tg4-load').hide();
                //$('.atModal').attr('data-exhibit', info);
            })
            $('.fshop-mainboxs').hide();
            $('.tg4-imain').show();
            $('html, body').animate({ scrollTop: $(".fs-breadcrumb").offset().top - 50 }, 1000);
        });

        $(document).on('click', '#tf-seback', function () {
            $('.fshop-mainboxs').show();
            $('.tg4-imain').hide();
            $('html, body').animate({ scrollTop: $(".fs-breadcrumb").offset().top - 50 }, 1000);
        });
        // Giấy tờ bổ sung
        $(document).on('click', '.tg-rhftm input', function () {
            var _this = $(this);
            var id = "";
            var name = "";
            $('.tg-rhftm input[name=c2]:checked').each(function () {
                if ($(this).is(":checked")) {
                    id += "," + $(this).val();
                    name += "," + $(this).attr("data-name")
                }
                else {
                    id += id.replace("," + $(this).val());
                    name += "," + name.replace("," + $(this).attr("data-name"))
                }
            });
            var id2 = $(".tg-rhflb input[name=c1]:checked").val();
            var id3 = $("#re-ttt").val();
            var id4 = $("#re-month").val();
            var prepay = "";
            var termID = "";
            var action = 1;
            if (id3 == "" || typeof id3 == 'undefined') {
                action = 0;
            }
            if ((id3 == "" || typeof id3 == 'undefined') && (id4 == "" || typeof id4 == 'undefined')) {
                prepay = "30";
                termID = "06";
            } else {
                prepay = $("#re-ttt").val();
                termID = $("#re-month").val();
            }
            var info = "1 CMND," + $(".tg-rhflb input[name=c1]:checked").attr("data-name") + name;
            var itemCode = $("#hidden-val").attr("data-sku");
            var price = $("#hidden-val").attr("data-price").replace(/\./igm, "");
            var proid = "10," + $(".tg-rhflb input[name=c1]:checked").val() + id;
            LoadData(itemCode, price, proid, prepay, termID, id.slice(1), id2, id3, id4, action, info);

        })
        // Sổ hộ khẩu, bằng lái
        $(document).on('click', '.tg-rhflb input', function () {
            $('.trgsv-13').prop('checked', false);
            var _this = $(this);
            //$('.tg-rhftm input').prop('checked', false);
            $(this).prop('checked', true);
            var id = "";
            var name = "";
            $('.tg-rhftm input[name=c2]:checked').each(function () {
                id += "," + $(this).val();
                name += "," + $(this).attr("data-name")
            });
            var id2 = $(".tg-rhflb input[name=c1]:checked").val();
            var id3 = $("#re-ttt").val();
            var id4 = $("#re-month").val();
            var prepay = "";
            var termID = "";
            var action = 1;
            if (id3 == "" || typeof id3 == 'undefined') {
                action = 0;
            }
            if ((id3 == "" || typeof id3 == 'undefined') && (id4 == "" || typeof id4 == 'undefined')) {
                prepay = "30";
                termID = "06";
            } else {
                prepay = $("#re-ttt").val();
                termID = $("#re-month").val();
            }
            var info = "1 CMND," + $(".tg-rhflb input[name=c1]:checked").attr("data-name") + name;
            var itemCode = $("#hidden-val").attr("data-sku");
            var price = $("#hidden-val").attr("data-price").replace(/\./igm, "");
            var proid = "10," + $(".tg-rhflb input[name=c1]:checked").val() + id;
            LoadData(itemCode, price, proid, prepay, termID, id.slice(1), id2, id3, id4, action, info);
        });
        // Tiền trả trước
        $(document).on('change', '#re-ttt', function () {
            $('.re-ct').remove();
            $('#re-month').prop('disabled', false);
            $('.re-ct').remove();
            var _this = $(this);
            var id = "";
            var name = "";
            $('.tg-rhftm input[name=c2]:checked').each(function () {
                id += "," + $(this).val();
                name += "," + $(this).attr("data-name")
            });
            var id2 = $(".tg-rhflb input[name=c1]:checked").val();
            var id3 = $(this).val();
            var id4 = $("#re-month").val();
            var action = 1;
            var info = "1 CMND," + $(".tg-rhflb input[name=c1]:checked").attr("data-name") + name;
            var itemCode = $("#hidden-val").attr("data-sku");
            var prepay = $("#re-ttt").val();
            var termID = $("#re-month").val();
            var price = $("#hidden-val").attr("data-price").replace(/\./igm, "");
            var proid = "10," + $(".tg-rhflb input[name=c1]:checked").val() + id;
            LoadData(itemCode, price, proid, prepay, termID, id.slice(1), id2, id3, id4, action, info);
        });
        // Số tháng
        $(document).on('change', '#re-month', function () {
            var _this = $(this);
            var id = "";
            var name = "";
            $('.tg-rhftm input[name=c2]:checked').each(function () {
                id += "," + $(this).val();
                name += "," + $(this).attr("data-name");
            });
            var id2 = $(".tg-rhflb input[name=c1]:checked").val();
            var id4 = $(this).val();
            var id3 = $("#re-ttt").val();
            var action = 1;
            var info = "1 CMND," + $(".tg-rhflb input[name=c1]:checked").attr("data-name") + name;
            var itemCode = $("#hidden-val").attr("data-sku");
            var prepay = $("#re-ttt").val();
            var termID = $("#re-month").val();
            var price = $("#hidden-val").attr("data-price").replace(/\./igm, "");
            var proid = "10," + $(".tg-rhflb input[name=c1]:checked").val() + id;
            LoadData(itemCode, price, proid, prepay, termID, id.slice(1), id2, id3, id4, action, info);
        });
        //Load dữ liệu
        function LoadData(itemCode, price, proid, prepay, termID, id, id2, id3, id4, action, info) {
            var data = {
                itemCode: itemCode,
                price: price,
                proid: proid,
                prepay: prepay,
                termID: termID,
                v: 123
            };
            $('.tg4-load').show();
            $.get("/Ajax/Installment/GetOptionCreditRecuringDetaisV5", data, function (resp) {
                $("#recuring-choise").html(resp.View);
                //$('.re-info').text(info);
                //$('.tg4-irt-btn').attr('data-exhibit', info);
                var idx = id.split(',');
                for (var i = 0; i < idx.length; i++) {
                    $('.tg4-check-' + idx[i]).prop('checked', true);
                }
                $('.tg4-radio-' + id2).prop('checked', true);
                if (action == 1) {
                    $('.re-tt').remove();
                    $(".tt-" + id3).prop('selected', true);
                    $('#re-month').prop('disabled', false);
                    $('.re-ct').remove();
                    $(".month-" + id4).prop('selected', true);
                }
                $('.tg-name-pro').text($(".trg-prodbtit span").text() + " ");
                $('.tg4-load').hide();
            });
        }

        //Set name HC
        $(document).on('keyup', '#txtNameHo,#txtNameLot,#txtNameTen', function (ex) {
            var txtHo = $.trim($('#txtNameHo').val());
            var txtLot = $.trim($('#txtNameLot').val());
            var txtTen = $.trim($('#txtNameTen').val());
            var txtHoTen;
            if (txtLot === undefined || txtLot === null || txtLot === '') {
                txtHoTen = txtHo + ' ' + txtTen;
            }
            else {
                txtHoTen = txtHo + ' ' + txtLot + ' ' + txtTen;
            }
            $('#txtName').val(txtHoTen);
        });
        //end
    });

    function f_LoadViewPay() {

    }
    var ajaxUrl = {
        GetListDistrict: '/Ajax/Shop/getDistrictByCity',
        GetListAmortizations: '/Ajax/Installment/GetListAmortizations',
        GetListExhibit: '/Ajax/Installment/GetListExhibit',
        GetListPercentPrePay: '/Ajax/Installment/GetListPercentPrePay',
        GetRecuringCustomerChoose: '/Ajax/Installment/GetRecuringCustomerChoose',
        GetRecuringCustomerChooseXH: '/Ajax/Installment/GetRecuringCustomerChooseXH',
        InsertOrderRecuring: '/Ajax/Installment/AddOrderTraGop',
        GetListCutomerTypeRecurring: '/Ajax/Installment/GetListCutomerTypeRecurring',
        GetRecurringByVariantId: '/Ajax/Installment/GetRecurringByVariantId',
        GetListRecuringProductBySku: '/Ajax/Installment/GetListRecuringProductBySku',
        SearchLucene: '/Ajax/SearchLucene/AutoCompleteRecuring'
    };

    function IsNullOrEmpty(parameters) {
        if (!parameters) {
            return true;
        } else {
            return false;
        }
    }

    // load data by city
    function loadDistrict(idCity) {
        $.ajax({
            url: ajaxUrl.GetListDistrict,
            type: 'GET',
            data: { cityId: idCity },
            beforeSend: function () {
                $('#sl-district').html('<option>Đang xử lý...</option>');
            }
        }).done(function (data) {
            var htmlOption = '<option value="0">Quận/Huyện</option>';

            $.each(data.list, function (i, v) {
                htmlOption += '<option value="' + v.ID + '">' + v.Name + '</option>';
            });
            $('#sl-district').html(htmlOption);
        })

    };
    //Validate shop
    function validateship() {
        var mess = "Bạn chưa chọn ";
        var idship = $(".gh-s2c50.active").data("id");
        if (idship == 1) {
            if (IsNullOrEmpty($("#CityIDShop").val())) {
                mess += "Tỉnh/TP";
            }
        } else {
            if (IsNullOrEmpty($("#CityIDHome").val())) {
                mess += "Tỉnh/TP";
            }
            if (IsNullOrEmpty($("#DistrictHome").val())) {
                mess += mess.indexOf("TP") > -1 ? ", Quận/Huyện " : "Quận/Huyện ";
            }
            if (IsNullOrEmpty($("#addresshome").val())) {
                mess += mess.indexOf("TP") > -1 || mess.indexOf("Quận") > -1 ? ", Địa chỉ " : "Địa chỉ";
            }
        }
        return mess;
    }
    // Load Data by district
    function loadAutoSuggestShop(cityId, districtId, typeware, sku, productid) {
        var proid = $(".ProductID").val();
        var type = 1;
        var dic = $("#DistrictIDShop").val() == "" ? "0" : $("#DistrictIDShop").val();
        $.get("/Ajax/Installment/AutoSuggestShopV2", {
            cityId: cityId,
            districtId: districtId,
            typeware: typeware,
            sku: sku,
            address: "",
            productid: productid
        }, function (data1) {
            $("#lisuggest ul").html(data1);
            $("#lisuggest").show();
            var quan = $("#DistrictIDShop option:selected").text() + ", ";
            $("#countshop").text($("#lisuggest ul>li").length);
            if (dic == "0") {
                quan = "";
            } else {
            }
            $("#cityname").text(quan + $("#CityIDShop option:selected").text());
            $("#plistshop").show();

            $(".gh-s2shopbox").mCustomScrollbar();
        });
        var mess = validateship();
        if (mess.toString() != "Bạn chưa chọn ") {
            $("#shipmess").text(mess);
            $("#shipmess").show();
        } else {
            $("#shipmess").hide();
        }
    }
    // Load data by city
    function loadDistrictOrder(idCity) {
        $("#lisuggest ul").html("");
        $.get("/Ajax/Shop/getDistrictByCity", { cityId: idCity }, function (data) {
            var htmlOption = '<option value="0">Chọn quận, huyện</option>';
            $.each(data.list, function (i, v) {
                htmlOption += '<option value="' + v.ID + '">' + v.Name + '</option>';
            });
            $('#DistrictIDShop').html(htmlOption);
            var proid = $(".ProductID").val();
            var type = 1;
            var city = $("#CityIDShop").val() == "" ? "0" : $("#CityIDShop").val();
            $.get("/Ajax/Installment/AutoSuggestShopV2", {
                cityId: city,
                districtId: 0,
                typeware: type,
                sku: $(".ProductID:first").attr("data-sku"),
                address: "",
                productid: proid
            }, function (data1) {
                $("#lisuggest ul").html(data1);
                //if ($.cookie("ft_storeid") != "undefined") {
                //    $(".RaShop:checked").attr("checked", false);
                //    $(".RaShop[value='" + $.cookie("ft_storeid") + "']").attr("checked", true);
                //}
                $("#lisuggest").show();
                $("#countshop").text($("#lisuggest ul>li").length);
                quan = "";
                $("#cityname").text(quan + $("#CityIDShop option:selected").text());
                $("#plistshop").show();
                $(".gh-s2shopbox").mCustomScrollbar();
            });
            var mess = validateship();
            if (mess.toString() != "Bạn chưa chọn ") {
                $("#shipmess").text(mess);
                $("#shipmess").show();
            } else {
                $("#shipmess").hide();
            }
        })
    }
    // Convert price
    function convertcurrency(str) {
        return (str + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    // Đặt hàng
    function AddOrderRecuring(precentPrepay, pricePrayPerMonth, priceBefore, monthPray, credit, exhibit, laisuatthuc, namePackage, userid, isInsurrance, phiBH, phiTH, phoneNumberGuarantor, quickNote, storeId, shopName, pricekm, proid) {
        var url = window.location.href;
        var checkurl = url.split("/");
        var link = checkurl[checkurl.length - 1];
        // var urlPost;
        var warehouseLocType = 1;
        var datapost;
        var gender = 0;
        gender = $('input[name=chkgt]:checked').val();
        $('.gender-popo').each(function () {
            if ($(this).is(':checked')) {
                gender = $(this).val();
            }
        });
        if (link == "tra-gop-xa-hang") {
            //  urlPost = ajaxUrl.GetRecuringCustomerChooseXH;
            warehouseLocType = 8;
            datapost = {
                sourceName: "trả góp",
                variantId: getHiddenVal().productVariant,
                customerName: buildNameCustomer(),
                customerPhone: $('#txtPhone').val(),
                identityCardNo: $('#txtCmd').val(),
                birthDay: util.convertDateToServer($('#num1').val(), $('#num2').val(), $('#num3').val()),
                cityId: $('#sl-city').val(),
                districtId: $('#sl-district').val(),
                customerAddress: $('#txtAddress').val(),
                percentPrepay: precentPrepay,
                pricePayPerMonth: pricePrayPerMonth,
                prepaid: priceBefore,
                gender: gender == 0 ? true : false,
                monthBorrowing: $.trim(String(monthPray).replace('Tháng', '')),
                recuringId: util.getIdCredit(credit),
                exhibit: exhibit,
                laisuat: laisuatthuc,
                namePackage: namePackage,
                userid: userid,
                reffer: typeof $.cookie(nameCookieJsScript) != 'undefined' ? $.cookie(nameCookieJsScript) : document.referrer,
                email: '',
                campaignID: 161,
                warehouseLocType: warehouseLocType,
                isInsurrance: isInsurrance == 0 ? false : true,
                phiBH: isInsurrance == 0 ? 0 : phiBH,
                phiTH: phiTH,
                phoneNumberGuarantor: phoneNumberGuarantor,
                quickNote: quickNote,
                storeId: storeId,
                shopName: shopName,
                TyPePayment: 'boxselectShop',
                pricekm: pricekm,
                proid: proid
            };
        } else {
            // urlPost = ajaxUrl.GetRecuringCustomerChooseXH;
            datapost = {
                sourceName: "trả góp",
                variantId: getHiddenVal().productVariant,
                customerName: buildNameCustomer(),
                customerPhone: $('#txtPhone').val(),
                identityCardNo: $('#txtCmd').val(),
                birthDay: util.convertDateToServer($('#num1').val(), $('#num2').val(), $('#num3').val()),
                cityId: $('#sl-city').val(),
                districtId: $('#sl-district').val(),
                customerAddress: $('#txtAddress').val(),
                percentPrepay: precentPrepay,
                pricePayPerMonth: pricePrayPerMonth,
                prepaid: priceBefore,
                gender: gender == 0 ? false : true,
                monthBorrowing: $.trim(String(monthPray).replace('Tháng', '')),
                recuringId: util.getIdCredit(credit),
                exhibit: exhibit,
                laisuat: laisuatthuc,
                namePackage: namePackage,
                userid: userid,
                reffer: typeof $.cookie(nameCookieJsScript) != 'undefined' ? $.cookie(nameCookieJsScript) : document.referrer,
                email: '',
                campaignID: 272,
                warehouseLocType: warehouseLocType,
                isInsurrance: isInsurrance == 0 ? false : true,
                phiBH: isInsurrance == 0 ? 0 : phiBH,
                phiTH: phiTH,
                phoneNumberGuarantor: phoneNumberGuarantor,
                quickNote: quickNote,
                storeId: storeId,
                shopName: shopName,
                TyPePayment: 'boxselectShop',
                pricekm: pricekm,
                proid: proid
            };
        }
        $.ajax({
            url: ajaxUrl.InsertOrderRecuring,
            type: 'POST',
            data: datapost,
            beforeSend: function () {

            }
        }).done(function (data) {
            if (checkHCUuDai()) {
                $.post("/don-hang-hc/CallLogInstallmentCompany/AddCalllogHC", {
                    OrderId: data.OrderID,
                    hoKH: $.trim($('#txtNameHo').val()),
                    lotKH: $.trim($('#txtNameLot').val()),
                    tenKH: $.trim($('#txtNameTen').val())
                }, function (result) {
                    if (result != null && result.error == false) {
                        location.href = result.eposlink;
                    }
                    else {
                        location.href = "/tra-gop/thanh-toan-thanh-cong?id=" + data.OrderID;
                    }
                });
            }
            else {
                location.href = "/tra-gop/thanh-toan-thanh-cong?id=" + data.OrderID;
            }
        });
    }
    function AddOrder(variant, txtpayname, txtpayphone, quickNote) {
        $.post('/Ajax/Order/AddOrder',
            {
                sourceName: 'Trả góp ffcredit',
                CampaignID: 0,
                TotalPriceCampaignOrder: '',
                productVariantId: variant,
                gender: 'true',
                name: txtpayname,
                email: '',
                phone: txtpayphone,
                address: '',
                city: 0,
                district: 0,
                couponCode: '',
                accessories: '',
                talesSales: null,
                ArrPromotioID: null,
                typePayment: 'boxselectShop',
                refered: '',
                clientid: $('#clientid').val(),
                QuickNote: quickNote
            }, function (odata) {
                $('#tracking').html(odata.Messenger);
                $('#txtName-ol').val('');
                $('#txtPhone-ol').val('');
                $('#loadingbtnol').hide();
                $('#AddOrder').show();
                $("#ok-final").modal("show");
            }).complete(function () {
            });
    }

    function buildNameCustomer() {
        var nameCutomer = $('#txtName').val();

        if (window.location.href.indexOf(util.config.Mpost) > -1) {
            nameCutomer = 'mpot-test-' + $('#txtName').val();
        }
        return nameCutomer;
    }

    function getHiddenVal() {
        return {
            sku: $('#hidden-val').attr('data-sku'),
            price: $('#hidden-val').attr('data-price'),
            name: $('#hidden-val').attr('data-name'),
            productVariant: $('#hidden-val').attr('data-variant')
        };
    };

    function validateFrm() {
        var errorList = new Array();
        if ($('input[name=chkgt]:checked').val() === undefined || $('input[name=chkgt]:checked').val() === '') {
            $('#txtGioiTinhError').text('Vui lòng chọn giới tính.');
            errorList.push("#txtGioiTinhError");
        }
        if ($.trim($('#txtName').val()) === '') {
            $('#txtNameError').text('Vui lòng nhập họ và tên.');
            errorList.push("#txtNameError");
        } else if ($.trim($('#txtName').val()).length > 150) {
            $('#txtNameError').text('Họ tên không quá 150 ký tự.');
            errorList.push("#txtNameError");
        }
        if (util.isPhone($('#txtPhone').val() || '') === false) {
            $('#txtPhoneError').text('Số điện thoại cần là số di động gồm 10 số.');
            errorList.push("#txtPhoneError");
        }
        if (util.isCmd($('#txtCmd').val() || '') === false) {
            $('#txtCmdError').text('Vui lòng nhập số CMND (9 hoặc 12 số).');
            errorList.push("#txtCmdError");
        }
        if ($('.atModalInfo').attr('data-credit') == "Home Credit") {
            if (util.isBirth($('#num1').val(), $('#num2').val(), $('#num3').val(), 20).error === false) {
                $('#txtDateError').text(util.isBirth($('#num1').val(), $('#num2').val(), $('#num3').val(), 20).messages);
                errorList.push("#txtDateError");
            }
        }
        else {
            if (util.isBirth($('#num1').val(), $('#num2').val(), $('#num3').val()).error === false) {
                $('#txtDateError').text(util.isBirth($('#num1').val(), $('#num2').val(), $('#num3').val()).messages);
                errorList.push("#txtDateError");
            }
        }
        if (!checkHCUuDai()) {
            if ($('#sl-city').val() === '0') { //
                $('#sl-cityError').text('Vui lòng chọn tỉnh thành bạn đang sinh sống.');
                errorList.push("#sl-cityError");
            }
            if ($('#sl-district').val() === '0') {
                $('#sl-districtError').text('Vui lòng chọn quận huyện bạn đang sinh sống.');
                errorList.push("#sl-districtError");
            }
            if ($.trim($('#txtAddress').val()) === '') {
                $('#txtAddressError').text('Vui lòng nhập số nhà/địa chỉ của bạn.');
                errorList.push("#txtAddressError");
            }
            if (util.isPhone($('#txtPhoneNumberGuarantor').val() || '') === false) {
                $('#txtPhoneNumberGuarantorError').text('Số điện thoại không đúng định dạng.');
                errorList.push("#txtPhoneNumberGuarantorError");
            }
        } else {
            if ($.trim($('#txtNameHo').val()) === '') {
                $('#txtNameHoError').text('Vui lòng nhập họ.');
                errorList.push("#txtNameHoError");
            } else if ($.trim($('#txtNameHo').val()).length > 150) {
                $('#txtNameHoError').text('Họ không quá 150 ký tự.');
                errorList.push("#txtNameHoError");
            }

            if ($.trim($('#txtNameTen').val()) === '') {
                $('#txtNameTenError').text('Vui lòng nhập tên.');
                errorList.push("#txtNameTenError");
            } else if ($.trim($('#txtNameTen').val()).length > 150) {
                $('#txtNameTenError').text('Tên không quá 150 ký tự.');
                errorList.push("#txtNameTenError");
            }

        }
        util.hideArrayElement([
            '#txtGioiTinhError',
            '#txtNameHoError',
            '#txtNameTenError',
            '#txtNameError',
            '#txtPhoneError',
            '#txtCmdError',
            '#txtDateError',
            '#sl-cityError',
            '#sl-districtError',
            '#txtAddressError',
            '#txtPhoneNumberGuarantorError'
        ]);
        if (errorList.length == 0) {
            return true;
        }
        util.showArrayElement(errorList);
        return false;
    };

    function checkHCUuDai() {
        return $('.atModalInfo').attr('data-credit') == "Home Credit" && $(".atModalInfo").attr("data-laisuatthuc").replace(',', '.') == 0;
    }

    // Cookies cửa hàng
    function SetDefaultDataCookies() {
        $.cookie("ft_CategoryID", $("#CategoryID").val(), { path: '/', expires: 1 });

        if (typeof $.cookie("ft_city_rc") == 'undefined') {
            $.cookie("ft_city_rc", 26, { path: '/', expires: 10 });
        }
        if (typeof $.cookie("ft_city_rc") !== 'undefined') {
            loadDistrictOrder($.cookie("ft_city_rc"));
        }
    }
    //end
})(window.jQuery);