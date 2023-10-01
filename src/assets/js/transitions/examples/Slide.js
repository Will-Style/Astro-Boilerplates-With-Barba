import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

export default {

    sync: true,
    
    async beforeOnce(data) {
        // if(data.next.namespace != "loading-disabled" ){
        //     await new Promise((resolve, reject) => {
        //         resolve()
        //     });
        // }
    },
    async once(data) {
        // if(data.next.namespace != "loading-disabled" ){
        //     await new Promise((resolve, reject) => {
        //         resolve()
        //     });
        // }
    },
    
    async leave(data) {
        
        if(
            data.next.namespace != "loading-disabled" 
            && data.trigger!="forward" 
            && data.trigger!="back"
        ){
            await new Promise((resolve, reject) => {
                const header = document.querySelector('[data-header]');
                const current = data.current.container;
                const next = data.next.container;
                gsap.set(next,{
                    "position":"fixed",
                    "width":"100vw",
                    "x": "100vw",
                    "left": 0,
                    "top":header.clientHeight + 'px',
                    "backgroundColor": "#fff"
                });
                gsap.set(current,{
                    "width":"100vw",
                    "height":"100vh",
                    "position":"fixed",
                    "left":0,
                    "top": (-window.scrollY + header.clientHeight ) + 'px',
                    "backgroundColor": "#fff"
                });
                gsap.set(header,{
                    "position": "fixed",
                    "top": 0,
                    "left":0,
                    "width": "100vw"
                });
                resolve();
            });
        }
    },
   
    async enter(data) {
    
        if(
            data.next.namespace != "loading-disabled" 
            && data.trigger!="forward" 
            && data.trigger!="back"
        ){
            const header = document.querySelector('[data-header]');
            const current = data.current.container;
            const next = data.next.container;
            
            CustomEase.create("pageSlide", ".83,.2,.09,.95");
            await new Promise((resolve, reject) => {
                
                gsap.to(
                    next,
                    {
                        delay:(window.drawerLinkClicked) ? .8 : .2,
                        x: "0",
                        duration: .8,
                        ease:"pageSlide",
                        clearProps:"all",
                        onStart:() => {
                            window.initialScroll();
                        },
                        onComplete:()=>{

                            gsap.set(header,{
                                clearProps:"all",
                            });
                            const AnimationEnd = new CustomEvent('AnimationEnd');
                            dispatchEvent(AnimationEnd);
                            resolve();
                        }
                    }
                );
            });
        }
    }
};