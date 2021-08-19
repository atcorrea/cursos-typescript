
export abstract class View<T> {

    protected _elemento: HTMLElement;

    constructor(seletor: string) {

        const elemento = document.querySelector(seletor);
        if (elemento) {
            this._elemento = elemento as HTMLElement;
        } else {
            throw new Error(`Seletor ${seletor} não existe!!`);
        }
    }

    update(model: T) {

        let template = this.template(model);
        this._elemento.innerHTML = template;

    }

    protected abstract template(model: T): string
}