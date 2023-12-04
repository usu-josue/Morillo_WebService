let message = document.querySelector('#message')
let pingButton = document.querySelector('#pingButton')

//emparejar al boton con laa funcion
pingButton.addEventListener('click',getPing)

function getPing(){
    const url ='http://localhost:3000/ping'
    //encadenar los datos de la url con la respuesta
    fetch(url)
    .then((response) => {
        return response.json()//solicitar respuesta en formato json 
    })
    .then((data) => {
        console.log(data)
        message.innerHTML=data.message //asiganar la data retornada al message
    })
    .catch(function(error){
        console.log(error)
        message.innerHTML=`no se puede conectar al servidor ${url}`
    })
}