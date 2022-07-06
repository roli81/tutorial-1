const html = document.createElement('template');

html.innerHTML = /*html */`
    <style>
  
    @import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

    :host i {
        font-size: 1em;
        cursor: pointer;
        color: darkblue;
    }


    :host i.cancel {
        display: none;
    }

    :host div.tooltip-container {
        display: inline-block;
        position: relative;
        z-index: 2;
    }

    :host div.notify-container {
        position: absolute;
        z-index: 9;
        width: 300px;
        background-color: white;
        box-shadow: 5px 5px 10px rgba(0,0,0, 0.1);
        bottom: 125%;
        font-size: .8em;
        border-radius: .5em;
        padding: 1em;
        transform: scale(0);
        transform-origin: bottom left;
        transition: transform .5s cubic-bezier(0.22, 1, 0.36, 1);
    }
    </style>
 
    <div class="tooltip-container">
        <i class="bi bi-info-circle-fill alert"></i>
        <i class="bi bi-x-circle-fill cancel"></i>
        <div class="notify-container">
        <div class="notify-content"> </div>
        <button class="action-button">Send an event</button>
        </div>
  
    </div>
`;




export default class SlvTooltip extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(html.content.cloneNode(true));
        this.loadChildren();
    }


    loadChildren() {
        const tooltip = this.shadowRoot.querySelector('div.notify-content');
        Array.from(this.childNodes).map(node => {
            tooltip.appendChild(node);
        });
    }

    tooltip(expandState) {
        const tooltip = this.shadowRoot.querySelector('div.notify-container');
        const alert = this.shadowRoot.querySelector('i.alert');
        const cancel = this.shadowRoot.querySelector('i.cancel');

        if (expandState) {
            tooltip.style.transform = 'scale(1)'
            alert.style.display = 'none';
            cancel.style.display = 'block';
            expandState = false;
        } else {
            tooltip.style.transform = 'scale(0)'
            alert.style.display = 'block';
            cancel.style.display = 'none';
            expandState = true;
        }

    }

    connectedCallback() {
        this.shadowRoot
            .querySelector('i.alert')
            .addEventListener('click', () => { this.tooltip(true); });

        this.shadowRoot
            .querySelector('i.cancel')
            .addEventListener('click', () => { this.tooltip(false); });

        this.shadowRoot
            .querySelector('button.action-button')
            .addEventListener('click', () => { this.dispatchEvent(new CustomEvent('test', { bubbles: true, cancelable: false })); });
    }

    disconnectCallback() {
        this.shadowRoot.querySelector('i.alert').removeEventListener('click');
        this.shadowRoot.querySelector('i.cancel').removeEventListener('click');
    }
}