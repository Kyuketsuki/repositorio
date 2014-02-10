function detectarColision()
{
	jugador = {x: parseInt(ladron.style.left), y: parseInt(ladron.style.top), width: parseInt(ladron.style.width), height: parseInt(ladron.style.height)};	//posicion del jugador
	
	for(i=0; i < numPolicias; i++)
	{
		policia = document.getElementById('policia'+i);	
		enemigo = {x: parseInt(policia.style.left), y: parseInt(policia.style.top), width: parseInt(policia.style.width), height: parseInt(policia.style.height)};	//posicion del enemigo
		colision = true;		//inicializa la colision
		
		if (jugador.x + jugador.width < enemigo.x) {
			colision = false	//sin colision
        }
        if (jugador.y + jugador.height < enemigo.y) {
			colision = false	//sin colision
        }
        if (jugador.x > enemigo.x + enemigo.width) {
			colision = false	//sin colision
        }
        if (jugador.y > enemigo.y + enemigo.height) {
            colision = false	//sin colision
        }
     
		if(colision == true)	//fin de la partida
		{
			if(efectos == true)
				gameover.play();
			if(musica == true)
			{
				inicio.pause();
				danger.pause();
				bennyhill.pause();
			}
		
			alert("Game Over");
			console.log("Game Over");
			reiniciar();	//reinicia partida
    	}	
   }
}

function robarDinero()
{
	if(dineroRobado == false)
	{
		if(ladron.style.top == dinero.style.top)
		{
			//comprobar si el jugador esta en la ubicacion del dinero
			if(parseInt(ladron.style.left)+parseInt(ancho) >= parseInt(dinero.style.left) && dinero.style.left == paredDer)
			{
				console.log("dinero robado");
				dineroRobado = true;
				dinero.style.display = "none";
				
				if(efectos == true)
					itemfound.play();
			}
			else if(parseInt(ladron.style.left) <= parseInt(dinero.style.left)+35 && dinero.style.left == paredIzq)
			{
				console.log("dinero robado");
				dineroRobado = true;
				dinero.style.display = "none";
				
				if(efectos == true)
					itemfound.play();
			}
		}
	}
}

function victoria()
{
	if(dineroRobado == true)
	{
		if(parseInt(ladron.style.top) + parseInt(alto) - 5 == parseInt(salida.style.top) && ladron.style.left == salida.style.left)
		{
			texto = "Victoria.";
			if (detenerLadron == false)
			{
				texto += " Recibes mas puntos por no haber sido detectado.";
				puntuacion = tiempo*2;
			}
			else
			{			
				puntuacion = tiempo;
			}
			//aumentar puntos por dificultad
			texto += " Recibes puntos segun la dificultad.";
			puntuacion = puntuacion * numPolicias;
			
			texto += " Tu puntuacion total es de: " + puntuacion;
			
			if(efectos == true)
				win.play();
			if(musica == true)
			{
				inicio.pause();
				danger.pause();
				bennyhill.pause();
			}
			
			if(usuarioActivo != null)
				cookie(puntuacion);		//crear cookie	
			
			alert(texto);
			console.log(texto);
			reiniciar();
		}
	}
}
function cookie(puntuacion)
{
	var date = new Date();
	date.setTime(date.getTime() + 1*24*60*60*1000); 	//tiempo de expiracion: 1 dia
	document.cookie=usuarioActivo+puntuacion + '=' + puntuacion + '; ' + date;
}

function mostrarOpciones()
{
	form = document.getElementById('formulario');
	form.style.display = "";
}

