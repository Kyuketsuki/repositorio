function nuevoUsuario()
{
	var usuario = document.getElementById('usuario');
	usuario.style.display = "";		//mostrar el div usuario
	
	var login = document.getElementById('login');
	login.style.display = "none";	//ocultar el div login
}
function guardarNuevoUsuario()
{
	var usuario = document.getElementById('usuario');
	usuario.style.display = 'none';	//ocultar el div usuario
	
	var nombre = document.getElementById('nombreUsuario').value;
	var password = document.getElementById('passwordUsuario').value;
	
	if(nombre != "" && password != "")
	{
		var user = [nombre,password];
		arrayUsuarios.push(user);		//guardar el usuario
	}
}

function loginUsuario()
{
	var login = document.getElementById('login');
	login.style.display = "";		//mostrar el div login
	
	var usuario = document.getElementById('usuario');
	usuario.style.display = "none";	//ocultar el div usuario
}
function iniciarUsuario()
{
	var login = document.getElementById('login');
	login.style.display = 'none';	//ocultar el div login
	
	var nombre = document.getElementById('loginUsuario').value;
	var password = document.getElementById('loginPassword').value;
		
	for(i=0; i < arrayUsuarios.length; i++)		//comprueba que el usuario exista
	{
		if(arrayUsuarios[i][0] == nombre && arrayUsuarios[i][1] == password)
		{
			var sesion = document.getElementById('sesionUsuario');
			usuarioActivo = arrayUsuarios[i][0];
			sesion.innerHTML = 'Bienvenido ' + usuarioActivo;
			
			var btnLogout = document.getElementById('btnLogout');
			btnLogout.style.display = "";
			var btnLogin = document.getElementById('btnLogin');
			btnLogin.style.display = "none";
			
			var enlacePuntuaciones = document.getElementById('enlacePuntuaciones');
			enlacePuntuaciones.style.display = "";		//mostrar el enlace de puntuaciones
		}
	}
}

function logoutUsuario()
{
	usuarioActivo = null;
	
	var sesion = document.getElementById('sesionUsuario');
	sesion.innerHTML = "";
			
	var btnLogout = document.getElementById('btnLogout');
	btnLogout.style.display = "none";
	
	var btnLogin = document.getElementById('btnLogin');
	btnLogin.style.display = "";
	
	var enlacePuntuaciones = document.getElementById('enlacePuntuaciones');
	enlacePuntuaciones.style.display = "none";		//ocultar el enlace de puntuaciones
	div = document.getElementById('puntuaciones');
	div.innerHTML = "";
}