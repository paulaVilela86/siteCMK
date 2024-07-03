function abrirPopupIncricao(){
    let popup = document.querySelector("#modal")
    popup.style.display="flex"
}

let fundoModal = document.querySelector("#closeModal")
fundoModal.addEventListener("click",()=> {
    let popup = document.querySelector("#modal")
    popup.style.display="none"
})

