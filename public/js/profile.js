var ReqUser = window.location.href.split('/')[window.location.href.split('/').length - 1];
var crrUser = undefined;

function init() {
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var email = document.getElementById('email');
    var username = document.getElementById('username');
    var gender = document.getElementById('gender');
    var user_ = window.location.href.split('/')[window.location.href.split('/').length - 1];
    fetch('/api/users/' + user_).then(function(response) {
        if (response.status == 200) {
            response.text().then(function(message) {
                message = JSON.parse(message);
                firstname.innerText = "firstname : " + message['firstname'];
                lastname.innerText = "lastname : " + message['lastname'];
                username.innerText = "username : " + message['username'];
                email.innerText = "email : " + message['email'];
                gender.innerText = "gender : " + message['gender'];
                fetch('/api/auth/me', {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'x-access-token': localStorage['x-access-token']
                    })
                }).then(function(response) {
                    response.text().then(function(user) {
                        user = JSON.parse(user);
                        crrUser = user;
                        if (user.username == message.username) {
                            password.style.display = "block";
                            password.disabled = false;
                            edit.style.display = "block";
                            edit.disabled = false;
                        }
                        if (user.username) {
                            var huser = document.getElementById('huser');
                            huser.href = '/profile/' + user.username;
                            huser.style.display = "block";
                        }
                    });
                })
            });
        } else {
            firstname.innerText = 'No User Found';
        }
    });
}



window.onload = init();


document.getElementById('edit').onclick = function() {

    if (crrUser.username != ReqUser)
        return;
    document.getElementById('fname').value = crrUser.firstname;
    document.getElementById('lname').value = crrUser.lastname;
    document.getElementById('memail').value = crrUser.email;
    document.getElementById('mgender').value = crrUser.gender;
    document.getElementById('id01').style.display = 'block'
}

document.getElementById('password').onclick = function() {

    if (crrUser.username != ReqUser)
        return;
    document.getElementById('id02').style.display = 'block'
}

window.onclick = function(event) {
    var modal = document.getElementById('id01');
    var mod = document.getElementById('id02');
    if (event.target == modal || event.target == mod) {
        var msg_disp = window.document.getElementById('msg_1');
        msg_disp.innerHTML = ' ';
        modal.style.display = "none";
        mod.style.display = "none";
    }
}

document.getElementById('fsubmit').onclick = function() {
    firstname = document.getElementById('fname').value;
    lastname = document.getElementById('lname').value;
    email = document.getElementById('memail').value;
    gender = document.getElementById('mgender').value;
    if (firstname.length > 0 && email.length > 0) {
        fetch('/api/users/update/' + crrUser.username, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage['x-access-token']
            }),
            body: 'firstname=' + encodeURIComponent(firstname) + '&lastname=' + encodeURIComponent(lastname) + '&email=' + encodeURIComponent(email) + '&gender=' + encodeURIComponent(gender)
        }).then(function(response) {
            response.text().then(function(message) {
                document.getElementById('msg_1').innerText = message;
                if (message == 'updated-successfully')
                    setInterval(function() {
                        location.reload();
                    }, 1000);
            });
        });
    } else {
        document.getElementById('msg_1').innerText = 'Firstname and email cannot be empty';
    }
}

document.getElementById('fpsubmit').onclick = function() {
    password = document.getElementById('fopass').value;
    npass = document.getElementById('fnpass').value;
    if (password.length > 0 && npass.length > 0) {
        console.log("YUP");
        fetch('/api/users/updatepass/' + crrUser.username, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage['x-access-token']
            }),
            body: 'password=' + encodeURI(password) + '&npass=' + encodeURI(npass)
        }).then(function(response) {
            response.text().then(function(message) {
                document.getElementById('msg_2').innerText = message;
                if (message == 'updated-successfully')
                    setInterval(function() {
                        location.reload();
                    }, 1000);
            });
        });
    } else {
        document.getElementById('msg_1').innerText = 'Firstname and email cannot be empty';
    }
}