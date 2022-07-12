export default class SlvAppController extends HTMLElement {


    listEntries = [];

    constructor() {
        super();
    }


    connectedCallback() {
        this.addEventListener('addItem', (event) => {

            let index = this.listEntries.findIndex(entry => entry.value === event.detail.value);

            if (index >= 0) {
                this.listEntries[index].count ++;
 
            } else {
                this.listEntries.push({
                    value: event.detail.value,
                    label: event.detail.subject,
                    count: 1
                });
            }


            this.renderTipList();
        });

        this.addEventListener('deleteItem', (event) => {
            this.listEntries = this.listEntries.filter(li => li.value !== event.detail.value);
            this.renderTipList();
        });
    }

    disconnectCallback() {
        this.removeEventListener('addItem');
        this.removeEventListener('deleteItem');
    }



    renderTipList() {
        const listComponent = this.querySelector('slv-tip-list');

        if (listComponent) {
            listComponent.data = this.listEntries;
        }
    }

}