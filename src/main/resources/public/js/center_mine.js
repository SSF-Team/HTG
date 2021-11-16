// 获取订单列表
fetch('/order/user/' + id)
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
                        <a style="color: #bb0000;" href="/order/index.html?id={1}" target="_blank">
                            <svg style="width: 15px;margin-top: -5px;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                            查看订单详情
                        </a><br><br>
                        <a onclick="show_box('{1}')">更多操作</a><br>
                    </td>
                </tr>
            </table>`
        // 遍历处理订单
        for(var i in data) {
            console.log(data[i])
            // 获取订单信息
            var link = '/order/get/' + data[i] + '?id=' + id + '&token=' + cookie
            fetch(link)
                .then(response => response.json())
                .then(data1 => {
                    var html = base_html
                    html = html.replace(new RegExp('\\{1\\}', "gm"), data1.order_id)
                    html = html.replace('{2}', data1.order_address.replace('/', ' - '))
                    html = html.replace('{0}', data1.order_id + ' - ' + data1.order_status)
                    var e = document.createElement('div')
                    e.innerHTML = html
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
                })
                .catch(console.error)
        }
    })
    .catch(console.error)