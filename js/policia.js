function moverPolicia()
{	
	for(i=0; i < numPolicias; i++)
	{	
	policia = document.getElementById('policia'+i);		
	clearInterval(window['interval'+i]);
	clearInterval(window['intervalEscalera'+i]);
	
	if(detenerLadron == true)
	{	
		if(ladron.style.top == policia.style.top)		//misma planta
		{
			if(parseInt(ladron.style.left) < parseInt(policia.style.left))		//si el ladron esta a la izq del policia
			{
				/*no se puede enviar valores dinamicos en un intervalo
				cree un switch para determinar el policia que se mueve
				y use variables para cada uno de ellos*/

				switch(i)	//un intervalo por policia que da segun la i del bucle for
				{
					case 0:
						interval0 = setInterval(function(){moverParedIzq(policia0,'0')}, 50);
						break;
					case 1:
						interval1 = setInterval(function(){moverParedIzq(policia1,'1')}, 50);
						break;
					case 2:
						interval2 = setInterval(function(){moverParedIzq(policia2,'2')}, 50);
						break;
				}
			}
			else																//si el ladron esta a la derecha del policia
			{
				switch(i)
				{
					case 0:
						interval0 = setInterval(function(){moverParedDer(policia0,'0')}, 50);
						break;
					case 1:
						interval1 = setInterval(function(){moverParedDer(policia1,'1')}, 50);
						break;
					case 2:
						interval2 = setInterval(function(){moverParedDer(policia2,'2')}, 50);
						break;
				}
			}
		}
		if(parseInt(ladron.style.top) < parseInt(policia.style.top))			//si el ladron esta en un piso superior
		{
			if(policia.style.top == piso1 || policia.style.top == piso2)		//ir a escalera y subir
			{
				proxEscalera = escaleraMasCercana(policia,'subir');				//escalera mas cercana para subir
				
				if(proxEscalera < parseInt(policia.style.left))					//si la escalera mas cercana esta a la izq
				{
					switch(i)
					{
						case 0:
							interval0 = setInterval(function(){moverParedIzq(policia0,'0')}, 50);
							break;
						case 1:
							interval1 = setInterval(function(){moverParedIzq(policia1,'1')}, 50);
							break;
						case 2:
							interval2 = setInterval(function(){moverParedIzq(policia2,'2')}, 50);
							break;
					}
				}
					
				if(proxEscalera > parseInt(policia.style.left))					//si la escalera mas cercana esta a la der
				{
					switch(i)
					{
						case 0:
							interval0 = setInterval(function(){moverParedDer(policia0,'0')}, 50);
							break;
						case 1:
							interval1 = setInterval(function(){moverParedDer(policia1,'1')}, 50);
							break;
						case 2:
							interval2 = setInterval(function(){moverParedDer(policia2,'2')}, 50);
							break;
					}
				}
			}	
			switch(i)															//esta en la escalera y puede subir
			{
			case 0:
				intervalEscalera0 = setInterval(function(){subirPlanta(policia0,'0')}, 50);
				break;
			case 1:
				intervalEscalera1 = setInterval(function(){subirPlanta(policia1,'1')}, 50);
				break;
			case 2:
				intervalEscalera2 = setInterval(function(){subirPlanta(policia2,'2')}, 50);
				break;
			}	
		}
		
		if(parseInt(ladron.style.top) > parseInt(policia.style.top))			//si el ladron esta en un piso inferior
		{
			if(policia.style.top == piso2 || policia.style.top == piso3)		//ir a escalera y subir
			{
				proxEscalera = escaleraMasCercana(policia,'bajar');				//escalera mas cercana para bajar
				
				if(proxEscalera < parseInt(policia.style.left))					//si la escalera mas cercana esta a la izq
				{
					switch(i)
					{
						case 0:
							interval0 = setInterval(function(){moverParedIzq(policia0,'0')}, 50);
							break;
						case 1:
							interval1 = setInterval(function(){moverParedIzq(policia1,'1')}, 50);
							break;
						case 2:
							interval2 = setInterval(function(){moverParedIzq(policia2,'2')}, 50);
							break;
					}
				}
									
				if(proxEscalera > parseInt(policia.style.left))					//si la escalera mas cercana esta a la der
				{	
					switch(i)
					{
						case 0:
							interval0 = setInterval(function(){moverParedDer(policia0,'0')}, 50);
							break;
						case 1:
							interval1 = setInterval(function(){moverParedDer(policia1,'1')}, 50);
							break;
						case 2:
							interval2 = setInterval(function(){moverParedDer(policia2,'2')}, 50);
							break;
					}
				}	
			}
			switch(i)															//esta en la escalera y puede bajar
			{
				case 0:
					intervalEscalera0 = setInterval(function(){bajarPlanta(policia0,'0')}, 50);
					break;
				case 1:
					intervalEscalera1 = setInterval(function(){bajarPlanta(policia1,'1')}, 50);
					break;
				case 2:
					intervalEscalera2 = setInterval(function(){bajarPlanta(policia2,'2')}, 50);
					break;
			}
		}
	}
	else		//si el ladron no se ha detectado se mueve de forma aleatoria
	{
		random = Math.floor((Math.random() * 2));

		if (random == 0 && policia.style.left != paredIzq)		//mover a la izq
		{
			switch(i)
			{
				case 0:
					interval0 = setInterval(function(){moverParedIzq(policia0,'0')}, 50);
					break;
				case 1:
					interval1 = setInterval(function(){moverParedIzq(policia1,'1')}, 50);
					break;
				case 2:
					interval2 = setInterval(function(){moverParedIzq(policia2,'2')}, 50);
					break;
			}
		}
		else if (random == 1 && policia.style.left != paredDer)	//mover a la der
		{
			switch(i)
			{
				case 0:
					interval0 = setInterval(function(){moverParedDer(policia0,'0')}, 50);
					break;
				case 1:
					interval1 = setInterval(function(){moverParedDer(policia1,'1')}, 50);
					break;
				case 2:
					interval2 = setInterval(function(){moverParedDer(policia2,'2')}, 50);
					break;
			}
		}
		else													//mover a la izq
		{
			switch(i)
			{
				case 0:
					interval0 = setInterval(function(){moverParedDer(policia0,'0')}, 50);
					break;
				case 1:
					interval1 = setInterval(function(){moverParedDer(policia1,'1')}, 50);
					break;
				case 2:
					interval2 = setInterval(function(){moverParedDer(policia2,'2')}, 50);
					break;
			}
		}
		random = Math.floor((Math.random() * 3));				//decidir si baja, sube o sigue en la planta
		//console.log(random);

		if (random == 0)										//baja en la siguiente escalera
		{
			switch(i)
			{
				case 0:
					intervalEscalera0 = setInterval(function(){bajarPlanta(policia0,'0')}, 50);
					break;
				case 1:
					intervalEscalera1 = setInterval(function(){bajarPlanta(policia1,'1')}, 50);
					break;
				case 2:
					intervalEscalera2 = setInterval(function(){bajarPlanta(policia2,'2')}, 50);
					break;
			}
		}
		if (random == 1)										//sube en la siguiente escalera
		{
			switch(i)
			{
				case 0:
					intervalEscalera0 = setInterval(function(){subirPlanta(policia0,'0')}, 50);
					break;
				case 1:
					intervalEscalera1 = setInterval(function(){subirPlanta(policia1,'1')}, 50);
					break;
				case 2:
					intervalEscalera2 = setInterval(function(){subirPlanta(policia2,'2')}, 50);
					break;
			}
		}
	}
	}
}

