const html = document.createElement('template');


html.innerHTML =  /* html */`

<style>
:host div.marquee-container {
    position: relative;
    overflow: hidden;
    --offset: 20vw;
    --move-initial: calc(-25% + var(--offset));
    --move-final: calc(-50% + var(--offset));

}



:host div.marquee {
    width: fit-content;
    display: flex;
    position: relative;
    transform: translate3d(var(--move-initial), 0, 0);
    animation: marquee 5s linear infinite;
    animation-play-state: paused;
}


:host div.marquee span {
    font-size: 10vw;
    padding: 0 2vw;
}

:host div.marquee-container:hover div.marquee {
    animation-play-state: running;
}

@keyframes marquee { 
    0% {
        transform: translate3d(var(--move-initial), 0, 0);
    }

    100% {
        transform: translate3d(var(--move-final), 0, 0);
    }
}


</style>
<div class="marquee-container">
    <div class="marquee">
        <span>Test</span>
        <span>Test</span>
        <span>Test</span>
        <span>Test</span>
        <span>Test</span>
    </div>
</div>

`;



export default class SlvMarquee extends HTMLElement {


    constructor(...args)  {
        super(...args);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(html.content.cloneNode(true));
    }



    animate() {
        debugger;
        let container = this.shadowRoot.querySelector('div.marquee');

        if (container) {
            let containerWidth = container.offsetWidth;
            let parentWidth = container.parentElement.offsetWidth;
            let flag = 0;


            setInterval(() => {
                container.style.marginLeft = --flag + 'px';

                if (containerWidth == -flag)    {
                    flag = parentWidth;
                }
            }, 10)
        }
    }

    connectedCallback() {
        this.animate();
    }


    disconnectedCallback() {

    }




}