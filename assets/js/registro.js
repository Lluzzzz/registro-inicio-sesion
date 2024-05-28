
document.getElementById('registro-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const fechaNacimiento = document.getElementById('fecha').value;

    const primeraLetraNombre = nombre.split(' ').map(n => n.charAt(0).toLowerCase()).join('');
    const apellidos = apellido.split(' ');
    const primerApellido = apellidos[0] || '';
    const segundoApellido = apellidos[1] || '';
    const dosSiguientesSegundoApellido = segundoApellido.slice(1, 3).toLowerCase();
    const ultimasTresPrimerApellido = primerApellido.slice(-3).toLowerCase();
    const ultimasDosDelAnio = fechaNacimiento.slice(2, 4);
    const mes = fechaNacimiento.slice(5, 7);
    const dia = fechaNacimiento.slice(8, 10);

    const correoElectronico = `${primeraLetraNombre}${dosSiguientesSegundoApellido}${ultimasTresPrimerApellido}${ultimasDosDelAnio}${dia}${mes}@gmail.com`;

    // Generar la contraseña
    const password = generarContrasena(primerApellido, fechaNacimiento);

    // Guardar el usuario
    registrarUsuario(correoElectronico, password);

    document.getElementById('res').innerHTML = `<p>Su gmail es: ${correoElectronico}</p><p>Su contraseña es: ${password}</p>`;
});

function generarContrasena(primerApellido, fechaNacimiento) {
    const primeraLetraPrimerApellido = primerApellido.charAt(0).toLowerCase();
    const anio = fechaNacimiento.slice(0, 4);
    const mes = fechaNacimiento.slice(5, 7);
    const dia = fechaNacimiento.slice(8, 10);

    return `${primeraLetraPrimerApellido}${dia}${mes}${anio}`;
}

function registrarUsuario(email, password) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.some(usuario => usuario.email === email)) {
        alert('El usuario ya está registrado.');
        return false;
    }

    usuarios.push({ email: email, password: password });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado con éxito.');
    return true;
}

function registrarse() {
    window.location.href = "inicio.html";
}


let intentosFallidos = 0;

function autenticarUsuario(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los valores del formulario
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Verificar si el usuario y la contraseña son correctos
    if (username.toLowerCase() === 'invitado' && password === '12345') {
        alert('Inicio de sesión exitoso: BIENVENIDO');
        intentosFallidos = 0;
        window.location.href = 'index.html';
    } else {
        intentosFallidos++;
        alert('Usuario o contraseña incorrectos');
        if (intentosFallidos >= 3) {
            alert('Acceso denegado\nDemasiados intentos fallidos');
        } else {
            alert('Usuario o contraseña incorrectos\nIntento ' + intentosFallidos + ' de 3');
        }
    }
}

// Evento para manejar el envío del formulario de inicio de sesión
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', autenticarUsuario);
});


