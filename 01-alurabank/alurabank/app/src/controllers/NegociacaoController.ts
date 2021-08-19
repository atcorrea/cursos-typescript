import { domInject } from "../decorators/DomInject.js";
import { logarTempoDeExecucao } from "../decorators/LogarTempoDeExecucao.js";
import { DiaDaSemana } from "../enums/DiaDaSemana.js";
import { Negociacao } from "../models/Negociacao.js";
import { Negociacoes } from "../models/Negociacoes.js";
import { NegociacoesService } from "../services/NegociacoesService.js";
import { MensagemView } from "../views/MensagemView.js";
import { NegociacoesView } from "../views/NegociacoesView.js";

export class NegociacaoController {

    @domInject('#data')
    private inputData: HTMLInputElement;
    @domInject('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInject('#valor')
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes(); //inferência de tipo
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacaoService = new NegociacoesService();

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @logarTempoDeExecucao()
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);

        if (this.ehDiaUtil(negociacao.data)) {
            this.negociacoes.adiciona(negociacao);
            console.log(negociacao, this.negociacoes);
            this.limparFormulario();
            this.atualizaView();
        } else {
            this.mensagemView.update('Apenas negociações em dias úteis são permitidas!');
        }
    }

    public importaDados(): void {
            this.negociacaoService
            .obterNegociacoesDoDia()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje.filter(negociacaoDeHoje => {
                    return !this.negociacoes
                    .lista()
                    .some(negociacao => negociacao.ehIgual(negociacaoDeHoje));
                })
            })
            .then(negociacoesFiltradas => {
                for (let negociacao of negociacoesFiltradas) {
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
            });
    }

    private ehDiaUtil(date: Date): boolean {
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