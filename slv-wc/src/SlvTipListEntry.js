const html = document.createElement('template');

html.innerHTML = /* html */ `
    <style>
        @import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

        :host li {
        
            background: grey;
            display: flex;
            justify-content: space-between;
            padding: 0.5em;


        }
        :host i:hover  {
            color: red;
        }

    </style>
   

`;





export default class SlvTipListEntry extends HTMLElement {

   
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(html.content.cloneNode(true));
    }

    connectedCallback() {
        this.renderItem();
    }

    disconnectCallback() {

    }

    renderItem() {
        this.listItem = document.createElement('li');
        this.deleteButton = document.createElement('i');
        this.deleteButton.className = 'bi bi-trash-fill';
        this.deleteButton.addEventListener('click', () => {
            this.dispatchEvent(
                new CustomEvent('deleteItem', 
                { 
                    bubbles: true, 
                    cancelable: false, 
                    detail: {
                        subject: this.getAttribute('subject'),
                        value: this.getAttribute('value')
                    },
                    composed: true   
                }));
        });
        this.itemLabel = document.createElement('span');
        this.itemLabel.innerHTML = `${this.getAttribute('text')} <b>${this.getAttribute('count')} Tips` ;
        this.listItem.appendChild(this.itemLabel);
        this.listItem.appendChild(this.deleteButton);
        this.shadowRoot.appendChild(this.listItem);
    }

}