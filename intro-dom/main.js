const todos = JSON.parse(localStorage.getItem('todos')) || [];
//utilizamos el localstorage para guardar los cambios y que perduren
const render = () => {  

    const todoList = document.getElementById('todo-list'); //luego accedemos al todo-list mediante el id
    //funcion .map, transforma el elemento en lo que hagamos en el return, lo manda al array de todos
    const todosTemplate = todos.map(t => '<li>' + t + '</li>');
    todoList.innerHTML = todosTemplate.join(''); //con el inner accedemos al html de todolist
    //join lo que hace es tomar todos los elementos de un arreglo y juntarlos, 
    // en este caso es con un string vacio

    const elementos = document.querySelectorAll('#todo-list li')
    //queryselector hace la misma funcion que el getElementById pero puede ser mas especifico
    elementos.forEach((elemento, i) => {

        elemento.addEventListener('click', () => {
//con el parentnode seleccionamos el ul, con el removechild quitamos lo colocado anteriormente en elemento
            elemento.parentNode.removeChild(elemento)
            todos.splice(i, 1) 
            //splice es para eliminar elementos de un arreglo(desde donde, cuantas veces)

            actualizaTodos(todos)//convertimos el json que llega de todos en un string
            //guardamos en todos y mostramos lo que antes era un json todoStrings
            
            render() //llamamos a la funcion para que se ejecute otra vez cuando se realice un click
        })
    })
}

const actualizaTodos = (todos) => {

    const todoStrings = JSON.stringify(todos) //convertimos el json que llega de todos en un string
    localStorage.setItem('todos', todoStrings)
}

window.onload = () => { //window.onload sirve para que cargue todo el html primero y luego el codigo js
    render()
    const form = document.getElementById('todo-form');
    form.onsubmit = (e) => {
        e.preventDefault(); //hace que detiene el comportamiento que tiene los formularios que es refrescar
        const todo = document.getElementById('todo');
        const todoText = todo.value;
        todo.value = '';
        todos.push(todoText); //para poder agregar los textos al arreglo
        actualizaTodos(todos)//convertimos el json que llega de todos en un string
        //guardamos en todos y mostramos lo que antes era un json todoStrings

        render()
    }
}