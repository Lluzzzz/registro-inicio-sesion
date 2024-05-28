

let intentosFallidos = 0;

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username === 'invitado' && password === '12345') {
        alert('Inicio de sesión exitoso: BIENVENIDO');
        intentosFallidos = 0;
        window.location.href = 'index.html'; 
    } else {
        intentosFallidos++;
        alert('Usuario o contraseña incorrectos');
        if (intentosFallidos >= 3) {
            alert('Acceso denegado\nDemasiados intentos fallidos');
            alert('Acceso bloqueado');
        } else {
            alert('Usuario o contraseña incorrectos\nIntento ' + intentosFallidos + ' de 3');
        }
    }
});
