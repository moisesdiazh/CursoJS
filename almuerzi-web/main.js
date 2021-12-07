let mealsState = []
let user = {}
let ruta = 'login' //login, register, orders

const stringToHTML = (s) => {

    const parser = new DOMParser()
    const doc = parser.parseFromString(s, 'text/html') //transformando un text/html en un documento
    return doc.body.firstChild //first child vendria siendo el primer elemento de la etiqueta de body
}


const renderItem = (item) => {
                                    //altGr+}
    const element = stringToHTML(`<li data-id="${item._id}">${item.name}</li>`) //templatestring

    element.addEventListener('click', () => {
        const mealsList = document.getElementById('meals-list') //selecionamos el id y lo volvemos una const
        Array.from(mealsList.children).forEach(x => x.classList.remove('selected')) //removiendo la clase selected
        element.classList.add('selected') //añadiendo la clase selected a los li del array
        const mealsIdInput = document.getElementById('meals-id')//seleccionamos el input hidden
        mealsIdInput.value = item._id //le otorgamos un id unico
    })//añadiendo el escuchador de eventos a realizar por cada click y la funcion que hara
    return element        
}

const renderOrder = (order, meals) => { //condicion al buscar
    const meal = meals.find(meal => meal._id === order.meal_id) //buscamos la meal que corresponde a la orden
    const element = stringToHTML(`<li data-id="${order._id}">${meal.name} ${order.user_id}</li>`) //templatestring

    return element
}

const inicializaFormulario = () => {

        //creando las orders
        const orderForm = document.getElementById('order') //seleccionando el id order del form
        orderForm.onsubmit = (e) => {
            e.preventDefault()
            const submit = document.getElementById('submit') //seleccionando el boton
            submit.setAttribute('disabled', true) //retornamos el disabled para que no se pueda usar el boton
    
            const mealId = document.getElementById('meals-id')//seleccionando el input hidden
            const mealIdValue = mealId.value
            if (!mealIdValue) { //si no existe mealIdValue o mejor dicho, no esta seleccionado
                alert('Debe seleccionar un plato') //alerta al usuario
                submit.removeAttribute('disabled')// quitando el disabled despues de agregar la order
                return
            }
    
            const order = {
                meal_id: mealIdValue,
                user_id: user._id,
            }

            const token2 = localStorage.getItem('token') //obtienes el token

            fetch('http://127.0.0.1:3000/api/orders', {
                //objeto de configuracion
                method: 'POST', //es obligatorio colcoar el method
                headers: {
                    'Content-Type': 'application/json', //es para que el servidor sepa que estas mandando formato json
                     authorization: token2,
                },
                body: JSON.stringify(order) //el body solo recibe strings, nada de json
            }).then(x => x.json())
              .then(respuesta => {
                 const renderedOrder = renderOrder(respuesta, mealsState)
                 const ordersList = document.getElementById('orders-list')
                 ordersList.appendChild(renderedOrder)
                 submit.removeAttribute('disabled')// quitando el disabled despues de agregar la order
              })
        }
}

const inicializaDatos = () => {

    fetch('http://127.0.0.1:3000/api/meals') //la libreria fetch consultara los datos aqui en esta api
    .then(response => response.json())//con el then convertimos lo que llega de la api en json
    .then(data => {
        mealsState = data
        const mealsList = document.getElementById('meals-list') //selecionamos el id y lo volvemos una const
        const submit = document.getElementById('submit')//seleccionando el id del boton de submit
        const listItems = data.map(renderItem) //recorremos el arreglo correspondiente a meals con el .map y organizamos solo el nombre
        mealsList.removeChild(mealsList.firstElementChild) //eliminando el parrafo de cargando una vez ya cargue
        listItems.forEach(element => mealsList.appendChild(element));
        submit.removeAttribute('disabled')//hacemos esto para que una vez se cargue todo puedas darle al boton otra vez
        
        //para que se vean las ordenes creadas en la lista
        fetch('http://127.0.0.1:3000/api/orders') 
        .then(response => response.json())
        .then(ordersData => {
            const ordersList = document.getElementById('orders-list')//seleccionando la lista de ordenes con el dom
            const listOrders = ordersData.map(orderData => renderOrder(orderData, data))//recorriendo el array del render con las orders y la data de los meals

            ordersList.removeChild(ordersList.firstElementChild)//removiendo el primer elemento del li
            listOrders.forEach(element => ordersList.appendChild(element))//haciendo un foreach para que se vean las ordenes
        })
    }) //recibiendo los datos
}

//cada vez que cambiemos alguna ruta llamemos a renderApp para renderizar 
const renderApp = () => {

    const token = localStorage.getItem('token')
    if (token) {

        user = JSON.parse(localStorage.getItem('user'))//debemos volverlo un string ya que viene como json
        return renderOrders()
    }
    renderLogin()
}

const renderOrders = () => {

    const ordersView = document.getElementById('orders-view')
    document.getElementById('app').innerHTML = ordersView.innerHTML

    inicializaFormulario()
    inicializaDatos()
}

const renderLogin = () => {
    const loginTemplate = document.getElementById('login-template')
    document.getElementById('app').innerHTML = loginTemplate.innerHTML

    const loginForm = document.getElementById('login-form')
    loginForm.onsubmit = (e) => {

        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        fetch('http://127.0.0.1:3000/api/auth/login', {

                //objeto de configuracion
                method: 'POST', //es obligatorio colcoar el method
                headers: {
                    'Content-Type': 'application/json', //es para que el servidor sepa que estas mandando formato json
                    authorization: token,
                },
                body: JSON.stringify({ email, password }) //el body solo recibe strings, nada de json
            }).then(x => x.json())
              .then(respuesta => {
                  localStorage.setItem('token', respuesta.token)
                  //ruta que queremos renderizar
                  ruta = 'orders'
                  return respuesta.token //retornamos respuesta.token para no volver al localstorage
              })
              .then(token => {
               return fetch('http://127.0.0.1:3000/api/auth/me', {
                        method: 'GET', 
                        headers: {
                            'Content-Type': 'application/json', //para indicarle al servidor que enviaremos un json
                            authorization: token,
                        },
                    })
              })
              .then(x => x.json())//el json del usuario y el token
              .then(fetchedUser => {

                localStorage.setItem('user', JSON.stringify(fetchedUser))
                user = fetchedUser           //debemos volverlo un string ya que viene como json
                renderOrders()
              })
    }
}

window.onload = () => {

    renderApp()




}










//todas las cosas que se pueden hacer en el fetch

// window.onload = () => {

//     fetch('http://127.0.0.1:3000/api/meals', {
//         method: 'GET', //PODEMOS COLOCAR EL METODO QUE QUEREMOS USAR DE LA API, POST, PUT, DELETE, GET VIENE POR DEFAULT
//         mode: 'cors', //el modo con el que hacemos el llamado
//         cache: 'no-cache', //si queremos utilizar o no cache
//         credentials: 'same-origin', //si queremos usar credenciales
//         headers: {
//             'Content-type': 'application/json'
//         }, //headers podemos colocar el tipo de contenido que queremos
//         redirect: 'follow', //si queremos ser redirigidos cuando contactemos al servidor
//         body: JSON.stringify({ user: 'moise', password: '8633812mm' })
//     }) //la libreria fetch consultara los datos aqui en esta api
//     .then(response => response.json())//con el then convertimos lo que llega de la api en json
//     .then(data => console.log(data)) //recibiendo los datos
// }