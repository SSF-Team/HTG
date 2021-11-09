// 验证登录
let id = null
let cookie = null
const cookies = document.cookie
const cookie_list = cookies.split(";")
let save = ""
cookie_list.forEach(function(element){
    if(element.indexOf("id") || element.indexOf("token")) {
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
            console.log("登录验证：" + httpRequest.responseText)
            if(httpRequest.responseText.indexOf("200") <= 0) {
                // 跳回主页登录区域
                window.location.replace("/#logistics_inf?type=login_fail");
            }
        }
    };
} else {
    // 跳回主页登录区域
    window.location.replace("/#logistics_inf?type=no_login");
}