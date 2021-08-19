import { DiaDaSemana } from "../enums/DiaDaSemana.js";
import { Negociacao } from "../models/Negociacao.js";
import { Negociacoes } from "../models/Negociacoes.js";
import { MensagemView } from "../views/MensagemView.js";
import { NegociacoesView } from "../views/NegociacoesView.js";

export class NegociacaoController {

    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes(); //inferência de tipo
    private negociacoesView = new NegociacoesView('#negociacoesView', true);
    private mensagemView = new MensagemView('#mensagemView', true);

    constructor() {
        this.inputData = document.querySelector("#data") as HTMLInputElement;
        this.inputValor = document.querySelector("#valor") as HTMLInputElement;
        this.inputQuantidade = document.querySelector("#quantidade") as HTMLInputElement;
    }

    public adiciona(): void {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);

        if (this.ehDiaUtil(negociacao.data)){
            this.negociacoes.adiciona(negociacao);
            this.atualizaView();
            this.limparFormulario();
        } else {
            this.mensagemView.update('Apenas negociações em dias úteis são permitidas!');
        }
    }

    private ehDiaUtil(date: Date): boolean{
        return date.getDay() > DiaDaSemana.DOMINGO && 
               date.getDay() < DiaDaSemana.SABADO 
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.mensagemView.update('negociação adicionada com sucesso!');
        this.negociacoesView.update(this.negociacoes);
    }
}