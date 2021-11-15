// 验证登录
let is_login = false
let logining = true
let id = null
let cookie = null
let err = false

const cookies = document.cookie
const cookie_list = cookies.split(";")
let save = ""
cookie_list.forEach(function(element){
    if(element.trim().substring(0, 2) === 'id' || element.trim().substring(0, 5) === 'token') {
        save += element + "&"
    }
})
console.log('save：' + save)
save = save.substring(0, save.length - 1)
save = save.split(" ").join("")     // 去除空格
    if(save.indexOf('&') > 0) {
    if(save.split('&')[0].split('=')[0].trim() === 'id') {
        id = save.split('&')[0].split('=')[1]
        cookie = save.split('&')[1].split('=')[1]
    } else {
        id = save.split('&')[1].split('=')[1]
        cookie = save.split('&')[0].split('=')[1]
    }
}
if(save.indexOf("&") > 0) {
    // 请求 API
    const httpRequest = new XMLHttpRequest()
    httpRequest.open('POST', '/verify', true)
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    httpRequest.send(save)
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            logining = false
            console.log("登录验证：" + httpRequest.responseText)
            if(httpRequest.responseText.indexOf("200") > 0) {
                is_login = true
                console.log("验证登录成功：" + logining)
            }
        }
    }
}

// 获取传参
var order_id = getQuery('id')
document.getElementById('order_input').value = order_id
console.log("order:" + order_id)
if(order_id !== "") {
    // 获取订单信息
    var link = '/order/get/' + order_id
    var order_info = null
    if(id !== null && cookie !== null) {
        link += "?id=" + id + "&token=" + cookie
    }
    fetch(link)
        .then(response => response.json())
        .then(data => {
            // 保存 order json
            order_info = data
            if(data.message !== undefined) {
                document.getElementById('alert-err').style.display = 'block'
                document.getElementById('alert-err').innerText = data.message
                err = true
                return
            } else {
                document.getElementById('way_pan').style.display = 'block'
            }
            // 刷新 UI
            document.getElementById('order-start').innerText = data.order_address.split('/')[0]
            document.getElementById('order-end').innerText = data.order_address.split('/')[1]
            document.getElementById('order-status').style.visibility = 'visible'
            document.getElementById('order-status').innerText = data.order_status
            if(data.order_phone === '隐藏/隐藏') {
                document.getElementById('login_alert').style.display = 'block'
            }
            switch (data.order_status) {
                case '未确认': {
                    document.getElementById('alert').style.visibility = 'visible'
                    document.getElementById('alert').innerText = '快件未被确认，如果您是发件者，请进入个人中心确认订单。'
                    break
                }
                case '运输中': {
                    document.getElementById('sending_pan').style.display = 'block'
                    // 获取快递员信息
                    fetch('/info/base/' + data.order_sender_id)
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById('alert-send-man').innerText = '此快件正在由 ' + data.first_name + ' ' + data.last_name + ' 寄送，进入“个人中心 - 管理运单”查看详情。'
                        })
                        .catch(console.error)
                    break
                }
            }
            if(data.order_status !== '未确认') {
                document.getElementById('time_pan').style.visibility = 'visible'
                // 设置显示情况
                document.getElementById('create_pan').style.display = data.order_create_date === undefined ? 'none' : 'block'
                document.getElementById('send_pan').style.display = data.order_send_date === undefined ? 'none' : 'block'
                document.getElementById('end_pan').style.display = data.order_end_date === undefined ? 'none' : 'block'
                document.getElementById('close_pan').style.display = data.order_close_date === undefined ? 'none' : 'block'

                document.getElementById('date_create').innerText =dateFormat("YYYY-mm-dd", new Date(data.order_create_date))
                document.getElementById('date_send').innerText = dateFormat("YYYY-mm-dd", new Date(data.order_send_date))
                document.getElementById('date_end').innerText = dateFormat("YYYY-mm-dd", new Date(data.order_end_date))
                document.getElementById('date_close').innerText = dateFormat("YYYY-mm-dd", new Date(data.order_close_date))

                if(data.order_phone !== '隐藏/隐藏') {
                    document.getElementById('user_pan').style.display = 'block'
                    document.getElementById('order-sender-info').innerText = data.order_name.split('/')[0] + " - " + data.order_phone.split('/')[0]
                    document.getElementById('order-getter-info').innerText = data.order_name.split('/')[1] + " - " + data.order_phone.split('/')[1]
                }
            }
            // 初始化百度地图
            if(!err) {
                link = '/order/cost/' + order_info.order_address.split('/')[0] + '/' + order_info.order_address.split('/')[1]
                console.log(link)
                fetch(link)
                    .then(response => response.json())
                    .then(data => {
                        // 刷新地图
                        // 地图加载相关代码
                        console.log("point:" + data.startPoint[0] + '/' + data.startPoint[1])
                        console.log("point:" + data.endPoint[0] + '/' + data.endPoint[1])
                        const map = new BMapGL.Map("container")
                        var p1 = new BMapGL.Point(data.startPoint[0], data.startPoint[1])
                        var p2 = new BMapGL.Point(data.endPoint[0], data.endPoint[1])
                        var driving = new BMapGL.DrivingRoute(map, {renderOptions: {map: map, autoViewport: true}})
                        map.enableScrollWheelZoom(true)
                        driving.search(p1, p2)
                    })
                    .catch(console.error)
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

function go_search() {
    var order_id = document.getElementById('order_input').value
    window.location.href = "/order/index.html?id=" + order_id
}

function back_center() {
    window.location.href = "/center/index.html"
}