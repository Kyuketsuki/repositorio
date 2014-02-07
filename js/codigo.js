	var piso1 = '550px';		//ubicacion del suelo de los pisos
	var piso2 = '350px';
	var piso3 = '150px';
	var paredIzq = '10px';		//ubicacion de las paredes
	var paredDer = '950px';
	
	var ancho = '25px';			//ancho y alto de los personajes
	var alto = '35px';

	//var animacionPolicia = 0; //seleccionar imagen del sprite para animacion
	//var animacionLadron = 0; //seleccionar imagen del sprite para animacion
	
	var dineroRobado = false;
	var jugador;	//objetos que almacenan la ubicacion del jugador,
	var enemigo;	//del enemigo y el area que ocupan
	var escaleras = new Array();
	
	//movimientos permitidos
	var moverIzquierda = true;
	var moverDerecha = true;
	var moverArriba = false;
	var moverAbajo = false;
	///
	//div del html
	var numPolicias = 1;	//maximo 3
	//var numEscaleras = 4;	//minimo 3?
	var policias = new Array;
	var ladron;
	var tiempo = 120;
	var puntuacion = 0;
	var tiempoBusqueda = 5000;
	
	for(i=0; i < numPolicias; i++)			//escalera0, escalera1
		window['escalera'+i];
	
		
	var detectarColisiones = true;
	var detectarLadrones = true;
	var intervalDetectarLadron;



function inicializarJuego()
{
	window.document.addEventListener("keydown", teclado, false);
	
	inicializarJugador();
	inicializarDinero();
	inicializarSalida();
	inicializarEnemigo();
	inicializarEscaleras();
	inicializarIA();
	inicializarIntervalos();
	inicializarPuntuacion();
}

	function inicializarJugador()
	{
		ladron = document.getElementById('ladron');
		ladron.className = 'ladron spriteD-2';
		ladron.style.width = ancho;
		ladron.style.height = alto;
		ladron.style.left = paredIzq;
		ladron.style.top = piso1;
	}
	
	function inicializarDinero()
	{
		dinero = document.getElementById('dinero');
		dinero.style.top = piso3;

		random = Math.floor((Math.random() * 2));
		if(random == 0)
			dinero.style.left = paredDer;
		else
			dinero.style.left = paredIzq;
	}
	
	function inicializarSalida()
	{
		salida = document.getElementById('salida');
		salida.style.width = ancho;
		salida.style.height = '5px';
		salida.style.top = parseInt(piso1) + parseInt(alto) - 5 + 'px';
		
		random = Math.floor((Math.random() * 2));
		if(random == 0)
			salida.style.left = paredIzq;
		else
			salida.style.left = paredDer;
	}
	
	function inicializarEnemigo()
	{	
		crearPolicia();
	}
	
	function crearPolicia()
	{
		for(i=0; i < numPolicias; i++)
		{
			policia = document.getElementById('policia');
			policias[i] = document.createElement("div");
			policias[i].id = 'policia' + i;
			policias[i].className = 'policia spriteI-2';
			policias[i].style.width = ancho;
			policias[i].style.height = alto;
			policias[i].style.left = paredDer;
			policias[i].style.top = piso3;
			policia.appendChild(policias[i]);		
		}
	}
	function eliminarPolicia()
	{
		for(i=0; i < numPolicias; i++)
		{
			policia = document.getElementById('policia');
			policia.removeChild(policia.firstChild);
		}
	}
	
	
	function inicializarEscaleras()
	{
		//generar ubicacion aleatoria (100, 300, 600, 850)
		ubicacionEscaleras = new Array;
		ubicacionEscaleras[0] = '100px';
		ubicacionEscaleras[1] = '300px';
		ubicacionEscaleras[2] = '600px';
		ubicacionEscaleras[3] = '850px';
		
		arrayAleatorio = new Array;
		for(i=0;i < ubicacionEscaleras.length; i++)
		{
			random = Math.floor((Math.random() * 4));	//0,1,2,3
			repetido = false;
			for(j=0;j < arrayAleatorio.length; j++)
			{
				if(arrayAleatorio[j] == random)
					repetido = true;
			}
			if(repetido == false)
				arrayAleatorio[i] = random;
			else
				i--;
		}

		escalera0 = document.getElementById('escalera0');	//escalera del piso 2-3
		escalera0.style.width = ancho;
		escalera0.style.height = '200px';
		escalera0.style.left = ubicacionEscaleras[arrayAleatorio[0]];
		escalera0.style.top = parseInt(piso3) + parseInt(alto) + 'px';
		
		escalera1 = document.getElementById('escalera1');	//escalera del piso 2-3
		escalera1.style.width = ancho;
		escalera1.style.height = '200px';
		escalera1.style.left = ubicacionEscaleras[arrayAleatorio[1]];
		escalera1.style.top = parseInt(piso3) + parseInt(alto) + 'px';
		
		escalera2 = document.getElementById('escalera2');	//escalera del piso 1-2
		escalera2.style.width = ancho;
		escalera2.style.height = '200px';
		escalera2.style.left = ubicacionEscaleras[arrayAleatorio[2]];
		escalera2.style.top = parseInt(piso2) + parseInt(alto) + 'px';
	
		escalera3 = document.getElementById('escalera3');	//escalera del piso 1-2
		escalera3.style.width = ancho;
		escalera3.style.height = '200px';
		escalera3.style.left = ubicacionEscaleras[arrayAleatorio[3]];
		escalera3.style.top = parseInt(piso2) + parseInt(alto) + 'px';
		
		
		
		//guardar puntos de interaccion con la escalera (base, altura) para saber donde puede el jugador subir y bajar
		escaleras[0] = {x: parseInt(escalera0.style.left), y: parseInt(escalera0.style.top), width: parseInt(escalera0.style.width), height: parseInt(escalera0.style.height)};
		escaleras[1] = {x: parseInt(escalera1.style.left), y: parseInt(escalera1.style.top), width: parseInt(escalera1.style.width), height: parseInt(escalera1.style.height)};
		escaleras[2] = {x: parseInt(escalera2.style.left), y: parseInt(escalera2.style.top), width: parseInt(escalera2.style.width), height: parseInt(escalera2.style.height)};
		escaleras[3] = {x: parseInt(escalera3.style.left), y: parseInt(escalera3.style.top), width: parseInt(escalera3.style.width), height: parseInt(escalera3.style.height)};
	}
	function inicializarIA()
	{
		moverPolicia();
	}
	function inicializarIntervalos()
	{
		if(detectarColisiones == true)
			colisiones = setInterval(function(){detectarColision()}, 50);
			
		if(detectarLadrones == true)
			intervalDetectarLadron = setInterval(function(){detectarLadron()}, 50);
	}
	function inicializarPuntuacion()
	{
		score();
	}
	function mostrarOpciones()
	{
		form = document.getElementById('formulario');
		form.style.display = "";
	}