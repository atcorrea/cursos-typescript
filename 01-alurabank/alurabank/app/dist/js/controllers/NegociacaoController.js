import { DiaDaSemana } from "../enums/DiaDaSemana.js";
import { Negociacao } from "../models/Negociacao.js";
import { Negociacoes } from "../models/Negociacoes.js";
import { MensagemView } from "../views/MensagemView.js";
import { NegociacoesView } from "../views/NegociacoesView.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView', true);
        this.mensagemView = new MensagemView('#mensagemView', true);
        this.inputData = document.querySelector("#data");
        this.inputValor = document.querySelector("#valor");
        this.inputQuantidade = document.querySelector("#quantidade");
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (this.ehDiaUtil(negociacao.data)) {
            this.negociacoes.adiciona(negociacao);
            this.atualizaView();
            this.limparFormulario();
        }
        else {
            this.mensagemView.update('Apenas negociações em dias úteis são permitidas!');
        }
    }
    ehDiaUtil(date) {
        return date.getDay() > DiaDaSemana.DOMINGO &&
            date.getDay() < DiaDaSemana.SABADO;
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizaView() {
        this.mensagemView.update('negociação adicionada com sucesso!');
        this.negociacoesView.update(this.negociacoes);
    }
}
