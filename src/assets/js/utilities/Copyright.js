import barba from "@barba/core";

export default class {
    
    constructor() {
        barba.hooks.once((data) => {
            this.run(document);
        });
        barba.hooks.after((data) => {
            this.run(data.next.container);
        });

    }
    run(d) {
        const copy_years = d.querySelectorAll('[data-copy-year]');
        copy_years.forEach(c => {
            const start = parseInt(c.innerText);
            if(new Date().getFullYear() > start){
                c.innerText = start + '-' + new Date().getFullYear();
            }
        });
    }
}
