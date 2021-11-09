// 获取头像和用户名
if(id != null) {
    fetch('/info/base?id=' + id)
        .then(response => response.json())
        .then(data => {
            const name = document.getElementById('user-name')
            name.innerText = data.name
            const head = document.getElementById('user-head')
            head.src = data.pic_link
        })
        .catch(console.error)
}