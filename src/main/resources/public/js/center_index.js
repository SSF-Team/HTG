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

// 刷新 UI
fetch('/info/base/' + id)
    .then(response => response.json())
    .then(data => {
        console.log('用户类型：' + data.type)
        if(data.type !== '普通用户') {
            remove_dom(document.getElementById('new_card'))
        }
    })
    .catch(console.error)