// 验证登录
let is_login = false
let logining = true
let id = null
let cookie = null
const cookies = document.cookie
const cookie_list = cookies.split(";")
let save = ""
cookie_list.forEach(function(element){
    if(element.substring(0, 3) === ' id' || element.substring(0, 6) === ' token') {
        save += element + "&"
    }
})
save = save.substring(0, save.length - 1)
save = save.split(" ").join("")     // 去除空格
id = save.split('&')[0].split('=')[1]
cookie = save.split('&')[1].split('=')[1]
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
console.log("order:" + order_id)
if(order_id !== "") {
    // 获取订单信息
    var link = '/order/get/' +order_id
    var order_info = null
    link += "?id=" + id + "&token=" +cookie
    fetch(link)
        .then(response => response.json())
        .then(data => {
            // 保存 order json
            order_info = data
            // 初始化百度地图
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
                    // map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11)
                    var p1 = new BMapGL.Point(data.startPoint[0], data.startPoint[1])
                    var p2 = new BMapGL.Point(data.endPoint[0], data.endPoint[1])
                    var driving = new BMapGL.DrivingRoute(map, {renderOptions: {map: map, autoViewport: true}})
                    map.enableScrollWheelZoom(true)
                    driving.search(p1, p2)
                })
                .catch(console.error)
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