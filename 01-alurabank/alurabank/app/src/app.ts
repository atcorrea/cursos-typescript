import { NegociacaoController } from './controllers/NegociacaoController.js';

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
} else {
    throw new Error("Não foi possível inicializar a aplicação, verifique se o form existe");
};

const botaoImporta = document.querySelector('#botao-importa');
if (botaoImporta) {
    botaoImporta.addEventListener('click', () => {
        controller.importaDados();
    })
} else {
    throw new Error("Botão importa não foi encontrado");
}