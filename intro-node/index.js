const express = require('express') //para que podamos importar las dependencias
const app = express() //ejecutamos express y creamos la app que se la asignamos a la variable app
//como funciona express

app.get('*' , (request, response) => { //get recibe todas las peticiones que mandamos por la url
    response.send({ message: 'Moises Diaz'}) 
})  //con el metodo send enviamos o recibimos cosas mediante el explorador

app.listen(3000, () => console.log('Nuestro servidor esta corriendo en el puerto 3000'))
//activando el servidor local
