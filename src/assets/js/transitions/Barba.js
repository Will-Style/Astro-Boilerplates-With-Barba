
import barba from '@barba/core';
import Prevent from "./Prevent";
import Transitions from "./Transition";
import Disabled from "./Disabled";

export default class{
	
	constructor(){

        window.isEnabledLoading = (data) => {
            if(
                data.next.namespace != "disabled" 
                && data.trigger!="forward" 
                && data.trigger!="back"
            ){
                return true;
            }
            return false;
        };
        window.getScrollTop = (d) => {
            if( location.hash ){
                const anchor = d.querySelector( location.hash );
                if(anchor){
                    const rect = anchor.getBoundingClientRect();
                    let top = rect.top ;
                    const header = document.querySelector('[data-header]');
                    if(header){
                        top = top - header.clientHeight;
                    }
                    return (top * -1) + 'px';
                }
            }
        };
        window.initialScroll = (d) => {
            if( location.hash ){
                const anchor = d.querySelector( location.hash );
                if(anchor){
                    const rect = anchor.getBoundingClientRect();
                    const scrollTop = window.pageYOffset;
                    let top = rect.top + scrollTop;
                    const header = document.querySelector('[data-header]');
                    if(header){
                        top = top - header.clientHeight;
                    }
                    window.scrollTo(0,top);

                }
            }else{
                window.scrollTo(0,0);
            }
        };
        barba.init({
            prefetchIgnore: true,
            preventRunning: false,
            prevent: Prevent,
            timeout: 10000,
            cacheIgnore: true,
            
            transitions: (import.meta.env.PUBLIC_ENABLE_LOADING) ?  [Transitions] : [Disabled]
        }); 

        window.barba = barba;

        history.scrollRestoration = "manual";

        barba.hooks.once((data) => {
            window.initialScroll(document);
        });

        this.scrollPosY = [0];

        barba.hooks.enter((data) => {
            if(data.trigger !== "back") {
                this.scrollPosY.push(barba.history.current.scroll.y);
            }
        });
        barba.hooks.after((data) => {
           
            if(data.trigger === "back") {
                window.scrollTo(0, this.scrollPosY.pop());
            }
            
        });
	}
}