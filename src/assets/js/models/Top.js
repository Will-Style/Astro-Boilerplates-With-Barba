import barba from "@barba/core";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default class {
    triggers = [];
    constructor() {
        barba.hooks.once((data) => {
                
            this.run(document);

        });
        barba.hooks.afterOnce((data) => {
            
            this.intro_animation(document);

        });
        barba.hooks.afterLeave(()=>{
            if( this.triggers.length > 0 ){
                this.triggers.forEach(t => {
                    t.kill();
                });
            }
        });
        
        barba.hooks.after((data) => {
            this.run(data.next.container);
        });
    }
    
    run(d) {
            // const header = document.querySelector('[data-header]');
            // const hero = d.querySelector('[data-top-hero]');
            // const kv = d.querySelector('[data-top-kv]');
            
            // if(kv){
               
               
            //     this.triggers.push(
            //         ScrollTrigger.create({
            //             trigger: kv,
            //             start (){
            //                 return '-' + header.clientHeight + 'px top';
            //             },
            //             end: 'bottom+=50%',
            //             onEnter: () =>{
            //                 hero.classList.add(':active');
            //             },
            //             onLeaveBack: () =>{
            //                 hero.classList.remove(':active');
            //             }
            //         })
            //     );
                
            // }

            // // 背景を暗くする
            // const about = d.querySelector('[data-top-about]');
            // if(about){
                
            //     this.triggers.push(
            //         ScrollTrigger.create({
            //             trigger: about,
            //             start (){
            //                 return '-' + header.clientHeight + 'px top';
            //             },
            //             end: 'bottom top',
            //             onEnter: () =>{
            //                 about.classList.add(':is-dark');
            //             },
            //             onEnterBack: () =>{
            //                 about.classList.add(':is-dark');
            //             },
            //             onLeave: () =>{
            //                 about.classList.remove(':is-dark');
            //             },
            //             onLeaveBack: () =>{
            //                 about.classList.remove(':is-dark');
            //             },
            //         })
            //     );
            // }

            // // グラデーションをスクロールにあわせて動かす
            // const alumi = d.querySelector('[data-top-alumi]');
            // if(alumi){
            //     gsap.fromTo(
            //         alumi.querySelector('[data-gradient]'),
            //         {
            //             backgroundPosition: "-40vh 0px"
            //         },
            //         {
            //             backgroundPosition: "40vh 0px",
            //             scrollTrigger: {
            //                 trigger: alumi,
            //                 start: 'top bottom',
            //                 end: 'bottom+=50%',
            //                 scrub:true,
            //             }
            //         }
            //     );
            // }

            // const caseSlider = d.querySelector('[data-case-slider]');
            // if(caseSlider){
            //     new Splide( '[data-case-slider]',{
            //         pagination: false,
            //         arrows:false,
            //         mediaQuery: 'min',
            //         gap: '30px',
            //         padding: 25,
            //         fixedWidth: "280px",
            //         speed: 800,
            //         easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
            //         breakpoints: {
            //             576 : {
            //                 padding: 30,
            //                 fixedWidth: "330px",
            //             },
            //             1024: {
            //                 destroy: true,
            //             },
            //         }
            //     } ).mount();
            // }

    }
    intro_animation(d){
        
    }
}
