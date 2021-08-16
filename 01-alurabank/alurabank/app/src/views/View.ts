export abstract class View<T> {

    protected _elemento: HTMLElement;
    private escapar: boolean;

    constructor(seletor: string, escapar = false) {

        const elemento = document.querySelector(seletor);
        if (elemento) {
            this._elemento = elemento as HTMLElement;
            this.escapar = escapar;
        } else {
            throw new Error(`Seletor ${seletor} não existe!!`);
        }
    }

    update(model: T) {
        let template = this.template(model);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }

        this._elemento.innerHTML = template;
    }

    protected abstract template(model: T): string
}