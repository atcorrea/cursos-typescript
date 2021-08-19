import { Modelo } from '../interfaces/Modelo.js';
import { Negociacao } from './Negociacao.js';

export class Negociacoes implements Modelo<Negociacoes> {
    private negociacoes: Negociacao[] = [];

    public adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    public lista(): readonly Negociacao[] {
        return this.negociacoes;
    }

    public paraTexto() {
        return JSON.stringify(this.negociacoes, null, 2);
    }

    ehIgual(comparacao: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) == JSON.stringify(comparacao);
    }
}
