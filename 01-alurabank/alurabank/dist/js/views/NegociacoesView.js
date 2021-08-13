import { View } from "./View.js";
export class NegociacoesView extends View {
    template(model) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>                
                        <th>QUANTIDADE</th>                
                        <th>VALOR</th>                
                        <th>VOLUME</th>                                    
                    <tr>
                </thead>
                <tbody>
                ${model.lista().map(negociacao => `<tr>
                        <td>${this.formatarData(negociacao.data)}
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                        <td>${negociacao.volume}</td>
                    </tr> `).join('')}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        `;
    }
    formatarData(data) {
        return new Intl.DateTimeFormat().format(data);
    }
}
