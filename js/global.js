//variables globales
	//opciones por defecto
	var numPolicias = 1;	//maximo 3
	var tiempo = 120;
	var puntuacion = 0;
	var rangoVision = 450;
	var usuarioActivo = null;
	var dineroRobado = false;
	var detectarColisiones = true;
	var detectarLadrones = true;
	var detenerLadron = false;
	var tiempoBusqueda = 5000;
	var velocidad = 5;		//velocidad de movimiento 
	///
	//musica
	var musica = true;
	var efectos = true;
	var danger = new Audio("sonidos/danger.mp3");
	var found = new Audio("sonidos/found.wav");
	var itemfound = new Audio("sonidos/itemfound.wav");
	var bennyhill = new Audio("sonidos/BennyHill.mp3");
	var inicio = new Audio("sonidos/inicio.mp3");
	var win = new Audio("sonidos/win.mp3");
	var gameover = new Audio("sonidos/gameover.mp3");
	var pause = new Audio("sonidos/pause.mp3");
	///
	//ubicacion del suelo de los pisos
	var piso1 = '550px';		
	var piso2 = '350px';
	var piso3 = '150px';
	///
	//ubicacion de las paredes
	var paredIzq = '10px';		
	var paredDer = '950px';
	///
	//ancho y alto de los personajes
	var ancho = '25px';			
	var alto = '35px';
	///
	//objetos que almacenan la ubicacion del jugador, del enemigo, escaleras y el area que ocupan
	var jugador;	
	var enemigo;	
	var escaleras = new Array();
	var policias = new Array;
	var ladron;
	var ubicacionLadron;
	var ubicacionPolicia;
	var intervalDetectarLadron;
	
	for(i=0; i < numPolicias; i++)			
	{
		window['policia'+i];				//policia0, policia1...
		window['interval'+i];				//interval0, interval1...
		window['intervalEscalera'+i];		//intervalEscalera0, intervalEscalera1...
		window['usandoEscalera'+i] = -1;	//usandoEscalera0, usandoEscalera1...
		window['escalera'+i];				//escalera0, escalera1...
	}
	///
	//movimientos permitidos
	var moverIzquierda = true;
	var moverDerecha = true;
	var moverArriba = false;
	var moverAbajo = false;
	///
	//otras variables
	var random;
	var arrayUsuarios = new Array;	//lista de usuarios
	///