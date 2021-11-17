// 刷新 UI
fetch('/info/base/' + id)
    .then(response => response.json())
    .then(data0 => {
        console.log('用户类型：' + data0.type)
        if(data0.type === '快递员用户') {
            remove_dom(document.getElementById('list_no_trust'))
            remove_dom(document.getElementById('list_no_get'))
        }
        // 获取订单列表
        var order_link = '/order/user/' + id
        fetch(order_link)
            .then(response => response.json())
            .then(data => {
                var base_html = String.raw`
            <table class="order-table">
                <tr>
                    <td>
                        <i style="color: #bb0000;">{0}</i><br>
                        <i style="font-weight: bold;">发件地 - 收件地</i><br>
                        <i>{2}</i>
                    </td>
                    <td style="text-align: right;">
                        <a style="color: #bb0000;display: {5};" href="/order/index.html?id={1}" target="_blank">
                            <svg style="width: 15px;margin-top: -5px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                            查看订单详情
                        </a><br><br>
                        <a onclick="show_box(this)" data-type="{3}" data-order="{1}" style="display: {4}">更多操作</a><br>
                    </td>
                </tr>
            </table>`
                // 遍历处理订单
                for(var i in data) {
                    // 获取订单信息
                    var link = '/order/get/' + data[i] + '?id=' + id + '&token=' + cookie
                    fetch(link)
                        .then(response => response.json())
                        .then(data1 => {
                            var html = base_html
                            html = html.replace(new RegExp('\\{1\\}', "gm"), data1.order_id)
                            html = html.replace('{2}', data1.order_address.replace('/', ' - '))
                            html = html.replace('{0}', data1.order_id + ' - ' + data1.order_status)
                            html = html.replace('{3}', data1.order_status)
                            if(data0.type === '快递员用户') {
                                html = html.replace('{4}', (data1.order_status === '已完成' || data1.order_status === '未签收') ? 'none' : 'block')
                            } else {
                                html = html.replace('{4}', data1.order_status === '已完成' ? 'none' : 'block')
                            }
                            html = html.replace(new RegExp('\\{5\\}', "gm"), data0.type === '快递员用户' ? 'none' : 'block')

                            var e = document.createElement('div')
                            e.innerHTML = html
                            if(data0.type === '快递员用户') {
                                switch (data1.order_status) {
                                    case '未发货': {
                                        document.getElementById('list_no_start').append(e)
                                        break
                                    }
                                    case '运输中': {
                                        document.getElementById('list_in_run').append(e)
                                        break
                                    }
                                    case '未签收':
                                    case '已完成': {
                                        document.getElementById('list_end').append(e)
                                        break
                                    }
                                }
                            } else {
                                switch (data1.order_status) {
                                    case '未确认': {
                                        document.getElementById('list_no_trust').append(e)
                                        break
                                    }
                                    case '未发货': {
                                        document.getElementById('list_no_start').append(e)
                                        break
                                    }
                                    case '运输中': {
                                        document.getElementById('list_in_run').append(e)
                                        break
                                    }
                                    case '未签收': {
                                        document.getElementById('list_no_get').append(e)
                                        break
                                    }
                                    case '已完成': {
                                        document.getElementById('list_end').append(e)
                                        break
                                    }
                                }
                            }
                        })
                        .catch(console.error)
                }
            })
            .catch(console.error)
    })
    .catch(console.error)

function close_pop(sender) {
    var name = sender.dataset.name
    document.getElementById(name).style.display = 'none'
}

function confirm_order(sender) {
    window.location.href = '/order/confirm.html?id=' + sender.dataset.order
}

function cancel_order(sender) {
    var httpRequest = new XMLHttpRequest()
    httpRequest.open('POST', '/order/cancel/' + sender.dataset.order, true)
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httpRequest.send('user_id=' + id + '&user_token=' + cookie)
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var json = httpRequest.responseText
            var jobj = JSON.parse(json)
            console.log('取消运单：' + jobj.message)
            if(jobj.message === '操作成功！') {
                document.getElementById('orderDefUser').style.display = 'none'
                location.reload();
            } else {
                document.getElementById('alert-err').innerText = jobj.message
                document.getElementById('alert-err').style.display = 'block'
            }
        }
    };
}

function show_page(sender, is_sender = false) {
    if(!is_sender) {
        window.open('/order/make.html?id=' + sender.dataset.order, '_blank')
    } else {
        window.open('/order/make.html?id=' + sender.dataset.order + '&sender=true', '_blank')
    }
}

function ok_order(sender) {
    var httpRequest = new XMLHttpRequest()
    httpRequest.open('POST', '/order/receive/' + sender.dataset.order, true)
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httpRequest.send('user_id=' + id + '&user_token=' + cookie)
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var json = httpRequest.responseText
            var jobj = JSON.parse(json)
            console.log('确认运单：' + jobj.message)
            if(jobj.message === '操作成功！') {
                document.getElementById('orderDefUser').style.display = 'none'
                location.reload();
            } else {
                document.getElementById('alert-err').innerText = jobj.message
                document.getElementById('alert-err').style.display = 'block'
            }
        }
    };
}

function next_order(sender) {
    var httpRequest = new XMLHttpRequest()
    httpRequest.open('POST', '/order/next/' + sender.dataset.order, true)
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httpRequest.send('user_id=' + id + '&user_token=' + cookie)
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var json = httpRequest.responseText
            var jobj = JSON.parse(json)
            console.log('下一步运单：' + jobj.message)
            if(jobj.message === '操作成功！') {
                document.getElementById('orderDefUser').style.display = 'none'
                location.reload();
            } else {
                document.getElementById('alert-err-sender').innerText = jobj.message
                document.getElementById('alert-err-sender').style.display = 'block'
            }
        }
    };
}

function show_box(sender) {
    var type = sender.dataset.type
    var order = sender.dataset.order
    fetch('/info/base/' + id)
        .then(response => response.json())
        .then(data0 => {
            console.log('用户类型：' + data0.type)
            if(data0.type === '快递员用户') {
                document.getElementById('orderSenderUser').style.display = 'flex'
                document.getElementById('print-sender').dataset.order = order
                document.getElementById('next').dataset.order = order
            } else {
                // 恢复显示
                document.getElementById('trust').style.display = 'block'
                document.getElementById('cancel').style.display = 'block'
                document.getElementById('print').style.display = 'block'
                document.getElementById('okey').style.display = 'block'
                // 处理不同情况
                switch (type) {
                    case '未确认': {
                        document.getElementById('okey').style.display = 'none'
                        document.getElementById('print').style.display = 'none'
                        document.getElementById('trust').dataset.order = order
                        document.getElementById('cancel').dataset.order = order
                        break
                    }
                    case '未发货': {
                        document.getElementById('okey').style.display = 'none'
                        document.getElementById('trust').style.display = 'none'
                        document.getElementById('cancel').style.display = 'none'
                        document.getElementById('print').dataset.order = order
                        break
                    }
                    case '运输中': {
                        document.getElementById('okey').style.display = 'none'
                        document.getElementById('trust').style.display = 'none'
                        document.getElementById('cancel').style.display = 'none'
                        document.getElementById('print').dataset.order = order
                        break
                    }
                    case '未签收': {
                        document.getElementById('trust').style.display = 'none'
                        document.getElementById('cancel').style.display = 'none'
                        document.getElementById('print').dataset.order = order
                        document.getElementById('okey').dataset.order = order
                        break
                    }
                }
                document.getElementById('orderDefUser').style.display = 'flex'
            }
        })
        .catch(console.error)
}