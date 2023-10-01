import gsap from "gsap";

export default {

    sync: true,
    
    async once(){
        const intro = document.querySelector('[data-intro]');
        if(intro){
            gsap.set(intro,{
                "display":"none"
            });
        }
    },
    async enter(data){
        window.initialScroll(data.next.container);
    }
};