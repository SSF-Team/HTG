if(id === -1 || cookie === null) {
    window.location.href = "/center/index.html"
}
var order_id = getQuery('id')
if(order_id !== '') {
    // 获取订单信息
    var link = '/order/get/' + order_id + "?id=" + id + "&token=" + cookie
    fetch(link)
        .then(response => response.json())
        .then(data => {
            if(data.message !== undefined) {
                window.location.href = "/center/index.html"
            } else {
                if(data.order_status === '未确认') {
                    document.getElementById('oif_createDate').innerText = dateFormat("YYYY-mm-dd", new Date(data.order_create_date))
                    document.getElementById('oif_sendName').innerText = data.order_name.split('/')[0]
                    document.getElementById('oif_getName').innerText = data.order_name.split('/')[1]
                    document.getElementById('oif_sendAddress').innerText = data.order_address.split('/')[0]
                    document.getElementById('oif_getAddress').innerText = data.order_address.split('/')[1]
                    document.getElementById('oif_sendPhone').innerText = data.order_phone.split('/')[0]
                    document.getElementById('oif_getPhone').innerText = data.order_phone.split('/')[1]
                } else {
                    window.location.href = "/center/index.html"
                }
            }
        })
        .catch(console.error)
} else {
    window.location.href = "/center/index.html"
}

function go_confirm() {
    var link = '/order/confirm?user_id=' + id + '&user_token=' + cookie + '&order_id=' + order_id
    fetch(link)
        .then(response => response.json())
        .then(data => {
            if(data.code !== 200) {
                document.getElementById('err-alert').innerText = data.message
                document.getElementById('err-alert').style.display = 'block'
            } else {
                window.location.href = "/order/make.html?id=" +order_id
            }
        })
        .catch(console.error)
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

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}