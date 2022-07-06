export default class SlvAppController extends HTMLElement {


    constructor() {
        super();
        debugger;
    }


    connectedCallback() {
        this.addEventListener('test', () => {
            alert('Hello from App-Controller');
        });
    }

    disconnectCallback() {
        this.removeEventListener('test');
    }

}