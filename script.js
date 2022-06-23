let nome = "";

pedirNome();

function pedirNome() {
    nome = prompt('Qual seu nome?');
    entrarNaSala();
}

function entrar() {
    nome = document.querySelector('input[name="nome"]').value;
    const telaDeEntrada = document.querySelector('.telaDeEntrada');
    const containerChat = document.querySelector('.containerChat');
    telaDeEntrada.classList.add('hide');
    containerChat.classList.remove('displayNone');

    console.log(nome);

    entrarNaSala();
}

function entrarNaSala() {
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: nome});
    promise.then(entrarNaSalaSucesso);
    promise.catch(entrarNaSalaErro);
}

function entrarNaSalaSucesso(request) {
    if(request.status === 200) {
        console.log(`Entrou sem problemas: ${request.status}`);
    }
    
}

function entrarNaSalaErro (request) {
    if(request.response.status === 301) {
        alert('301 - O recurso que você está tentando acessar foi movido pra outra URL');
    } else if (request.response.status === 401) {
        alert('401 - Você não tem acesso a esse recurso');
    } else if (request.response.status === 404) {
        alert('404 - O recurso pedido não existe');
    } else if (request.response.status === 409) {
        alert('409 - O recurso que você está tentando inserir já foi inserido');
    } else if (request.response.status === 422) {
        alert('422 - A requisição enviada não está no formato esperado');
    } else if (request.response.status === 500) {
        alert('500 - Ocorreu algum erro desconhecido no servidor');
    }

    pedirNome();
}