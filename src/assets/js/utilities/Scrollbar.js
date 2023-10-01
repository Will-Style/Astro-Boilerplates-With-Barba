import barba from "@barba/core";
import UAParser from "ua-parser-js";
import { 
  OverlayScrollbars, 
  ScrollbarsHidingPlugin, 
  SizeObserverPlugin, 
  ClickScrollPlugin 
} from 'overlayscrollbars';

import ScrollTrigger from "gsap/ScrollTrigger";

export default class {
   
    constructor() {
        // Barbaが有効な場合
        const ua = UAParser();
        const os = ua.os;
        this.isIOS = false;

        if (os.name == "iOS") {
            this.isIOS = true;
        }
        barba.hooks.beforeOnce((data) => {
            OverlayScrollbars.plugin([ScrollbarsHidingPlugin,SizeObserverPlugin,ClickScrollPlugin]);
            this.run(document);
        });
        window.bodyScrollbarsInit = () => {
            this.run(); 
        };
        window.drawerScrollbarsInit = () => {
            this.drawer(); 
        };
    }
    run(d) {
        try{
            
            window.bodyScrollbars = OverlayScrollbars(document.querySelector('body'), 
            {
                showNativeOverlaidScrollbars: this.isIOS,
                scrollbars:{
                    autoHide: 'scroll',
                    clickScroll: true
                },
                overflow: {
                    x: 'hidden',
                },
                cancel: {
                    nativeScrollbarsOverlaid: true,
                    body: null,
                }
            },{
                
                updated(osInstance, onUpdatedArgs) {
                    if(onUpdatedArgs.updateHints.sizeChanged 
                        && !onUpdatedArgs.updateHints.contentMutation
                        && !onUpdatedArgs.updateHints.directionChanged
                        && !onUpdatedArgs.updateHints.heightIntrinsicChanged
                        && !onUpdatedArgs.updateHints.hostMutation
                        && !onUpdatedArgs.updateHints.overflowAmountChanged
                        && !onUpdatedArgs.updateHints.overflowEdgeChanged
                        && !onUpdatedArgs.updateHints.overflowStyleChanged
                    ) {
                        
                        ScrollTrigger.refresh();
                    }
                }
            });


        } catch (e){
            console.log(e);
        }
    }
    drawer(){

        window.drawerScrollbars = OverlayScrollbars(document.querySelector('[data-drawer-container]'), 
        {
            showNativeOverlaidScrollbars: this.isIOS,
            scrollbars:{
                // autoHide: 'scroll',
                clickScroll: true
            },
            overflow: {
                x: 'hidden',
            },
            cancel: {
                nativeScrollbarsOverlaid: true,
                body: null,
            }
        });
    }
}
