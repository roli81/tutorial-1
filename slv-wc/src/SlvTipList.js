const html = document.createElement('template');

html.innerHTML = /* html */ `
    <style>
        :host ul {
            padding: 0;
            margin: 0;
        }
    </style>
    <h2>My funny Tiplist</h2>



    <ul class="tip-list">
        
    </ul>
`;


export default class SlvTipList extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(html.content.cloneNode(true));
        
    }


    connectedCallback() {

    }

    disconnectCallback() {

    }

    get data() {
        return this.hasAttribute('data');
    }

    set data(val) {
        if (val) {
            const tipList = this.shadowRoot.querySelector('ul.tip-list');
            tipList.innerHTML = '';
            val.forEach(v => {
                let listElement = document.createElement('slv-tip-list-entry');
                listElement.setAttribute('text', v.label);
                listElement.setAttribute('value', v.value);
                listElement.setAttribute('count', v.count);
                tipList.appendChild(listElement);
            });
        } else {
            this.removeAttribute('data');
        }
    }


}