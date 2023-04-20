/* 1)Lo primero que hacemos es declarar variables, establecer que variables vamos a estar utilizando en HTML que necesito utilizar en JS 
   2) En la variable creada hacemos llada al elemento HTML por medio del ID, en este caso.  


*/

const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('.agregar-tarea')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id 
let LIST 


//Creación de fecha

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday:'long',month:'short',day:'numeric'})




/*Despues de declarar las variables lo que hacemos es crear una función, la función "Agregar Tarea" y cada vez que de click en el boton esta traiga una nueva tarea */
function agregarTarea(tarea,id,realizado,eliminado){

    if(eliminado){return}

    const REALIZADO = realizado ?check :uncheck
    const LINE = realizado ?lineThrough :''

    const elemento = `
                    <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>    
                        <p class="text ${LINE}">${tarea}</p> 
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                    </li> `
                        

    lista.insertAdjacentHTML("beforeend",elemento)
}


//FUNCIÓN DE TAREA REALIZADA

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true
}

//FUNCIÓN DE TAREA ELIMINADA
function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}





/*Creamos en boton para llamar la función agregarTarea */
botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea) {
        agregarTarea(tarea,id,false,false) 
        LIST.push({
            nombre: tarea,
            id:id,
            realizado:false,
            eliminado:false
        })       
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
    input.value=''
    id++ //Suma un numero al ID
})

//Para agregar tareas con la tecla enter 
document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)  
            LIST.push({
                nombre: tarea,
                id:id,
                realizado:false,
                eliminado:false
            })      
        }
        localStorage.setItem('TODO',JSON.stringify(LIST))
        input.value=''
        id++ //Suma un numero al ID
    }
})

//Creamos los eventos de check y trash

lista.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData === 'realizado'){
        //función
        tareaRealizada(element)
    }else if(elementData==='eliminado'){
        tareaEliminada(element)
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})

//Local Storage Get Item

let data = localStorage.getItem('TODO')
if(data){
    LIST=JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}else{
    LIST = []
    id = 0
}

function cargarLista(DATA){
    DATA.foreach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}