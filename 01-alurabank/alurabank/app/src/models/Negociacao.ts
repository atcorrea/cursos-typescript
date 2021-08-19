import { Modelo } from "../interfaces/Modelo.js";

export class Negociacao implements Modelo<Negociacao> {

    constructor(private _data: Date,
        private _quantidade: number,
        private _valor: number) {
    }

    get data() {
        return this._data;
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    public static criaDe(dataString: string, qtdString: string, valorString: string): Negociacao {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(qtdString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }

    public paraTexto(): string {
        return `
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor}
        `
    }

    public ehIgual(comparacao: Negociacao): boolean {
        return this.data.getDate() == comparacao.data.getDate()
            && this.data.getMonth() == comparacao.data.getMonth()
            && this.data.getFullYear() == comparacao.data.getFullYear();
    }
}