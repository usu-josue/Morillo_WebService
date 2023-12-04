let pingButtton = document.querySelector("#pingButton");

pingButtton.addEventListener('click',getPinFromWebService)

function getPinFromWebService(){
  const url="http://localhost:3000/ping"

  fetch(url).then((response) =>{
    console.log(response)
  })
}