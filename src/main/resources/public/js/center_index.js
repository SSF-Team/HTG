// 刷新 UI
fetch('/info/base/' + id)
    .then(response => response.json())
    .then(data1 => {
        console.log('用户类型：' + data1.type)
        if(data1.type !== '普通用户') {
            remove_dom(document.getElementById('new_card'))
        }
        if(data1.type === '客服用户') {
            document.getElementById('gd-title').innerText = "待处理的工单"
            remove_dom(document.getElementById('send-work'))
        }
        // 加载工单
        fetch('/work/user/' + id)
            .then(response => response.json())
            .then(data => {
                var base_html = String.raw`
                <i>{1}</i>
                <i>{2}</i>
                <div style="clear: both;display: block;"></div>`
                for(var i in data) {
                    if(data1.type === '客服用户' && data[i].work_back !== undefined) {
                        continue
                    }
                    var html = base_html
                    const title = data[i].work_title
                    const content = data[i].work_content === undefined ? '' : data[i].work_content
                    let statue = data[i].work_back === undefined ? '已提交' : '已回复'
                    if(data1.type === '客服用户') {
                        statue = data[i].work_back === undefined ? '待处理' : '已回复'
                    }
                    const back = data[i].work_back

                    html = html.replace('{1}', title)
                    html = html.replace('{2}', statue)

                    var e = document.createElement('div')
                    if(data1.type === '客服用户') {
                        e.classList.add('mine-work-s')
                        e.setAttribute("onclick", "javascript:show_cl_order(this);")
                        e.dataset.id = data[i].work_id
                    } else {
                        e.classList.add('mine-work')
                        e.setAttribute("onclick", "javascript:show_work_info(this);")
                    }
                    e.dataset.title = title
                    e.dataset.content = content
                    e.dataset.back = back
                    e.innerHTML = html
                    document.getElementById('work-list').append(e)
                }
            })
            .catch(console.error)
    })
    .catch(console.error)

// 获取头像和用户名
if(id != null) {
    fetch('/info/base/' + id)
        .then(response => response.json())
        .then(data => {
            const name = document.getElementById('user-name')
            name.innerText = data.first_name + " " + data.last_name
            const head = document.getElementById('user-head')
            head.src = data.pic_link
        })
        .catch(console.error)
}

function new_work() {
    var title = document.getElementById('work_title').value
    var input = document.getElementById('work_input').value
    var order = document.getElementById('work_order').value === '' ? document.getElementById('work_order').value : 'null'
    fetch('/work/new?user_id=' + id + '&user_token=' + cookie + '&title=' + title + '&content=' + input +
        '&order_id=' + order)
        .then(response => response.json())
        .then(data => {
            console.log('新建工单：' + data.message)
            if(data.code !== 200) {
                document.getElementById('word-err-alert').innerText = data.message
                document.getElementById('word-err-alert').style.display = 'block'
            }
        })
        .catch(console.error)
}

function show_work_info(sender) {
    document.getElementById('workDefUser').style.display = 'flex'
    document.getElementById('def-work-title').innerText = sender.dataset.title
    document.getElementById('def-work-main').innerText = sender.dataset.content === undefined ? '' : sender.dataset.content
    if(sender.dataset.back === 'undefined') {
        document.getElementById('def-work-back').style.display = 'none'
    } else {
        document.getElementById('def-work-back').style.display = 'block'
        document.getElementById('def-work-back').innerText = '客服回复：' + sender.dataset.back
    }
}

function show_cl_order(sender) {
    document.getElementById('workSevUser').style.display = 'flex'
    document.getElementById('def-work-title-sev').innerText = sender.dataset.title
    document.getElementById('def-work-main-sev').innerText = sender.dataset.content === undefined ? '' : sender.dataset.content

    document.getElementById('back-work-info').dataset.id = sender.dataset.id
}

function close_pop(sender) {
    var name = sender.dataset.name
    document.getElementById(name).style.display = 'none'
}

function back_work() {
    var work_id = document.getElementById('back-work-info').dataset.id
    var back = document.getElementById('back-work-info').value
    fetch('/work/back/' + work_id + '?user_id=' + id + '&user_token=' + cookie + '&back=' + back)
        .then(response => response.json())
        .then(data => {
            console.log('回复工单：' + data.message)
            if(data.code !== 200) {

            } else {
                document.getElementById('workSevUser').style.display = 'none'
                location.reload();
            }
        })
        .catch(console.error)
}