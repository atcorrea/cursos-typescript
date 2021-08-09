class NegociacoesView extends View<Negociacoes> {

    template(model: Negociacoes): string {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <th>DATA</th>                
                    <th>QUANTIDADE</th>                
                    <th>VALOR</th>                
                    <th>VOLUME</th>                                    
                </thead>
                <tbody>
                ${model.paraArray().map(neg =>
                    `<tr>
                        <td>${neg.data.getDate() + '/' + neg.data.getMonth() + 1 + '/' + neg.data.getFullYear()}</td>
                        <td>${neg.quantidade}</td>
                        <td>${neg.valor}</td>
                        <td>${neg.volume}</td>
                    </tr>`).join('')}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
        `;
    }
}