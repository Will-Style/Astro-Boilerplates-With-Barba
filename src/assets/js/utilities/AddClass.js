import barba from "@barba/core";

export default class {
    constructor() {
        barba.hooks.afterOnce((data) => {
            this.run(document);
        });
        barba.hooks.after((data) => {
            this.run(data.next.container);
        });
    }
    run(d) {
        const adds = d.querySelectorAll("[data-add-class]");
        if (adds.length > 0) {
            adds.forEach(el => {
                const target_name = el.getAttribute('data-target');
                const target = d.querySelector(target_name);
                const className = el.getAttribute("data-add-class");
                if(el&&target){
                    el.addEventListener('mouseenter', () => {
                        target.classList.add(className);
                    });
                    el.addEventListener('mouseleave', () => {
                        target.classList.remove(className);
                    });
                }
            });
        }
    }
}
