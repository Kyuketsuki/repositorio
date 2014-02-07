function detectarColision()
{
	jugador = {x: parseInt(ladron.style.left), y: parseInt(ladron.style.top), width: parseInt(ladron.style.width), height: parseInt(ladron.style.height)};	//posicion del jugador
	
	for(i=0; i < numPolicias; i++)
	{
		policia = document.getElementById('policia'+i);	
		enemigo = {x: parseInt(policia.style.left), y: parseInt(policia.style.top), width: parseInt(policia.style.width), height: parseInt(policia.style.height)};	//posicion del enemigo
		colision = true;
		
		if (jugador.x + jugador.width < enemigo.x) {
			colision = false	//return false;	//sin colision
        }
        if (jugador.y + jugador.height < enemigo.y) {
			colision = false	//return false;
        }
        if (jugador.x > enemigo.x + enemigo.width) {
			colision = false	//return false;
        }
        if (jugador.y > enemigo.y + enemigo.height) {
            colision = false	//return false;
        }
     
		if(colision == true)
		{
			alert("Game Over");
			console.log("Game Over");
			reiniciar();
    	}	
   }
     //return true;	//colision
}

function robarDinero()
{
	if(dineroRobado == false)
	{
		if(ladron.style.top == dinero.style.top)
		{
			if(parseInt(ladron.style.left)+parseInt(ancho) >= parseInt(dinero.style.left) && dinero.style.left == paredDer)
			{
				console.log("dinero robado");
				dineroRobado = true;
				dinero.style.display = "none";
			}
			else if(parseInt(ladron.style.left) <= parseInt(dinero.style.left)+35 && dinero.style.left == paredIzq)
			{
				console.log("dinero robado");
				dineroRobado = true;
				dinero.style.display = "none";
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
			
			alert(texto);
			console.log(texto);
			reiniciar();
		}
	}
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
					
					//reproducir sonido alerta
					var danger = new Audio("sonidos/danger.mp3"); // buffers automatically when created
					var found = new Audio("sonidos/found.wav"); // buffers automatically when created
					danger.play();
					found.play();
					///
					 
					
					detenerLadron = true;
					moverPolicia();
					clearInterval(intervalDetectarLadron);							
					perseguir = setInterval(function(){perseguirLadron()},2000);
					
					
					if(detenerLadron == true)
					{
					prueba = setTimeout(function()
						{
							//tiempo de busqueda tras ser detectado
							detenerLadron = false;
							clearInterval(perseguir);
							intervalDetectarLadron = setInterval(function(){detectarLadron()}, 50);
							console.log("has despistado al policia");
							//parar musica
							found.pause();
							///

							//alert("has despistado al policia");
						},tiempoBusqueda);
					}
				}
			}									
		}
	}
}

function perseguirLadron()
{
	if(detenerLadron == true)
		moverPolicia();
}

function score()
{
	if(tiempo > 0)
	{
		tiempo -= 1;
		document.getElementById("tiempo").innerHTML = tiempo;
		aumentarPuntuacion();
	}
	else
	{
		clearTimeout(aumentarScore);
		console.log("game over");
		alert("game over");
		reiniciar();	
	}	
}		
function aumentarPuntuacion()
{
	aumentarScore = setTimeout(function(){score()},1000);
}
function reiniciar()
{	
	clearTimeout(aumentarScore);
	clearInterval(intervalDetectarLadron);
	clearInterval(colisiones);
	
	try
	{
	clearTimeout(prueba);
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
	inicializarJuego();
	
	for(i=0; i < numPolicias; i++)			
	{
		window['policia'+i];				//policia0, policia1...
		window['interval'+i];				//interval0, interval1...
		window['intervalEscalera'+i];		//intervalEscalera0, intervalEscalera1...
		window['usandoEscalera'+i] = -1;	//usandoEscalera0, usandoEscalera1...
	}
	
	form = document.getElementById('formulario');
	form.style.display = "none";
}