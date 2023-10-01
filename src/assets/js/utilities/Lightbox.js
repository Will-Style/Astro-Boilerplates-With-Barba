
import barba from '@barba/core';

export default class{

	constructor(){
        barba.hooks.once((data) => {
            this.run();
        });
        barba.hooks.after((data) => {
            this.run();
        });
    }
    run (){
        require('fslightbox');
        if(typeof refreshFsLightbox === "function"){
            refreshFsLightbox();
        }
    }
}