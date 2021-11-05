function login() {
    var mail = document.getElementById('mail').value
    var password = document.getElementById('password').value
    fetch("/login?mail=" + mail + "&password=" + password)
        .then(response => response.json())
        .then(data => {
            if(data.code === 200) {
                document.getElementById('login_err_msg').style.visibility = "hidden"
                var dateTime = new Date()
                dateTime = dateTime.setDate(dateTime.getDate() + 5)
                dateTime = new Date(dateTime)
                document.cookie = "token=" + data.message.split('|')[0] + "; expires=" + dateTime.toString() + "; path=/";
                document.cookie = "id=" + data.message.split('|')[1] + "; expires=" + dateTime.toString() + "; path=/";
                window.location.replace("/center/index.html");
            } else {
                document.getElementById('login_err_msg').style.visibility = "visible"
                document.getElementById('err_msg_txt').innerText = data.message
            }
        })
        .catch(console.error)
}