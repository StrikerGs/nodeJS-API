// pegando o elemento html da tela por meio do id da div
const elementoIp = document.querySelector('#listaip')

// função com finalidade de consultar a lista de ip da API usando fetch
// com a palavra chave async a função é considerada assincrona, tornando-se assim uma promisse
async function consultaLista(){

const retorno = await fetch('http://host.docker.internal:3000/ips')
const listaip = await retorno.json()
preencheTela(listaip)

}

// função que irá percorrer cada ip da listaip e
function preencheTela (listaip) {
listaip.response.ip.forEach(lista => {

const listaHTML = `
<div class="ip">
<ul>
<li>IP</li>
<li>${lista.node_ip}</li>
</ul>
`
elementoIp.innerHTML = elementoIp.innerHTML + listaHTML
})

}

consultaLista()