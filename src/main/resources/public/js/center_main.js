// 验证登录
let id = -1
let cookie = ''
const cookies = document.cookie
const cookie_list = cookies.split(";")
let save = ""
cookie_list.forEach(function(element){
    if(element.trim().substring(0, 2) === 'id' || element.trim().substring(0, 5) === 'token') {
        save += element + "&"
    }
})
save = save.substring(0, save.length - 1)
save = save.split(" ").join("")     // 去除空格
console.log('save：' + save)
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
            console.log("登录验证：" + httpRequest.responseText)
            if(httpRequest.responseText.indexOf("200") <= 0) {
                // 跳回主页登录区域
                window.location.replace("/#logistics_inf?type=login_fail")
            }
        }
    };
} else {
    // 跳回主页登录区域
    window.location.replace("/#logistics_inf?type=no_login")
}

// 刷新菜单
fetch('/info/base/' + id)
    .then(response => response.json())
    .then(data => {
        console.log('用户类型：' + data.type)
        if(data.type !== '普通用户') {
            remove_dom(document.getElementById('list_send'))
            remove_dom(document.getElementById('list_search'))
        }
        if(data.type === '客服用户') {
            remove_dom(document.getElementById('list_orders'))
        }
    })
    .catch(console.error)

function remove_dom(dom) {
    const parent = dom.parentElement
    parent.removeChild(dom)
}