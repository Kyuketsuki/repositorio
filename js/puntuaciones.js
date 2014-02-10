function cargarPuntuaciones()
{
	resultado = "";
	posi = 0;
	posiNombre = 0;
	do
	{
		var index = document.cookie.indexOf("=",posi);
  		
  		if (index != -1)
  		{
  			posi = index+1;	//comprobar el siguiente '=' al repetir el bucle
  			
  			index = document.cookie.indexOf("=", index) + 1;	//posicion inicial del valor de la cookie
  			var endstr = document.cookie.indexOf(";", index);	//posicion final del valor de la cookie
  			if (endstr == -1)
  				endstr = document.cookie.length;
  	
  			longitudPuntuacion = (endstr-index)+1;				//cuenta la cantidad de digitos que tiene la puntuacion
  			
  			nombre = document.cookie.substring(posiNombre,index-longitudPuntuacion);	//extrae el nombre
  			posiNombre = posi+1+longitudPuntuacion;				//prepara la siguiente vuelta del bucle
  			
  			resultado += nombre + ':' +  unescape(document.cookie.substring(index, endstr)) + ' puntos<br/>';
		}
	}
	while(index != -1);
	
	if(resultado == "")
		resultado = 'No hay puntuaciones recientes';
	
	div = document.getElementById('puntuaciones');
	div.innerHTML = resultado;
}