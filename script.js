let nome = "";
let ultimaMensagem;

pedirNome();
setInterval(manterConexao, 3000);

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

    ultimaMensagem = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');


    manterConexao();
    
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

function manterConexao() {
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {name: nome});
    promise.then(manterConexaoSucesso);

    let mensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    mensagens.then(puxarMensagem);
}

function manterConexaoSucesso (request) {
    console.log(request);
}

function imprimeMensagens (request) {
    
}

function enviarMensagem () {
    let mensagem = document.querySelector('input[name="mensagem"]').value;
    let envio = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', {
        from: nome,
        to: "Todos",
        text: mensagem,
        type: "message" // ou "private_message" para o bônus
    });
    document.querySelector('input[name="mensagem"]').value = "";
    envio.then(manterConexao);
}

function enviarMensagemSucesso (request) {
    /* console.log(request);
    let promiseMensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promiseMensagens.then(puxarMensagem); */
}

function puxarMensagem (request) {

    let chat = document.querySelector('.chat');
    /* for (let i = 99; i < request.data.length; i++) {
        if (ultimaMensagem === request.data[i]) {
            if (request.data[i].type === 'status') {
                chat.innerHTML += `<span class="chatStatus"><h1>${request.data[i].time}</h1><strong>${request.data[i].from}</strong> ${request.data[i].text}</span>`
            } else if (request.data[i].type === 'message') {
                chat.innerHTML += `<span class="chatRegularMessage"><h1>${request.data[i].time}</h1><strong>${request.data[i].from}</strong>para <strong>${request.data[i].to}:</strong> ${request.data[i].text}</span>`;
            } else if (request.data[i].type === 'private_message') {
                chat.innerHTML += `<span class="chatReservadamente"><h1>${request.data[i].time}</h1><strong>${request.data[i].from}</strong>reservadamente para <strong>${request.data[i].to}:</strong> ${request.data[i].text}</span>`;
            }
            ultimaMensagem = request.data[i];
        }
    } */

    /* let i = 99;
    if (ultimaMensagem.time !== request.data[i].time && ultimaMensagem.text !== request.data[i].text) {
        if (request.data[i].type === 'status') {
            chat.innerHTML += `<span class="chatStatus"><h1>${request.data[i].time}</h1><strong>${request.data[i].from}</strong> ${request.data[i].text}</span>`;
        } else if (request.data[i].type === 'message') {
            chat.innerHTML += `<span class="chatRegularMessage"><h1>${request.data[i].time}</h1><strong>${request.data[i].from}</strong>para <strong>${request.data[i].to}:</strong> ${request.data[i].text}</span>`;
        } else if (request.data[i].type === 'private_message') {
            chat.innerHTML += `<span class="chatReservadamente"><h1>${request.data[i].time}</h1><strong>${request.data[i].from}</strong>reservadamente para <strong>${request.data[i].to}:</strong> ${request.data[i].text}</span>`;
        }
        ultimaMensagem = request.data[i];
    } */
    chat.innerHTML = "";

    for (let i = 0; i < request.data.length; i++) {
        if (request.data[i].type === 'status') {
            chat.innerHTML += `<span class="chatStatus"><h1>${request.data[i].time}</h1><strong>${request.data[i].from}</strong> ${request.data[i].text}</span>`;
        } else if (request.data[i].type === 'message') {
            chat.innerHTML += `<span class="chatRegularMessage"><h1>${request.data[i].time}</h1><strong>${request.data[i].from}</strong>para <strong>${request.data[i].to}:</strong> ${request.data[i].text}</span>`;
        } else if (request.data[i].type === 'private_message') {
            if (request.data[i].from === nome || request.data[i].to === nome) {
                chat.innerHTML += `<span class="chatReservadamente"><h1>${request.data[i].time}</h1><strong>${request.data[i].from}</strong>reservadamente para <strong>${request.data[i].to}:</strong> ${request.data[i].text}</span>`;
            }
        }
        ultimaMensagem = request.data[i];
    }

}