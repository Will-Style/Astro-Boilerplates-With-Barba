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
    async once(data){
        if(data.next.namespace != "disabled"){
            try{
             
                await new Promise((resolve, reject) => {


                     // ローディングの確認をしたいときはtrueに
                    let debug = false;
                    const keyName = 'visited';
                    const keyValue = true;

                    
                    const intro = document.querySelector('[data-intro]');
                    const overlayFirst = document.querySelector('[data-intro-overlay-first]');
                    const overlaySecond = document.querySelector('[data-intro-overlay-second]');
                    document.body.setAttribute("data-namespace",data.next.namespace);
                    CustomEase.create("LogoEase", ".73,.21,.25,1.02");
                    if(intro){
                        const tl = gsap.timeline({
                        });
                        
                        this.visited = sessionStorage.getItem(keyName);
                        if ( !this.visited || debug ) {
                            //sessionStorageにキーと値を追加
                            sessionStorage.setItem(keyName, keyValue);
                        
                            // tl.to(".intro__logo__image",{
                            //     y: 0,
                            //     duration:1.2,
                            //     ease:"LogoEase",
                            //     onComplete: ()=>{

                            //         gsap.to(".intro__logo__image",{
                            //             y: "-100%",
                            //             duration:.7,
                            //             delay:.6,
                            //             ease:"Power3.easeInOut",
                            //         });
                                    
                            //     }
                            // });

                            tl.to(overlayFirst,{
                                y: "-100%",
                                duration:1,
                                delay :.5,
                                ease:"Power4.easeOut",
                                
                            });
                            tl.to(overlaySecond,{
                                delay:.3,
                                y: "-100%",
                                duration:1,
                                ease:"Expo.easeInOut",

                                onComplete: ()=>{
                                    gsap.set(intro,{
                                        display:"none",
                                    });
                                    
                                    const AnimationEnd = new CustomEvent('AnimationEnd');
                                    dispatchEvent(AnimationEnd);
                                    resolve();
                                }
                            },"-=1.2");
                        }else{
                            gsap.set(overlaySecond,{"opacity": 0})
                            tl.to(overlayFirst,{
                                opacity: 0,
                                delay:.6,
                                duration:1.2,
                                ease:"Power1.easeOut",

                                onComplete: ()=>{
                                    gsap.set(intro,{
                                        display:"none",
                                    });
                                    
                                    const AnimationEnd = new CustomEvent('AnimationEnd');
                                    dispatchEvent(AnimationEnd);
                                    resolve();
                                }
                            });
                        }
                    
                    }else{
                        resolve();
                    }
                });
                
            } catch (e) {
                console.log(e);
            }
        }else{
            const intro = document.querySelector('[data-intro]');
            if(intro){
                gsap.set(intro,{
                    "display":"none"
                });
            }
        }
    },
    async leave(data) {
        
        if(
            data.next.namespace != "loading-disabled" 
            && data.trigger!="forward" 
            && data.trigger!="back"
        ){
            await new Promise((resolve, reject) => {
                // const header = document.querySelector('[data-header]');
                const current = data.current.container;
                const currentInner = current.querySelector('[data-container-inn]');
                const next = data.next.container;


                gsap.set(document.body,{
                    "min-height":"100vh",
                });

                
                gsap.set(currentInner,{
                    "position":"fixed",
                    "left":0,
                    "top": (window.scrollY * -1) + "px",
                    "width":"100%",
                });

                gsap.set(current,{
                    "width":"100%",
                    "height":"100vh",
                    "position":"fixed",
                    "left":0,
                    "top":0,
                    "backgroundColor": "#fff",
                    "willChange":"transform",
                    "overflow":"hidden",
                    "z-index": 2
                });

                gsap.set(next,{
                    "position":"fixed",
                    "width":"100%",
                    "height":"100vh",
                    "left": 0,
                    "top":0,
                    "willChange":"transform"
                });
                gsap.to(current,{
                    opacity:0,
                    y : "-40px",
                    ease:"Expo.easeInOut",
                    duration:.6,
                    onComplete(){
                        resolve();
                    }
                });
            });
        }
    },
   
    async enter(data) {
    
        if(
            data.next.namespace != "loading-disabled" 
            && data.trigger!="forward" 
            && data.trigger!="back"
        ){
            const current = data.current.container;
            const next = data.next.container;
            
            CustomEase.create("pageSlide", ".83,.2,.09,.95");
            await new Promise((resolve, reject) => {
                let delay = 0;
                if(window.drawerLinkClicked){
                    delay = .6;
                }
                
                gsap.fromTo(
                    next,
                    {
                        opacity:0 ,
                        y : "40px",
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: .8,
                        ease:"pageSlide",
                        clearProps:"all",
                        delay :delay,
                        onStart:() => {
                            window.initialScroll();
                        },
                        onComplete:()=>{

                            gsap.set(document.body,{
                                clearProps:"all",
                            });
                            gsap.set(current,{
                                clearProps:"all",
                            });
                            gsap.set(next,{
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