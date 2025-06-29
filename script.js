
function filterProperties() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const properties = document.querySelectorAll('.property');

    properties.forEach(property => {
        const title = property.querySelector('h3').innerText.toLowerCase();
        property.style.display = title.includes(input) ? 'block' : 'none';
    });
}

function filterByType(tipo) {
    const properties = document.querySelectorAll('.property');

    properties.forEach(property => {
        if (tipo === 'todos' || property.classList.contains(tipo)) {
            property.style.display = 'block';
        } else {
            property.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        });
    }

    const propertyForm = document.getElementById('propertyForm');
    if (propertyForm) {
        propertyForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const price = document.getElementById('price').value;
            const description = document.getElementById('description').value;
            const image = document.getElementById('image').value;

            alert(`Imóvel "${title}" cadastrado com sucesso!\nPreço: R$ ${price}`);
            propertyForm.reset();
        });
    }
});
function mudarSlide(btn, direcao) {
    const carousel = btn.closest('.carousel');
    const imagens = carousel.querySelectorAll('img');
    let indexAtual = Array.from(imagens).findIndex(img => img.classList.contains('active'));

    imagens[indexAtual].classList.remove('active');

    let novoIndex = (indexAtual + direcao + imagens.length) % imagens.length;
    imagens[novoIndex].classList.add('active');
}
// Ao clicar numa imagem do carrossel
document.addEventListener('click', function(e) {
    if (e.target.closest('.carousel img')) {
        const src = e.target.getAttribute('src');
        document.getElementById('lightbox-img').src = src;
        document.getElementById('lightbox').style.display = 'flex';
    }
});

function fecharLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
let imagensAtuais = [];
let indexAtual = 0;

// Abre o lightbox ao clicar em qualquer imagem
document.addEventListener('click', function (e) {
    const imgClicada = e.target.closest('img');
    if (imgClicada && imgClicada.src) {
        imagensAtuais = Array.from(document.querySelectorAll('.carousel img, .property img'));
        indexAtual = imagensAtuais.findIndex(img => img.src === imgClicada.src);
        abrirLightbox(imagensAtuais[indexAtual].src);
    }
});

// Abrir o lightbox
function abrirLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

// Navegar entre imagens
function navegarLightbox(direcao) {
    if (imagensAtuais.length === 0) return;
    indexAtual = (indexAtual + direcao + imagensAtuais.length) % imagensAtuais.length;
    document.getElementById('lightbox-img').src = imagensAtuais[indexAtual].src;
}

// Fechar ao clicar fora da imagem
function fecharLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}


    
// Mostrar e esconder o chat
document.querySelector('.botao-chat').addEventListener('click', function () {
    document.getElementById('chatBox').style.display = 'flex';
});

function fecharChat() {
    document.getElementById('chatBox').style.display = 'none';
}

// Enviar mensagem do usuário e responder com o robô
function enviarMensagem() {
    const input = document.getElementById('chatInput');
    const texto = input.value.trim();
    if (texto === '') return;

    const msgUser = document.createElement('div');
    msgUser.className = 'msg-user';
    msgUser.innerText = texto;
    document.getElementById('chatMessages').appendChild(msgUser);
    input.value = '';

    setTimeout(() => {
        const resposta = gerarResposta(texto);
        const msgBot = document.createElement('div');
        msgBot.className = 'msg-bot';
        msgBot.innerText = resposta;
        document.getElementById('chatMessages').appendChild(msgBot);
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
    }, 700);
}

// Respostas automáticas do robô
function gerarResposta(msg) {
    msg = msg.toLowerCase();
    if (msg.includes('olá') || msg.includes('oi')) return 'Olá! Como posso te ajudar com imóveis?';
    if (msg.includes('casa')) return 'Temos lindas casas disponíveis. Prefere na praia ou na cidade?';
    if (msg.includes('apartamento')) return 'Temos apartamentos modernos em várias regiões!';
    if (msg.includes('preço')) return 'Os preços variam bastante. Pode me dizer seu orçamento?';
    return 'Desculpe, não entendi. Pode repetir ou perguntar de outra forma?';
}
