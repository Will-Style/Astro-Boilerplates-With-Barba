
import barba from '@barba/core';
import Prevent from "./Prevent";
import Transitions from "./Transition";
import Disabled from "./Disabled";
import gsap from "gsap";

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
                const anchor = document.querySelector( location.hash );
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
                const anchor = document.querySelector( location.hash );
                if(anchor){
                    const rect = anchor.getBoundingClientRect();
                    const scrollTop = window.pageYOffset;
                    let top = rect.top + scrollTop;
                    const header = document.querySelector('[data-header]');
                    if(header){
                        
                        top = top - header.clientHeight - 30;
                    }
                    if (window.Lenis) {
                        window.Lenis.scrollTo(top);
                    }else{
                        window.scrollTo(0,top);
                    }
                }
            }else{
                if (window.Lenis) {
                    window.Lenis.scrollTo(0);
                }else{
                    window.scrollTo(0,0);;
                }
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

        barba.hooks.once((data) => {
            window.initialScroll(document);
        });

        this.scrollPosY = [];
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }
        window.addEventListener('popstate', function(e) {
            gsap.set(document.body,{
                opacity:0,
            });
        });
        barba.hooks.enter(async (data) => {

            if(data.trigger !== "back") {
                this.scrollPosY.push(barba.history.current.scroll.y);
            }
            setTimeout(() => {
                    
                if(data.trigger === "back") {
                    window.scrollTo(0,this.scrollPosY.pop());
                }    
            }, 10);
        });
        barba.hooks.after((data) => {
           
            if(
                data.trigger=="forward" 
                || data.trigger=="back"
            ){

                gsap.set(document.body,{
                    clearProps:"opacity",
                });
            }
        });
	}
}