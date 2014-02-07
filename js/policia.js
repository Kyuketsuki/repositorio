var random;
var rangoVision = 450;
var detenerLadron = false;
var ubicacionLadron;
var ubicacionPolicia;

for(i=0; i < numPolicias; i++)			
{
	window['policia'+i];				//policia0, policia1...
	window['interval'+i];				//interval0, interval1...
	window['intervalEscalera'+i];		//intervalEscalera0, intervalEscalera1...
	window['usandoEscalera'+i] = -1;	//usandoEscalera0, usandoEscalera1...
}
		
	


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
			if(parseInt(ladron.style.left) < parseInt(policia.style.left))
			{
				switch(i)	//un intervalo por policia
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
				//interval = setInterval(function(){moverParedIzq()}, 50);
			}
			else
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
				//interval = setInterval(function(){moverParedDer()}, 50);
			}
		}
		if(parseInt(ladron.style.top) < parseInt(policia.style.top))
		{
			if(policia.style.top == piso1 || policia.style.top == piso2)		//ir a escalera y subir
			{
				proxEscalera = escaleraMasCercana(policia,'subir');
				
				if(proxEscalera < parseInt(policia.style.left))
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
					//interval = setInterval(function(){moverParedIzq()}, 50);
				}
				
				//if(proxEscalera == parseInt(policia.style.left))
					//intervalEscalera = setInterval(function(){subirPlanta()}, 50);
					
				if(proxEscalera > parseInt(policia.style.left))	
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
					//interval = setInterval(function(){moverParedDer()}, 50);
				}
			}	
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
				//intervalEscalera = setInterval(function(){subirPlanta()}, 50);
		}
		
		if(parseInt(ladron.style.top) > parseInt(policia.style.top))			//ir a escalera y bajar
		{
			if(policia.style.top == piso2 || policia.style.top == piso3)
			{
				proxEscalera = escaleraMasCercana(policia,'bajar');
				
				if(proxEscalera < parseInt(policia.style.left))
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
					//interval = setInterval(function(){moverParedIzq()}, 50);
				}
				
				//if(proxEscalera == parseInt(policia.style.left))
					//intervalEscalera = setInterval(function(){bajarPlanta()}, 50);
					
				if(proxEscalera > parseInt(policia.style.left))
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
					//interval = setInterval(function(){moverParedDer()}, 50);
				}	
			}

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
			//intervalEscalera = setInterval(function(){bajarPlanta()}, 50);
		}
	}
	else
	{
		/*
			no se puede enviar valores dinamicos
			crear por ejemplo un switch para determinar el policia que se mueve
			y usar variables absolutas para crear el inteval
			algo como interval0 -> policia0
		*/
			
		random = Math.floor((Math.random() * 2));

		if (random == 0 && policia.style.left != paredIzq)
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
		else if (random == 1 && policia.style.left != paredDer)
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
		else
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

		random = Math.floor((Math.random() * 3));
		//console.log(random);

		if (random == 0)
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
			//intervalEscalera = setInterval(function(){bajarPlanta()}, 50);
		}
		if (random == 1)
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
			//intervalEscalera = setInterval(function(){subirPlanta()}, 50);
		}
	}
	}
}


function moverParedIzq(policia, i)
{	
	
	izquierda(policia, 'policia');
		
	if(policia.style.left == paredIzq)
	{
		//alert("pared");
		clearInterval(window['interval'+i]);
		moverPolicia();
		//setTimeout(function(){moverPolicia()},2000); //parar el movimiento unos segundos
	}
	
   			
}
function moverParedDer(policia, i)
{
	derecha(policia, 'policia');
		
	if(policia.style.left == paredDer)
	{
		//alert("pared");
		clearInterval(window['interval'+i]);
		moverPolicia();
	}
	
	//colision = detectarColision();
   		//if (colision == true)
   			//alert("colision"); 	
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

	//colision = detectarColision();
   		//if (colision == true)
   			//alert("colision"); 	
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
		
	//colision = detectarColision();
   		//if (colision == true)
   			//alert("colision"); 	
}

function escaleraMasCercana(policia,direccion)
{	
	proxEscalera = 0;
	temp = 0;
		
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
		
	return proxEscalera;
}
