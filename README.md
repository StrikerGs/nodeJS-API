Teste DEV com Backend em nodeJS e Frontend com Vanilla JS e DOCKER com docker-compose.
Para uma melhor organização do código fonte, eu criei dois sub diretórios dentro do diretório principal. Um diretório pra o código da API com Node chamada de "backend" e outro diretório para o código HTML e JS da interface gráfica, chamado de "frontend".

Como testar este app?
Clone o reposiório: git clone https://github.com/StrikerGs/nodeJS-API.git
Entre na pasta backend: cd C:\Users\Gustavo\Documents\desafio\backend
Rode o comando docker-compose up -d para subir a API para um container de docker(necessita de docker instalado)
Abra o arquivo frontend/index.html no seu navegador
Clique em "Adicionar um IP ao filtro" para adicionar um IP que você não queira que esteja na lista.