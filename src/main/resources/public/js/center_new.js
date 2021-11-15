var start = getQuery('start')
var end = getQuery('end')
if(start !== '') {
    document.getElementById('send-address').value = start
}
if(end !== '') {
    document.getElementById('get-address').value = end
}

function new_order() {
    // 整理数据
    var data1 = document.getElementById('sender-name').value + '/' +
        document.getElementById('sender-country').value + '/' +
        document.getElementById('send-address').value + '/' +
        document.getElementById('sender-email').value + '/' +
        document.getElementById('sender-phone').value
    var data2 = document.getElementById('getter-name').value + '/' +
        document.getElementById('getter-country').value + '/' +
        document.getElementById('get-address').value + '/' +
        document.getElementById('getter-email').value + '/' +
        document.getElementById('getter-phone').value
    console.log(data1)
    console.log(data2)
    // 发起 POST 请求
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', '/order/new', true);
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    httpRequest.send('user_id=' + id + '&token=' + cookie + '&data_1=' + data1 + '&data_2=' + data2 + '&other_set=')
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var json = httpRequest.responseText
            console.log('提交表单：' + json)
            var jsonObj = JSON.parse(json)
            var order_id = jsonObj.message
            if(jsonObj.code === 200) {
                // 跳转确认
                window.location.href = "/center/confirm.html?id=" + order_id
            } else {
                document.getElementById('alert').style.display = 'block'
                document.getElementById('alert').innerText = jsonObj.message
            }
        } else {
            document.getElementById('alert').style.display = 'block'
            document.getElementById('alert').value = '未知错误！'
        }
    };
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