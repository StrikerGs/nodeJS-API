// pegando as informações do botão
const btn = document.querySelector('#salvar')

// pegando o evento de clicar no botão para salvar os dados
btn.addEventListener('click', () => {
// capturar os dados do formulário
    const filtro = getDadosForm()
// enviar os dados para a api
    enviarParaApi(filtro)

})

// recebendo os dados do formulario
function getDadosForm(){

    const inputIp = document.querySelector('#ip_filtro')
    if(inputIp.value === null ) {
        console.log("O campo está em branco")
        return
    }
    
    const filtro = {
        ip_filtrado: inputIp.value
    }
    return filtro
} 

async function enviarParaApi(filtro) {
try {
    const resposta = await fetch('http://host.docker.internal:3000/ips', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filtro)
    })
    if(resposta.status === 201) {

        console.log("Ip filtrado com sucesso.")    

    } else {
        console.log("Tem algo errado.")
    }
} catch(erro) {
    console.error(erro)
}
}

/*
function limparCampo() {

    document.querySelector('#ip').value = ''

}
*/