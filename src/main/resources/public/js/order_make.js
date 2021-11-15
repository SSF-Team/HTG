var order_id = getQuery('id')
if(order_id !== '') {
    JsBarcode("#barcode", order_id, {
        lineColor: "#000",
        width:2,
        height:40,
        displayValue: false
    })
    JsBarcode('#barcode-1', order_id, {
        height:30,
        width: 1,
        fontSize: 13,
        displayValue: false
    })
    document.getElementById('order_id').innerText = order_id
    // 获取订单信息
    var link = '/order/get/' + order_id + "?id=" + id + "&token=" + cookie
    fetch(link)
        .then(response => response.json())
        .then(data => {
            if(data.message !== undefined) {

            } else {
                document.getElementById('order-get-name').innerText = data.order_name.split('/')[1] + ' --- ' +
                    data.order_phone.split('/')[1]
                document.getElementById('order-get-address').innerText = data.order_address.split('/')[1]
                document.getElementById('order-send-name').innerText = data.order_name.split('/')[0] + ' --- ' +
                    data.order_phone.split('/')[0]
                document.getElementById('order-send-address').innerText = data.order_address.split('/')[0]
                // 获取订单距离
                fetch('/order/cost/' + data.order_address)
                    .then(response => response.json())
                    .then(data1 => {
                        document.getElementById('jli').innerText = data1.distance.toFixed(1)
                        document.getElementById('time-info').innerText = data.order_create_date + " --- " + data1.cost.toFixed(2)
                    })
                    .catch(console.error)
            }
        })
        .catch(console.error)
    document.getElementById('make-time').innerText = '打印日期：' + new Date().toDateString()
}

function getQuery(key) {
    var query = window.location.search.substring(1);
    var key_values = query.split("&");
    var params = {};
    key_values.map(function (key_val){
        var key_val_arr = key_val.split("=");
        params[key_val_arr[0]] = key_val_arr[1];
    });
    if(typeof params[key]!="undefined"){
        return params[key];
    }
    return "";
}

function go_home() {
    window.location.href = '/center/index.html'
}