let host = 'localhost';
let port = '8001';
let api = 'http://' + host + ':' + port + '/api/';

let Store = require('electron-store');
let storage = new Store();

let Swal = require('sweetalert2');

let { ipcRenderer } = require('electron');

let auth_error = 'Incorrect username or password';
let auth_empty = 'Please enter a username and password';

function authenticate() {
    $('#loading').append(
        `<div id="load"><form id="account"><div class="form-group"><input type="text" placeholder="Username" name="username" class="form-control"></div>
        <div class="form-group"><input type="password" placeholder="Password" name="password" class="form-control"></div>
        <div class="form-group"><input type="submit" class="btn btn-block btn-default" value="Login"></div></form>`
    );
}


$('body').on("submit", "#account", function (e) {
    e.preventDefault();
    let formData = $(this).serializeObject();

    if (formData.username == "" || formData.password == "") {

        Swal.fire(
            'Incomplete form!',
            auth_empty,
            'warning'
        );
    }
    else {

        $.ajax({
            url: api + 'users/login',
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json; charset=utf-8',
            cache: false,
            processData: false,
            success: function (data) {
                if (data._id) {
                    storage.set('auth', { auth: true });
                    storage.set('user', data);
                    ipcRenderer.send('app-reload', '');
                }
                else {
                    Swal.fire(
                        'Oops!',
                        auth_error,
                        'warning'
                    );
                }

            }, error: function (data) {
                console.log(data);
            }
        });
    }
});

module.exports = {
    authenticate
}