function moverParedIzq(policia, i)
{	
	izquierda(policia, 'policia');
		
	if(policia.style.left == paredIzq)		//llego a su objetivo, volver a mover
	{
		clearInterval(window['interval'+i]);
		moverPolicia();
	}		
}

function moverParedDer(policia, i)
{
	derecha(policia, 'policia');
		
	if(policia.style.left == paredDer)		//llego a su objetivo, volver a mover
	{
		clearInterval(window['interval'+i]);
		moverPolicia();
	}	
}

function bajarPlanta(policia, j)
{
	if(policia.style.top != piso1)
	{
			for(i=0; i < escaleras.length; i++)
			{
				if (parseInt(policia.style.left) == escaleras[i].x && parseInt(policia.style.top) == escaleras[i].y - parseInt(alto))	//comprueba que esta arriba de la escalera
				{
					clearInterval(window['interval'+j]);
					window['interval'+j] = 0;
					window['usandoEscalera'+j] = i;
					break;
				}		
			}

		if(window['interval'+j] == 0 || window['usandoEscalera'+j] != -1)
			{
				abajo(policia, 'policia');
				i = window['usandoEscalera'+j];
				

				if(parseInt(policia.style.left) == escaleras[i].x && parseInt(policia.style.top) == escaleras[i].y + escaleras[i].height - parseInt(alto))	//comprueba que haya bajado
				{
					clearInterval(window['intervalEscalera'+j]);
					clearInterval(window['interval'+j]);
					window['usandoEscalera'+j] = -1;
					moverPolicia();
				}
			}
	}
}

function subirPlanta(policia, j)
{
	if(policia.style.top != piso3)
	{
			for(i=0; i < escaleras.length; i++)
			{
				if (parseInt(policia.style.left) == escaleras[i].x && parseInt(policia.style.top) == escaleras[i].y+escaleras[i].height-parseInt(alto))	//comprueba que este debajo de la escalera
				{
					clearInterval(window['interval'+j]);
					window['interval'+j] = 0;
					window['usandoEscalera'+j] = i;
					break;
				}		
			}
		if(window['interval'+j] == 0 || window['usandoEscalera'+j] != -1)
			{
				arriba(policia, 'policia');
				i = window['usandoEscalera'+j];;

				if(parseInt(policia.style.left) == escaleras[i].x && parseInt(policia.style.top) == escaleras[i].y - parseInt(alto))	//comprueba que haya subido
				{
					clearInterval(window['intervalEscalera'+j]);
					clearInterval(window['interval'+j]);
					window['usandoEscalera'+j] = -1;
					moverPolicia();
				}
			}
	}
}

function escaleraMasCercana(policia,direccion)
{	
	proxEscalera = 0;
	temp = 0;
		
	//busca la escalera mas cercana para subir
	if(direccion == 'subir')
	{
		for(j=0; j < escaleras.length; j++)
		{	
			if(parseInt(policia.style.top) == escaleras[j].y+escaleras[j].height-35)
				temp = escaleras[j].x;

			if(Math.abs(parseInt(policia.style.left)-temp) < Math.abs(parseInt(policia.style.left)-proxEscalera) || proxEscalera == 0)
				proxEscalera = temp			
		}
	}
	//busca la escalera mas cercana para bajar
	if(direccion == 'bajar')
	{
		for(j=0; j < escaleras.length; j++)
		{	
			if(parseInt(policia.style.top) == escaleras[j].y-35)
				temp = escaleras[j].x;

			if(Math.abs(parseInt(policia.style.left)-temp) < Math.abs(parseInt(policia.style.left)-proxEscalera) || proxEscalera == 0)
				proxEscalera = temp			
		}
	}
		
	return proxEscalera;	//devuelve la ubicacion de la escalera mas cercana
}