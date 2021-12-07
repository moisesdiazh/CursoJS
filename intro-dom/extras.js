const c = a;

a = 12;

const c = {...a} //spread operator
//es para volver una variable independiente de si misma pero con las caracteristica de otra anterior

//promesas o promise

Promise.resolve(2) //promise es el objeto global, resolve que nos permite resolver la promesa
.then(valor => valor + 1) 
.then(valor => console.log(valor)) 
//valor de .then nos permite ejecutar una funcion a la cual se le entregara el valor de la promesa 
//cuando sea resuelta
.catch(e => console.error(e)) //para que te pueda aparecer el error o si tienes algun error

//new promise
new Promise((resolve, reject) => {

    setTimeout(() => resolve(2), 1000) //setTimeout es el tiempo que durara (1segundo) en resolver
})
.then(x => console.log(x))
.catch(e => console.error(e))