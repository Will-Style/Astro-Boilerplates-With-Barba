import gsap from "gsap";

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
        
        if(data.next.namespace != "loading-disabled" && data.trigger!="forward" && data.trigger!="back" ){
            const current = data.current.container;
            const next = data.next.container;
            await new Promise((resolve, reject) => {
                gsap.set(current,{
                    position:"absolute",
                    width:current.clientWidth,
                    right: 0,
                    top: 0,
                    backgroundColor:"#fff",
                    zIndex:2
                });
                gsap.to(current,{
                    opacity: 0,
                    duration: .4,
                    ease:"Power2.out",
                    onComplete:()=>{
                        resolve();
                    }
                });
            });
        }
    },
   
    async enter(data) {
    
        if(data.next.namespace != "loading-disabled" && data.trigger!="forward" && data.trigger!="back" ){
            const current = data.current.container;
            const next = data.current.container;
            await new Promise((resolve, reject) => {
                window.initialScroll();
                gsap.fromTo(next,{
                    opacity:0
                },{
                    opacity: 1,
                    duration: 1,
                    ease:"Power2.out",
                    onComplete:()=>{
                        gsap.set(next,{
                            clearProps:"all",
                        });
                        const AnimationEnd = new CustomEvent('AnimationEnd');
                        dispatchEvent(AnimationEnd);
                        resolve();
                    }
                });
            });
        }
    }    
};