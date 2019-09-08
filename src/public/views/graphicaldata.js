function getQuerystring(key) {
    var query = window.location.search.substring(1);
    //alert(query);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == key) {
            return pair[1];
        }
    }
}

var rawFormData = JSON.parse(decodeURIComponent(getQuerystring('formdata')))
console.log('formdata', rawFormData)
var add = (...values) => {
    let sum = 0;
    values.forEach(val => {
        try {
            if (!Number.isNaN(val)) {
                sum += Number.parseInt(val);
            }
        } catch (e) {
            // do nothing
        }
    });
    return sum;
}
let totalAssets = add([
    rawFormData.estimatedEquipmentCost,
    rawFormData.estimatedVehicleCost,
    rawFormData.otherAssets,
    rawFormData.totalInventoryValue,
    rawFormData.totalPropertyValue
]);
let totalExpense = add([
    rawFormData.bills,
    rawFormData.cashOutflow,
    rawFormData.officeExpense,
    rawFormData.otherExpense
]);
let totalIncome = add([rawFormData.cashInflow, rawFormData.profit]);
let totalDebt = Math.ceil(rawFormData.debtAmount / rawFormData.debtTermInYears);

var turnColorTo = (color) => {
    $('.smiley-green').css('opacity', 0.25)
    $('.smiley-red').css('opacity', 0.25)
    $('.smiley-yellow').css('opacity', 0.25)
    $('.smiley-' + color).css('opacity', 1)
}

{
    //custom slider javascript
    let $element = $('#spending-range');
    let $handle;
    $element
        .rangeslider({
            polyfill: false,
            onInit: function () {
                $handle = $(".rangeslider__handle", this.$range);
                updateHandle($handle[0], this.value);
            }
        })
        .on("input", function () {
            updateHandle($handle[0], this.value);
        });

    function updateHandle(el, val) {
        el.textContent = " " + "$" + val + " ";
        if (val < 65000 && val >= 50000) {
            turnColorTo('yellow');
        } else if (val < 50000) {
            turnColorTo('green');
        } else {
            turnColorTo('red');
        }
    }
}

{
    //custom slider javascript
    let $element = $('#credit-range');
    let $handle;
    $element
        .rangeslider({
            polyfill: false,
            onInit: function () {
                $handle = $(".rangeslider__handle", this.$range);
                updateHandle($handle[0], this.value);
            }
        })
        .on("input", function () {
            updateHandle($handle[0], this.value);
        });

    function updateHandle(el, val) {
        el.textContent = " " + "$" + val + " ";
    }
}

{
    //custom slider javascript
    let $element = $('#wages-range');
    let $handle;
    $element
        .rangeslider({
            polyfill: false,
            onInit: function () {
                $handle = $(".rangeslider__handle", this.$range);
                updateHandle($handle[0], this.value);
            }
        })
        .on("input", function () {
            updateHandle($handle[0], this.value);
        });

    function updateHandle(el, val) {
        el.textContent = " " + "$" + val + " ";
    }
}

{
    //custom slider javascript
    let $element = $('#assets-range');
    let $handle;
    $element
        .rangeslider({
            polyfill: false,
            onInit: function () {
                $handle = $(".rangeslider__handle", this.$range);
                updateHandle($handle[0], this.value);
            }
        })
        .on("input", function () {
            updateHandle($handle[0], this.value);
        });

    function updateHandle(el, val) {
        el.textContent = " " + "$" + val + " ";
    }
}





$(document).ready(function () {
    //when slider changes, hide start message
    $("input").on("change", function () {
        $("#helper").fadeOut("slow");
    });

    var netDebtValue = (totalDebt - totalAssets);
    if (netDebtValue < 0) //show green
    { }

    if ((totalExpense - totalIncome) < netDebtValue) {

    }

    turnColorTo('red');


});