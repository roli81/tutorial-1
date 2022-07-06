const html = document.createElement('template');

html.innerHTML = /* html */ `
    <style>

    </style>
    <h2>My funny Tiplist</h2>
    <div>
        Now it should Work
    </div>
`;



export default class SlvTipList extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(html.content.cloneNode(true));
    }


    connectedCallback() {
        window.addEventListener('test', () => {
            alert('Hello From List');
        });
    }

    disconnectCallback() {

    }


}