
import barba from '@barba/core';
import Lenis from '@studio-freight/lenis';
import { UAParser } from 'ua-parser-js';

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class{
    lerp = .2;
    wheelMultiplier = 1;

	constructor(){
        barba.hooks.beforeOnce((data) => {
            this.run(document);
        });

        barba.hooks.beforeEnter((data) => {
            const isLenisDisable = data.next.container.querySelector("[data-lenis-disable]");
            if(isLenisDisable){
                if(window.Lenis){
                    window.Lenis.destroy();
                }
            }
        });
    
    }
    run (d){
        const userAgentData = navigator?.userAgentData;

        if (userAgentData?.brands.length){
            if(userAgentData.brands.indexOf('Safari') !== -1) {
                this.lerp = .8; 
                this.wheelMultiplier = 1;
            }
        }else{
            const parser = new UAParser();
            if(parser.getUA().toLowerCase().indexOf('safari') !== -1 && parser.getUA().toLowerCase().indexOf('chrome') === -1) {
                this.lerp = .8; 
                this.wheelMultiplier = 1;
            }
        }
        window.Lenis = new Lenis({
            lerp: this.lerp,
            wheelMultiplier: this.wheelMultiplier,
            // orientation: "horizontal"
        });
        window.Lenis.on('scroll', ScrollTrigger.update);
        
        const raf = (time) => {
            window.Lenis.raf(time);
            requestAnimationFrame(raf);
        };
        
        requestAnimationFrame(raf);
    }
}