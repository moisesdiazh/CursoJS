console.log('Qlq manao')

//definicion de variables

//let y const

let miPrimeravariable = 'primera variable'
// console.log(miPrimeravariable);

//reasignamos la variable
miPrimeravariable = 'Esto cambio'
// console.log(miPrimeravariable);

//boolean
let miBoolen = true
let miOtroBoolean = false

let miNumero = 0

// console.log(miNumero, miBoolen, miPrimeravariable)

// Objetos

const miPrimerObjeto = {} //objeto vacio

// objeto
const miObjeto = {

    unNumero: 12,
    unString: 'esta cadena de caracteres',
    unaCondicion: true,
}

console.log(miObjeto);

// console.log(miObjeto.unNumero) si queremos llamar solamente una propiedad del objeto;

//arreglos

const arrVacio = []
const arr = [1, 2, 'hola', 'mundo', miObjeto]

//console.log(arrVacio, arr);

// arr.push(5)
arrVacio.push(5)
arrVacio.push(3)
arrVacio.push(1)
arrVacio.push('qlq')
arrVacio.push(miPrimeravariable)

console.log(arrVacio);


// operadores matematicos

const suma = 1 + 2
const restar = 1 - 2
const multiplicar = 2 * 3
const division = 9 / 3

//console.log(suma, restar, multiplicar, division)

// valor del resto
const modulo = 10 % 3
// console.log(modulo);


// aumento o decremento
// debemos usar let para que el valor de un numero cambie
let num = 20
// num++
// num++
// num++
// num++
// num++
// num--

num += 5 //el operador de aumentar 5
num -= 5 //el operador de decrecer 5
num *= 5 //el operador de multiplicar por 5 
num /= 2 //el operador de dividir entre 2
console.log(num);


//operadores de comparacion

//igualdad estricta
const resultado1 = 5 === 6
//igualdad no estricta
const resultado2 = 5 == '5'

const resultado3 = 5 < 6
const resultado4 = 5 < 5
const resultado5 = 5 > 6
const resultado6 = 5 > 5
const resultado7 = 5 <= 5
const resultado8 = 5 <= 6
const resultado9 = 5 >= 5
const resultado10 = 5 >= 6


//desigualdad estricta
const resultado11 = 5 !== 6
//desigualdad no estricta
const resultado12 = 5 != '5'

// console.log(resultado11, resultado12);

// operadores logicos 
// or ||, and &&, not !

//el operador or siempre busca ser true, la unica forma de que sea false es que los dos sean false
//evalua hasta que encuentre el primer elemento en true en nuestro caso 'hola'
const resultadoOr = false || false || false|| false|| false || 'Hola' || 'Mundo'
console.log(resultadoOr);

//el operador and busca ser false, la unica forma de que sea true es que ambos sean true
//en la evaluacion siempre trata de buscar el primer false
const resultadoAnd = true && true && true && false
console.log(resultadoAnd);

//el operador nor es el operador de negacion, niega lo que colocas
const resultadoNot = !false 
console.log(resultadoNot);


//control de flujo if else

const edad = 5
if (edad > 5 && edad < 18) {

    console.log('El niño puede jugar');

}else {

    console.log('El niño no puede jugar')
}

//control de flujo while 

let x = 0
while (x < 5) {
    console.log(x);
    x++
}

console.log('terminando el loop')

// control de flujo - switch

let y = 3;
switch(y) {

    case 1: {
        console.log('yo soy el caso 1');
        break;
    }

    case 2: {
        console.log('yo soy pendejo');
        break;
    }

    case 3: {
        console.log('yo soy un triste');
        break;
    }

    default: console.log('pendejisimo');
    break;
}

// for (let i = 0; i < 10; i++) {

//     console.log(i);
// }


// function iterar(arg1) {
    
    
//     for (let i = 0; i < arg1.length; i++) {
    
//         console.log(arg1 [i]);
//     }
// }

// const numeros = [1, 2, 'hola', 4, 5]
// const nombres = ['Pedro', 'Juan', 'Jonathan', 'Gabo', 'Moi']

// iterar(numeros)
// iterar(nombres)

//sumando con funciones --------
// function sumar(a, b) {

//     return a + b;
// }

// const resultadoSuma1 = sumar(1, 2)
// const resultadoSuma2 = sumar(5, 6)
// const resultadoSuma3 = sumar(resultadoSuma1, resultadoSuma2)

// console.log('resultado', resultadoSuma3);

//call backs ----

function sumar(a, b, cb) {

    const r = a + b
    cb(r)
}

function callback(result) {

    console.log('resultado', result)
}

callback(6)
sumar(2, 3, callback)


//fat arrow functions, son practicamente lo mismo que las funciones pero pueden ser mas cortas

const miFatArrowFunction = (a, b) => a + b
const otraFAF = (a, b) => {
    return a + b
}
const r = otraFAF(1, 2)
// console.log(r);

//funciones anonimas, se usa cuando no vamos a ejecutar esta logica en otra parte de la aplicacion
//no se usa tanto
sumar(2, 3, function(r) {

console.log('Soy una funcion anonima y mi resultado es', r);
})

