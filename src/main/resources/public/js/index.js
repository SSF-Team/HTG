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

function reg() {
    // user_last_name=Steve
    // user_first_name=Stapx
    // user_email=stapx@qq.com
    // user_password=123
    // user_phone=12345678901
    var last = document.getElementById('last_name-reg').value
    var fist = document.getElementById('fist_name-reg').value
    var password = document.getElementById('password-reg').value
    var email = document.getElementById('mail_reg').value
    var phone = document.getElementById('phone_reg').value
    fetch("/register?user_last_name=" + last + "&user_first_name=" + fist + '&user_email=' + email + '&user_password=' + password + "&user_phone=" + phone)
        .then(response => response.json())
        .then(data => {
            document.getElementById('reg_err_msg').style.visibility = "visible"
            document.getElementById('reg_err_msg_txt').innerText = data.message
        })
        .catch(console.error)
}