function detectarLadron()
{
	for(i=0; i < numPolicias; i++)
	{
		policia = document.getElementById('policia'+i);
		
		if(policia.style.top == ladron.style.top && detenerLadron == false)
		{
			if(policia.style.top == piso1 || policia.style.top == piso2 || policia.style.top == piso3)
			{
				if(Math.abs(parseInt(policia.style.left)-parseInt(ladron.style.left)) < rangoVision)
				{
					console.log("ladron detectado");
					
					if(efectos == true)
						found.play();	//reproducir sonido alerta
					
					if(danger.paused == true && bennyhill.paused == true)	//si no se estan reproduciendo se reproduce una al azar y para la cancion de inicio
					{
						random = Math.floor((Math.random() * 2));
						
						if(random == 0 && musica == true)
						{
							inicio.pause();
							danger.play();
						}
						else if(musica == true)
						{
							inicio.pause();
							bennyhill.play();
						}
					}

					detenerLadron = true;
					moverPolicia();
					clearInterval(intervalDetectarLadron);							
					perseguir = setInterval(function(){perseguirLadron()},2000);
					
					if(detenerLadron == true)
					{
					detectar = setTimeout(function()
						{
							//tiempo de busqueda tras ser detectado
							//da la posibilidad de esquivar al policia y que deje de buscarte
							detenerLadron = false;
							clearInterval(perseguir);
							intervalDetectarLadron = setInterval(function(){detectarLadron()}, 50);
							console.log("has despistado al policia");
						},tiempoBusqueda);
					}
				}
			}									
		}
	}
}

function perseguirLadron()
{
	//se le llama desde un intervalo para que no pueda engañar al policia
	//por ejemplo si justo al ser detectado se sube una escalera
	//el policia rectifica la ruta para subir las escaleras
	if(detenerLadron == true)
		moverPolicia();		
}

function score()
{
	if(tiempo > 0)
	{
		//reduce el tiempo cada segundo
		tiempo -= 1;
		document.getElementById("tiempo").innerHTML = tiempo;
		aumentarPuntuacion();
	}
	else
	{
		//se acabo el tiempo
		clearTimeout(aumentarScore);
		
		if(efectos == true)
			gameover.play();
		
		if(musica == true)
		{
			inicio.pause();
			danger.pause();
			bennyhill.pause();
		}
				
		console.log("game over");
		alert("game over");
		reiniciar();	
	}	
}		
function aumentarPuntuacion()
{
	aumentarScore = setTimeout(function(){score()},1000);	//cada segundo ejecuta score()
}
function reiniciar()
{	
	//reiniciar intervalos, variables, musica, etc para volver a iniciar la partida
	clearTimeout(aumentarScore);
	clearInterval(intervalDetectarLadron);
	clearInterval(colisiones);
	
	try
	{
		clearTimeout(detectar);
		clearInterval(perseguir);	
	}
	catch(ex)	
	{}
	
	eliminarPolicia()
	detenerLadron = false;
	dineroRobado = false;
	dinero.style.display = "";
	
	numPolicias = parseInt(document.getElementById('numeroPolicias').value);
	rangoVision = parseInt(document.getElementById('rangoVisionPolicias').value);
	velocidad = parseInt(document.getElementById('velocidadMovimiento').value);
	tiempo = parseInt(document.getElementById('tiempoRestante').value);
	detectarColisiones = Boolean(parseInt(document.getElementById('detectarColisiones').value));
	detectarLadrones = Boolean(parseInt(document.getElementById('detectarLadrones').value));
	tiempoBusqueda = parseInt(document.getElementById('tiempoBusqueda').value) * 1000;
	musica = Boolean(parseInt(document.getElementById('musica').value));
	efectos = Boolean(parseInt(document.getElementById('efectos').value));
	
	if(efectos == true)
	{
		win.pause();
		win.currentTime = 0;
	}
	if(musica == true)
	{
		danger.pause();
		danger.currentTime = 0;
		bennyhill.pause();
		bennyhill.currentTime = 0;
		inicio.pause();
		inicio.currentTime = 0;
		inicio.play();
	}
	else
	{
		inicio.pause();
		inicio.currentTime = 0;
	}
	
	inicializarJuego();
	
	for(i=0; i < numPolicias; i++)			//reiniciar variables	
	{
		window['policia'+i];				//policia0, policia1...
		window['interval'+i];				//interval0, interval1...
		window['intervalEscalera'+i];		//intervalEscalera0, intervalEscalera1...
		window['usandoEscalera'+i] = -1;	//usandoEscalera0, usandoEscalera1...
	}
	
	form = document.getElementById('formulario');
	form.style.display = "none";
}
function eliminarPolicia()
{
	//borra los policias al reiniciar la partida
	for(i=0; i < numPolicias; i++)
	{
		policia = document.getElementById('policia');
		policia.removeChild(policia.firstChild);
	}
}