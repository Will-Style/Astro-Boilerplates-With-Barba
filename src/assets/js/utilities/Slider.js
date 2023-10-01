
import barba from '@barba/core';
import Splide from "@splidejs/splide";


export default class{
    constructor(){
        
        barba.hooks.once((data) => {
            this.run(document);
        });
        barba.hooks.afterEnter((data) => {
            this.run(data.next.container);
        });
        
    }
    run(d){
        const blog_sliders = d.querySelectorAll('[data-blog-slider]');
        blog_sliders.forEach(el => {
            
            const main = new Splide( el.querySelector('[data-main-slider]'), {
                gap: 20,
                heightRatio : 0.6,
                pagination : false,
                arrows : false,
                drag : true,
                autoWidth: true,
                focus : 'center',
                breakpoints : {
                    640: {
                        gap : 10,
                    },
                },
            });
            
            const thumbnails = new Splide( el.querySelector('[data-thumbnail-slider]'), {
                 rewind : true,
                arrows : false,
                fixedWidth : 80,
                fixedHeight : 80,
                isNavigation : true,
                gap : 8,
                focus : 'center',
                pagination : false,
                cover : true,
                dragMinThreshold: {
                    mouse : 4,
                    touch : 10,
                },
                breakpoints : {
                    640: {
                        fixedWidth : 45,
                        fixedHeight : 45,
                        gap : 5,
                    },
                },
            });
            
            main.sync( thumbnails );
            main.mount();
            thumbnails.mount();
        });
    }
}