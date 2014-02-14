function teclado(evnt)
	{
		var colision = false;
		var escalera = false;
		
		var ev = (evnt) ? evnt : event;
   		code=(ev.which) ? ev.which : event.keyCode;
   		
   		mover(code);

   		/*
   		code = 40 -> flecha abajo
   		code = 38 -> flecha arriba
   		code = 37 -> flecha izquierda
   		code = 39 -> flecha derecha
   		code = 80 -> tecla 'p'
   		*/
   		//alert("El código de la tecla pulsada es: " + code);
	}
	function mover(code)
	{
		switch (code)
		{
		case 37:
			izquierda(ladron, 'ladron');
			break;
		case 38:
			arriba(ladron, 'ladron');
			break;
		case 39:
			derecha(ladron, 'ladron');
			break;
		case 40:
			abajo(ladron, 'ladron');
			break;
		case 80:
			pause.play();
			alert('PAUSA');
			break;
		}
		robarDinero();	//comprueba si robo el dinero
		victoria();		//comprueba si gano la partida
	}
	
	function izquierda(personaje, perso)
	{
		usarEscalera(personaje);	//comprueba los movimientos permitidos
		
		var currentLeft = parseInt(personaje.style.left);
		
		//comprueba que pueda moverse
    	if (currentLeft > parseInt(paredIzq) && moverIzquierda == true)
  			personaje.style.left = (currentLeft-velocidad) + 'px';
  		///
  		//animacion
  		window['animacion'+perso] = parseInt(personaje.className.substring(personaje.className.length-1, personaje.className.length));
  		if (window['animacion'+perso] < 3)
		{				
			window['animacion'+perso] += 1;
			personaje.className = perso + " spriteI-" + window['animacion'+perso];
		}
		else
		{
			personaje.className = perso + " spriteI-0";
		}
		///
	}
	function derecha(personaje, perso)
	{
		usarEscalera(personaje);

		var currentLeft = parseInt(personaje.style.left);
		
    	if (currentLeft < parseInt(paredDer) && moverDerecha == true)
  			personaje.style.left = (currentLeft+velocidad) + 'px';
		
		window['animacion'+perso] = parseInt(personaje.className.substring(personaje.className.length-1, personaje.className.length));
		if (window['animacion'+perso] < 3)
		{			
			window['animacion'+perso] += 1;
			personaje.className = perso + " spriteD-" + window['animacion'+perso];
		}
		else
		{
			personaje.className = perso + " spriteD-0";
		}
	}
	
	function arriba(personaje, perso)
	{
		usarEscalera(personaje);
			
			if (moverArriba == true)
			{				
				var currentTop = parseInt(personaje.style.top);

				if (currentTop > 0)
					personaje.style.top = (currentTop - velocidad) + 'px';
				
				window['animacion'+perso] = parseInt(personaje.className.substring(personaje.className.length-1, personaje.className.length));
				if (window['animacion'+perso] < 3)
				{				
					window['animacion'+perso] += 1;
					personaje.className = perso + " spriteA-" + window['animacion'+perso];
				}
				else
				{
					personaje.className = perso + " spriteA-0";
				}
			}
	}
	
	function abajo(personaje, perso)
	{
		usarEscalera(personaje);
			
			if (moverAbajo == true)
			{					
				var currentTop = parseInt(personaje.style.top);
		
    			if (currentTop < parseInt(piso1))
  					personaje.style.top = (currentTop+velocidad) + 'px';
  				
  				window['animacion'+perso] = parseInt(personaje.className.substring(personaje.className.length-1, personaje.className.length));
  				if (window['animacion'+perso] < 3)
				{
					window['animacion'+perso] += 1;
					personaje.className = perso + " spriteA-" + window['animacion'+perso];
				}
				else
				{
					personaje.className = perso + " spriteA-0";
				}
			}
	}
	
	function usarEscalera(personaje)
	{	
		//comprueba los movimientos permitidos por un personaje
		perso = {x: parseInt(personaje.style.left), y: parseInt(personaje.style.top), width: parseInt(personaje.style.width), height: parseInt(personaje.style.height)};

		moverArriba = false;
		moverAbajo = false;
		moverIzquierda = true;
		moverDerecha = true;
				
		for ( i = 0; i < escaleras.length; i++)
		{
			
		if (perso.x == escaleras[i].x)
		{
			if (perso.y == parseInt(piso1) && parseInt(piso2) + parseInt(alto) == escaleras[i].y)		//abajo de escalera del piso 1
			{
				//se puede mover izq, der, arr
				moverIzquierda = true;
				moverDerecha = true;
				moverArriba = true;
				moverAbajo = false;
			}
			if (perso.y == parseInt(piso2))		//arriba de escalera del piso 1 y abajo de escalera del piso 2
			{
				if(parseInt(piso2) + parseInt(alto) == escaleras[i].y)							//piso1
				{
					//se puede mover izq, der, abj
					moverIzquierda = true;
					moverDerecha = true;
					moverArriba = false;
					moverAbajo = true;
				}
				else if(parseInt(piso3) + parseInt(alto) == escaleras[i].y)						//piso2
				{
					//se puede mover izq, der, arr
					moverIzquierda = true;
					moverDerecha = true;
					moverArriba = true;
					moverAbajo = false;
				}
			}
			if (perso.y == parseInt(piso3))		//arriba de la escalera del piso2 (piso3)
			{
				if(parseInt(piso3) + parseInt(alto) == escaleras[i].y)							//piso3
				{
					//se puede mover izq, der, abj
					moverIzquierda = true;
					moverDerecha = true;
					moverArriba = false;
					moverAbajo = true;
				}
			}
			if (perso.y < parseInt(piso1) && perso.y > parseInt(piso2))	//en escalera del piso 1
			{
				//se puede mover arr, abj
				moverIzquierda = false;
				moverDerecha = false;
				moverArriba = true;
				moverAbajo = true;
			}
			if (perso.y < parseInt(piso2) && perso.y > parseInt(piso3))	//en escalera del piso 2
			{
				//se puede mover arr, abj
				moverIzquierda = false;
				moverDerecha = false;
				moverArriba = true;
				moverAbajo = true;
			}
		}
		}
	}