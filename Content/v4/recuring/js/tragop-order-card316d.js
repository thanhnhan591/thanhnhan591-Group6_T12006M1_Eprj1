var g_DataWipTmp = [];
(function () {
    var orderModule = function ($) {
        var domain = '';
        function setupEventHandlers() {
            $('input:radio[name=chbank]').change(function () {
                f_OnSelect_Bank($(this));
            });
            $('input:radio[name=ckpopnh]').change(function () {
                f_OnChange_TypeCardPay();
            });
            $('#AddOrder').click(function () {
                f_AddOrder();
            });
            ///Select shop
            $('#CityIDShopCard').on('change', function () {
                var cityId = $("#CityIDShopCard").val();
                var productid = $(".ProductID").val();
                var districtId = $("#DistrictIDShopCard").val() == "" ? "0" : $("#DistrictIDShopCard").val();
                var typeware = 1;
                var sku = $(".ProductID").attr("data-sku");
                loadDistrictOrder(cityId, districtId, typeware, sku, productid);
            });
            $('#DistrictIDShopCard').on('change', function () {
                var cityId = $("#CityIDShopCard").val();
                var productid = $(".ProductID").val();
                var districtId = $("#DistrictIDShopCard").val() == "" ? "0" : $("#DistrictIDShopCard").val();
                var typeware = 1;
                var sku = $(".ProductID").attr("data-sku");
                loadAutoSuggestShop(cityId, districtId, typeware, sku, productid)
            });
        }
        //On Select Sacombank, VCB, TPB...
        function f_OnSelect_Bank(a_sender) {
            var $this = a_sender.parent().parent();
            $('#hidden-val').data('bank-id', $this.data('id'));
            $('#hidden-val').data('bank-bank', $this.data('bank'));
            $('#hidden-val').data('bank-bankname', $this.data('bankname'));
            $('#hidden-val').data('bank-code', $this.data('code'));
            var card = $this.data('card');
            if ($('input[name=ckpopnh]:checked').length > 0) {
                $('input[name=ckpopnh]:checked')[0].checked = false;//.removeAttr("checked");
            }
            card.indexOf("MASTERCARD") > -1 ? $("#MASTERCARD").show() : $("#MASTERCARD").hide();
            card.indexOf("JCB") > -1 ? $("#JCB").show() : $("#JCB").hide();
            card.indexOf("VISA") > -1 ? $("#VISA").show() : $("#VISA").hide();
            $("#divStep2").show();
            $("#divStep4").show();
            $("#txtCard").val("");
            f_ClearCalcInstallment();
        }
        //On change Vista, Master...
        function f_OnChange_TypeCardPay() {
            f_ClearCalcInstallment();
            var variantId = $('#hidden-val').data('variant');
            var bankCode = $('input[name=chbank]:checked').parent().parent().attr('data-code');
            var paymentMethod = $('input[name=ckpopnh]:checked').val();
            var index_PaymentPay = $('#btnsttg').attr('index_PaymentPay');
            g_DataWipTmp.index_PaymentPay = index_PaymentPay;
            var p_data = {
                variantId: variantId,
                bankCode: bankCode, paymentMethod: paymentMethod,
                index_PaymentPay: index_PaymentPay,
                IsFFriend: epx.Util.f_IsFriend()
            };

            showLoading();
            $.ajax({
                url: domain + '/don-hang/home/CheckDayInWeekByBankV2',
                type: 'POST',
                data: p_data,
                success: function (data) {
                    hideLoading();

                    $('#tg_st_tragop').html(data.div_Cus_TopPay);
                    $div_MonthPayChose.innerHTML = data.div_PaySelectMonthView;

                    var extraprice = data.PriceTrue - data.price;

                    var l_bankcode = $('input[name=chbank]:checked').parent().parent().attr('data-code');
                    if ((index_PaymentPay == null || index_PaymentPay == 0)) {//&& l_bankcode != "FE"
                        $("#btnsttg").text("Trả góp toàn bộ");
                    }
                    else {
                        $("#btnsttg").text(data.Custommer_Pay_Selected + "₫");
                    }

                    if (extraprice > 0) {
                        $(".re-price-extra-li").show();
                    } else {
                        $(".re-price-extra-li").hide();
                    }
                },
                error: function (data) {
                    hideLoading();
                    alert("Hệ thống đang quá tải! Xin thử lại sau vài phút.");
                }
            });
        }
        function f_GetTextQuickNote() {

            var l_MonthSelected = parseInt(MonthSelected());
            var quickNote = l_MonthSelected == 9 ||
                l_MonthSelected == 12 ? "KH chọn trả góp thẻ tín dụng kì hạn " + l_MonthSelected + " tháng ngân hàng "
                + BankCode_Selected() : "";

            if (epx.Util.f_IsFriend() == "1") {
                quickNote += " Đơn hàng Trả góp FFriend"
            }

            if (!f_CheckStock()) {
                quickNote = 'Khách hàng có nhu cầu trả góp thẻ ' + BankCode_Selected() + ' kì hạn ' + l_MonthSelected + ' tháng nhưng cửa hàng không có hàng.';
            }

            return quickNote;
        }
        function f_CheckStock() {
            var checkStock = $("#lisuggestCard input:checked").attr("data-isstock");
            return checkStock == 'True';
        }
        function f_AddOrder() {
            $('#loadingbtnol').show();
            $('#AddOrder').hide();
            var variant = $("#hidden-val").attr('data-variant');
            var txtpayname = $('#txtName-ol').val();
            var txtpayphone = $('#txtPhone-ol').val();

            var quickNote = f_GetTextQuickNote();

            var payment = $(".Bankcode:checked").val();

            if (validateFrmol() === true) {
                if (typeof payment != "undefined" && payment != "") {
                    if (checkCardNoti()) {
                        $('#loadingbtnol').hide();
                        $('#AddOrder').show();
                        $("#notiCard").modal("show");
                    } else {
                        $.cookie("_TGP", $('#hidden-val').attr('data-pro'), { path: '/', expires: 1 });
                        AddOrderOnline(quickNote);
                    }
                }
                else {
                    $('#AddOrder').show();
                    $('#loadingbtnol').hide();
                    alert("Bạn cần chọn loại thẻ ! ");
                }
            } else {
                $('#loadingbtnol').hide();
                $('#AddOrder').show();
            }
        }
        function addfullflow(FullFlowInfo) {
            $.post(domain + "/don-hang/Home/AddFullFlow", {
                OrderID: FullFlowInfo.OrderID,
                ProductName: FullFlowInfo.ProductName,
                ProductQuantity: FullFlowInfo.ProductQuantity,
                ProductColor: FullFlowInfo.ProductColor,
                ProductPromotion: FullFlowInfo.ProductPromotion,
                Sku: FullFlowInfo.Sku,
                ProductID: FullFlowInfo.ProductID,
                ProductVariantID: FullFlowInfo.ProductVariantID,
                ListAccessori: FullFlowInfo.ListAccessori,
                ListPromotion: FullFlowInfo.ListPromotion,
                Discount: FullFlowInfo.Discount,
                Price: FullFlowInfo.Price,
                PriceBeforeTax: FullFlowInfo.PriceBeforeTax,
                CustomerName: FullFlowInfo.CustomerName,
                CustomerPhone: FullFlowInfo.CustomerPhone,
                CustomerEmail: FullFlowInfo.CustomerEmail,
                EmployeeCode: FullFlowInfo.EmployeeCode,
                Company: FullFlowInfo.Company,
                Indentity: FullFlowInfo.Indentity,
                TotalLimit: FullFlowInfo.TotalLimit,
                RemainingLimit: FullFlowInfo.RemainingLimit,
                ShippingMethod: FullFlowInfo.ShippingMethod,
                PaymentMethod: FullFlowInfo.PaymentMethod,
                CityID: FullFlowInfo.CityID,
                DistrictID: FullFlowInfo.DistrictID,
                Deliverydate: FullFlowInfo.Deliverydate,
                Address: FullFlowInfo.Address,
                ShopID: FullFlowInfo.ShopID,
                ShopName: FullFlowInfo.ShopName,
                BankType: FullFlowInfo.BankType,
                BankCode: FullFlowInfo.BankCode,
                CampaingID: FullFlowInfo.CampaingID,
                SourceName: FullFlowInfo.SourceName,
                TemplateOrderID: FullFlowInfo.TemplateOrderID,
                QuickNote: FullFlowInfo.QuickNote,
                ListSkuPromotion: FullFlowInfo.ListSkuPromotion,
                WarehouseCode: "",
                TypeWarehouse: "",
                IsBHV: false,
                PriceBHV: 0,
                QuantityBHV: 0,
                TimeRecive: "",
                PriceDisBHV: 0,
                Image: ""
            }, function (data1) {
                console.log("thêm dữ liệu fullflow vào: " + data1);
            });
        }
        function IsNullOrEmpty(parameters) {
            if (!parameters) {
                return true;
            } else {
                return false;
            }
        }
        function validateFrmol() {
            var $errmessol = $('#err-messol');
            if ($.trim($('#txtName-ol').val()) === '') {
                $errmessol.text('Vui lòng nhập họ và tên.');
                util.showArrayElement(['#err-messol']);
                return false;
            } else if ($.trim($('#txtName-ol').val()).length > 150) {
                $errmessol.text('Họ tên không quá 150 ký tự');
                util.showArrayElement(['#err-messol']);
                return false;
            }
            else if (util.isPhone($('#txtPhone-ol').val() || '') === false) {
                $errmessol.text('Số điện thoại cần là số di động gồm 10 số.');
                util.showArrayElement(['#err-messol']);
                return false;
            }
            else if (util.phoneformat($('#txtPhone-ol').val() || '') === false) {
                $errmessol.text('Số điện thoại không đúng định dạng.');
                util.showArrayElement(['#err-messol']);
                return false;
            }
            else if ($('input[name=ckpopnh]:checked').val() === undefined) {
                $errmessol.text('Vui lòng chọn ngân hàng và loại thẻ');
                util.showArrayElement(['#err-messol']);
                return false;
            }
            //else if (util.isEmail($('#txtEmail-ol').val() || '') === false) {
            //    $errmessol.text('Vui lòng nhập đúng địa chỉ email');
            //    util.showArrayElement(['#err-messol']);
            //    return false;
            //}

            //else if ($(".re-price-ol").attr('price') == '') {
            //    $errmessol.text('Vui lòng đợi lấy thông tin trả góp');
            //    util.showArrayElement(['#err-messol']);
            //    return false;
            //}
            else if (MonthSelected() == null) {
                $errmessol.text('Chưa chọn số tháng trả góp');
                util.showArrayElement(['#err-messol']);
                return false;
            }
            else if (CheckSelectedShop() == null) {
                $errmessol.text('Chưa chọn shop để duyệt hồ sơ');
                util.showArrayElement(['#err-messol']);
                return false;
            }
            else {
                util.hideArrayElement(['#err-messol']);
                return true;
            }
        }
        function checkCardNoti() {
            var bankCode = $('input[name=chbank]:checked').parent().parent().attr('data-code');
            var contentNoti = '';
            switch (bankCode) {
                case 'VIB':
                    contentNoti = '<p>- Chủ thẻ cần liên hệ hotline ngân hàng để chuyển đổi giao dịch sang trả góp chậm nhất 05 ngày kể từ ngày thực hiện giao dịch (không quá ngày sao kê)</p>';
                    contentNoti += '<p>- Hotline VIB: <a href="tel:18008180">1800 8180</a></p>';
                    break;
                //case 'CTB':
                //    contentNoti = '<p>- Chủ thẻ nhắn “0” gửi 6058 để nhận để nhận đường dẫn tới link Đăng Ký Chương Trình Trả Góp 0% Lãi Suất Citi PayLite trực tuyến <a target="_blank" href="https://www.citibank.com.vn/Landing_Pages/vietnamese/PayLite/application-form.htm">https://www.citibank.com.vn/Landing_Pages/vietnamese/PayLite/application-form.htm</a> điền thông tin giao dịch, chọn Đối tác Ngân Lượng Alepay và đồng ý với Điều khoản và Điều kiện của chương trình, sau đó bấm "Gửi Yêu Cầu".</p>';
                //    contentNoti += '<p>- Hotline Citibank: <a href="tel:02835211111">028.3521 1111</a>';
                //    break;
                case 'CTB':
                    contentNoti = '<p>- Sau khi thanh toán thành công, Chủ thẻ nhắn “0” gửi 6058 để nhận để nhận đường dẫn tới link Đăng Ký Chương Trình Trả Góp 0% Lãi Suất Citi PayLite trực tuyến <a target="_blank" href="https://www.citibank.com.vn/Landing_Pages/vietnamese/PayLite/application-form.htm">https://www.citibank.com.vn/Landing_Pages/vietnamese/PayLite/application-form.htm</a> điền thông tin giao dịch, <span style="color: red;font-weight: bolder;">chọn Đối tác Ngân Lượng, chọn đúng kì hạn thanh toán chuyển đổi trả góp</span> và đồng ý với Điều khoản và Điều kiện của chương trình, sau đó bấm "Gửi Yêu Cầu".</p>';
                    //contentNoti += '<p>- Hotline Citibank: <a href="tel:02835211111">028.3521 1111</a>';
                    break;
                case 'MARITIMEBANK':
                    contentNoti = '<p>- Chủ thẻ PHẢI liên hệ hotline ngân hàng để chuyển đổi giao dịch sang trả góp chậm nhất 05 ngày kể từ ngày thực hiện giao dịch (không quá ngày sao kê).</p>';
                    //contentNoti += '<p>- Chủ thẻ trả thêm 3% * giá trị giao dịch trên mọi kỳ hạn thanh toán. Ngân hàng thu một lần khi chuyển đổi giao dịch.</p>';
                    contentNoti += '<p>- Hotline Maritime Bank: <a href="tel:1800599999">1800 59 9999</a></p>';
                    break;
                //case 'TECHCOMBANK':
                //    contentNoti = '<p>Techcombank sẽ thu thêm phụ phí  1.1% * Giá trị giao dịch (tối thiểu 150.000VNĐ / giao dịch)</p>';                    
                //    break;
                //case 'MARITIMEBANK':
                //    contentNoti = '<p>- Chủ thẻ PHẢI liên hệ hotline ngân hàng để chuyển đổi giao dịch sang trả góp chậm nhất 05 ngày kể từ ngày thực hiện giao dịch (không quá ngày sao kê).</p>';
                //    contentNoti += '<p>- Chủ thẻ trả thêm 3% * giá trị giao dịch trên mọi kỳ hạn thanh toán. Ngân hàng thu một lần khi chuyển đổi giao dịch.</p>';
                //    contentNoti += '<p>- Hotline Maritime Bank: <a href="tel:1800599999">1800 59 9999</a></p>';
                //    break;
                // case 'FE':
                //     contentNoti = '<p>- Giá trị thanh toán thẻ từ 2.000.000 VNĐ (Hai triệu VNĐ) đến 10.000.000 (Mười triệu VNĐ) sau khi đã trừ các giảm giá (nếu có).</p>';
                //     break;
                case 'OCB':
                    contentNoti = '<p>- Chủ thẻ KHÔNG thực hiện giao dịch từ ngày 10 – 15 hàng tháng (tức là trước kì sao kê 5 ngày).</p>';
                    contentNoti += '<p>- Hotline OCB: <a href="tel:18006678">1800 6678</a></p>';
                    break;
                default:
                    return false;
            }

            $("#notiCard .m-CardBankName").text($('input[name=chbank]:checked').parent().parent().attr('data-namebank'));
            $("#notiCard .gt-mddk2").html($.parseHTML(contentNoti));
            return true;
        }
        function showLoading() {
            $(".boxloads").append('<div class="ghloaddiv"></div>');
            $div_tg_st_tragop.util.show();
        }
        function hideLoading() {
            $(".ghloaddiv").remove();
        }
        function f_ClearCalcInstallment() {

            $div_MonthPayChose.innerHTML = '';
            $div_tg_st_tragop.util.hide();

        }
        function AddOrderOnline(a_QuickNote) {
            $("#bill_to_forename").val($("#txtName-ol").val());
            $("#bill_to_surname").val($("#txtName-ol").val());
            $("#bill_to_phone").val($("#txtPhone-ol").val());
            var selectAddress = $("#lisuggestCard input:checked");
            OrderItem.sourceName = "Trả góp online";
            OrderItem.CampaignID = 0;

            OrderItem.TotalPriceCampaignOrder = Cus_paytruemoney();

            OrderItem.productVariantId = $("#hidden-val").attr("data-variant");
            OrderItem.gender = "0";
            $('.gender-ol').each(function () {
                if ($(this).is(':checked')) {
                    OrderItem.gender = $(this).val();
                }
            });
            OrderItem.name = $("#txtName-ol").val();
            OrderItem.email = "";
            OrderItem.phone = $("#txtPhone-ol").val();
            OrderItem.refered = $("#hidden-val").data("urrlrefer");
            OrderItem.city = selectAddress.attr("data-city");
            OrderItem.district = selectAddress.attr("data-districtid");
            OrderItem.address = selectAddress.attr("data-address");
            OrderItem.storeid = selectAddress.val();
            var paymentmethod = "1";
            var accessori = "";
            var i = 0;
            OrderItem.accessories = accessori;
            OrderItem.QuickNote = a_QuickNote;

            FullFlowInfo.ProductName = $("#hidden-val").data("productname");
            FullFlowInfo.ProductQuantity = 1;
            FullFlowInfo.ProductColor = "";
            FullFlowInfo.ProductPromotion = "";
            FullFlowInfo.Sku = $("#hidden-val").data("sku");
            FullFlowInfo.ProductID = $(".ProductID").val();
            FullFlowInfo.ProductVariantID = OrderItem.productVariantId;
            FullFlowInfo.ListAccessori = OrderItem.accessories;
            FullFlowInfo.ListPromotion = OrderItem.ArrPromotioID;
            FullFlowInfo.Discount = 0;
            FullFlowInfo.Price = OrderItem.TotalPriceCampaignOrder;
            FullFlowInfo.PriceBeforeTax = 0;
            FullFlowInfo.CustomerName = OrderItem.name;
            FullFlowInfo.CustomerPhone = OrderItem.phone;
            FullFlowInfo.CustomerEmail = OrderItem.email;
            FullFlowInfo.ShippingMethod = "";
            FullFlowInfo.PaymentMethod = paymentmethod;
            FullFlowInfo.CityID = OrderItem.city;
            FullFlowInfo.DistrictID = OrderItem.district;
            FullFlowInfo.Address = OrderItem.address;
            FullFlowInfo.ShopID = OrderItem.storeid;
            FullFlowInfo.ShopName = OrderItem.shopname;

            FullFlowInfo.CampaingID = OrderItem.CampaignID;
            FullFlowInfo.SourceName = "Trả góp online";
            FullFlowInfo.QuickNote = OrderItem.QuickNote;
            FullFlowInfo.ListSkuPromotion = "";

            if (!f_CheckStock()) {
				paymentmethod = "6";
				FullFlowInfo.PaymentMethod = paymentmethod;
                $.post(domain + "/don-hang/Home/AddOrderAPI", {
                    sourceName: OrderItem.sourceName,
                    CampaignID: OrderItem.CampaignID,
                    TotalPriceCampaignOrder: OrderItem.TotalPriceCampaignOrder,
                    productVariantId: OrderItem.productVariantId,
                    gender: OrderItem.gender,
                    name: OrderItem.name,
                    email: OrderItem.email,
                    phone: OrderItem.phone,
                    address: OrderItem.address,
                    city: OrderItem.city,
                    district: OrderItem.district,
                    couponCode: OrderItem.couponCode,
                    accessories: OrderItem.accessories,
                    talesSales: OrderItem.talesSales,
                    ArrPromotioID: OrderItem.ArrPromotioID,
                    typePayment: OrderItem.typePayment,
                    refered: OrderItem.refered,
                    shopname: OrderItem.shopname,
                    storeid: OrderItem.storeid,
                    sendoid: OrderItem.sendoid,
                    codeEmployee: OrderItem.codeEmployee,
                    NumSocial: OrderItem.NumSocial,
                    QuickNote: OrderItem.QuickNote,
                    paymentmethod: paymentmethod
                },  function (data) {
                        FullFlowInfo.TemplateOrderID = data.orderid;
                        $.post(domain + "/don-hang/Home/PostOrder", { id: data.orderid }, function (data2) {
                            FullFlowInfo.OrderID = data2;
                            setTimeout(function () { addfullflow(FullFlowInfo); }, 2000);
                            alert("Cửa hàng quý khách vừa chọn không có sẵn hàng, FPT SHOP sẽ sớm liên hệ để tư vấn chi tiết");
                            window.location.href = "https://fptshop.com.vn/don-hang-thanh-cong/" + data2 + "?type=card";
                        }).fail(function (xhr, status, error) {
                            failCallAjaxAPI();
                        });
                    }).fail(function (xhr, status, error) {
                        failCallAjaxAPI();
                });
            } else {
                $.post(domain + "/don-hang/Home/AddOrderInstallmentAlepay", {
                    sourceName: OrderItem.sourceName,
                    CampaignID: OrderItem.CampaignID,
                    TotalPriceCampaignOrder: OrderItem.TotalPriceCampaignOrder,
                    productVariantId: OrderItem.productVariantId,
                    gender: OrderItem.gender,
                    name: OrderItem.name,
                    email: OrderItem.email,
                    phone: OrderItem.phone,
                    address: OrderItem.address,
                    city: OrderItem.city,
                    district: OrderItem.district,
                    couponCode: OrderItem.couponCode,
                    accessories: OrderItem.accessories,
                    talesSales: OrderItem.talesSales,
                    ArrPromotioID: OrderItem.ArrPromotioID,
                    typePayment: OrderItem.typePayment,
                    refered: OrderItem.refered,
                    shopname: OrderItem.shopname,
                    storeid: OrderItem.storeid,
                    sendoid: OrderItem.sendoid,
                    codeEmployee: OrderItem.codeEmployee,
                    NumSocial: OrderItem.NumSocial,
                    QuickNote: OrderItem.QuickNote,
                    onlineOrder: paymentmethod,
                    paymentMethod: $('input[name=ckpopnh]:checked').val(),
                    bankCode: $('input[name=chbank]:checked').parent().parent().attr('data-code'),
                    month: MonthSelected(),
                    buyerAddress: FullFlowInfo.Address,
                    buyerCity: $("#CityIDShopCard option:selected").text(),
                    index_PaymentPay: g_DataWipTmp.index_PaymentPay || 0,
                    IsFFriend: epx.Util.f_IsFriend(),
                    CMND: epx.Util.f_URLPara("rq")
                }, function (data) {
                    $('#loadingbtnol').hide();
                    $('#AddOrder').show();
                    if (data.error == true) {
                        if (data.TemplateOrderID > 0) {
                            FullFlowInfo.TemplateOrderID = data.templateOrderID;
                            if (data.orderId > 0) {
                                FullFlowInfo.OrderID = data.orderId;
                            }
                            setTimeout(function () { addfullflow(FullFlowInfo); }, 2000);
                        }
                        alert(data.Messenger);
                    }
                    else {
                        FullFlowInfo.OrderID = data.orderId;
                        FullFlowInfo.TemplateOrderID = data.templateOrderID;
                        setTimeout(function () { addfullflow(FullFlowInfo); }, 2000);
                        window.location.href = data.url;
                    }
                }).fail(function (xhr, status, error) {
                    failCallAjaxAPI();
                });
            }
        }
        function f_CheckFFriendValidate(cmnd) {
            var l_rtCMND = "0";
            jQuery.ajax({
                url: 'http://fptshop.com.vn/api-online-2/Ajax/Home/CheckFF?cmt=' + cmnd,
                success: function (result) {
                    l_rtCMND = result;
                },
                async: false
            });
            return l_rtCMND;
        }
        function Cus_paytruemoney() {
            var g_pricerootInput = document.querySelector("#tg-chk-tb");
            return g_pricerootInput ? g_pricerootInput.getAttribute("cus_paytruemoney") : null;
        }
        function CheckSelectedShop() {
            var selectShop = $("#lisuggestCard input:checked");
            return !(selectShop == null || selectShop.val() == undefined || selectShop.val() == null || selectShop.val() < 0);
        }
        function MonthSelected() {
            var l_rt = document.querySelector("#tg-chk-tb input[name='rdMonthToInstallment']:checked")
            return l_rt ? l_rt.getAttribute("Month") : null;
        }
        function Code_Name_Selected() {
            var l_rt = document.querySelector("#tg-chk-tb input[name='rdMonthToInstallment']:checked")
            return l_rt ? l_rt.getAttribute("data-code_name") : null;
        }
        function BankCode_Selected() {
            return $('input[name=chbank]:checked').parent().parent().attr('data-code');
        }
        var $div_MonthPayChose,
            g_MonthSelected,
            $div_tg_st_tragop;
        function failCallAjaxAPI() {
            $('#loadingbtnol').hide();
            $('#AddOrder').show();
            alert("Hệ thống đang quá tải! Xin thử lại sau vài phút.");
        }
        // Load shop by district
        function loadAutoSuggestShop(cityId, districtId, typeware, sku, productid) {
            var proid = $(".ProductID").val();
            var type = 1;
            var dic = $("#DistrictIDShopCard").val() == "" ? "0" : $("#DistrictIDShopCard").val();
            $.get("/Ajax/Installment/AutoSuggestShopV2", {
                cityId: cityId,
                districtId: districtId,
                typeware: typeware,
                sku: sku,
                address: "",
                productid: productid,
                iscard: true
            }, function (data1) {
                    $("#lisuggestCard ul").html(data1);
                    $("#lisuggestCard").show();
                    var quan = $("#DistrictIDShopCard option:selected").text() + ", ";
                    $("#countshopCard").text($("#lisuggestCard ul>li").length);
                    if (dic == "0") {
                        quan = "";
                    }
                    $("#citynameCard").text(quan + $("#CityIDShopCard option:selected").text());
                    $("#plistshopCard").show();

                $(".gh-s2shopbox").mCustomScrollbar();
            });
            var mess = validateship();
            if (mess.toString() != "Bạn chưa chọn ") {
                $("#shipmessCard").text(mess);
                $("#shipmessCard").show();
            } else {
                $("#shipmessCard").hide();
            }
        }
        ///Load shop by city
        function loadDistrictOrder(idCity) {
            $("#lisuggestCard ul").html("");
            $.get("/Ajax/Shop/getDistrictByCity", { cityId: idCity }, function (data) {
                var htmlOption = '<option value="0">Chọn quận, huyện</option>';
                $.each(data.list, function (i, v) {
                    htmlOption += '<option value="' + v.ID + '">' + v.Name + '</option>';
                });
                $('#DistrictIDShopCard').html(htmlOption);
                var proid = $(".ProductID").val();
                var type = 1;
                var city = $("#CityIDShopCard").val() == "" ? "0" : $("#CityIDShopCard").val();
                $.get("/Ajax/Installment/AutoSuggestShopV2", {
                    cityId: city,
                    districtId: 0,
                    typeware: type,
                    sku: $(".ProductID:first").attr("data-sku"),
                    address: "",
                    productid: proid,
                    iscard: true
                }, function (data1) {
                        $("#lisuggestCard ul").html(data1);
                        //if ($.cookie("ft_storeid") != "undefined") {
                        //    $(".RaShop:checked").attr("checked", false);
                        //    $(".RaShop[value='" + $.cookie("ft_storeid") + "']").attr("checked", true);
                        //}
                        $("#lisuggestCard").show();
                        $("#countshopCard").text($("#lisuggestCard ul>li").length);
                        quan = "";
                        $("#cityname").text(quan + $("#CityIDShopCard option:selected").text());
                        $("#plistshopCard").show();
                        $(".gh-s2shopboxCard").mCustomScrollbar();
                });
                var mess = validateship();
                if (mess.toString() != "Bạn chưa chọn ") {
                    $("#shipmessCard").text(mess);
                    $("#shipmessCard").show();
                } else {
                    $("#shipmessCard").hide();
                }
            });
        }
        //Validate shop
        function validateship() {
            var mess = "Bạn chưa chọn ";
            var idship = $(".gh-s2c50.active").data("id");
            if (idship == 1) {
                if (IsNullOrEmpty($("#CityIDShopCard").val())) {
                    mess += "Tỉnh/TP";
                }
            } else {
                if (IsNullOrEmpty($("#CityIDHomeCard").val())) {
                    mess += "Tỉnh/TP";
                }
                if (IsNullOrEmpty($("#DistrictHomeCard").val())) {
                    mess += mess.indexOf("TP") > -1 ? ", Quận/Huyện " : "Quận/Huyện ";
                }
                if (IsNullOrEmpty($("#addresshomeCard").val())) {
                    mess += mess.indexOf("TP") > -1 || mess.indexOf("Quận") > -1 ? ", Địa chỉ " : "Địa chỉ";
                }
            }
            return mess;
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
        //$bankcode;
        $(document).ready(function () {
            $div_MonthPayChose = document.querySelector('#div_MonthPayChose');
            $div_tg_st_tragop = document.querySelector('#tg_st_tragop');
            //$bankcode = 
            setupEventHandlers();
            //initWedcs()
            SetDefaultDataCookies();
        });
        return {
            f_OnChange_TypeCardPay: f_OnChange_TypeCardPay,
            f_ClearCalcInstallment: f_ClearCalcInstallment,
            AddOrderOnline: AddOrderOnline,
            MonthSelected: MonthSelected,
            f_GetTextQuickNote: f_GetTextQuickNote,
            f_CheckFFriendValidate: f_CheckFFriendValidate
        }
    };
    typeof define == "function" && window.mtpsAmd ? define("rating", ["jquery"], function ($) {
        return orderModule($)
    }) : (window.epx = window.epx || {}, window.epx.Order = orderModule($));

})();