


import barba from '@barba/core';
/**
 * Twitter widgetを描画する
 */
export default class{

	constructor(){
        
        barba.hooks.afterOnce((data) => {
            this.run(document);
        });
        barba.hooks.after((data) => {
            this.run(data.next.container);
        });
        
	}
    run(d){
        const tweet = d.querySelector('.twitter-tweet');
        const twitter_tl = d.querySelector('.twitter-timeline');
        if(tweet||twitter_tl){
            if (typeof twttr === 'undefined') {
                var twitterjs = document.createElement("script");
                twitterjs.async = true;
                twitterjs.src = '//platform.twitter.com/widgets.js';
                document.getElementsByTagName('body')[0].appendChild(twitterjs);
            }
            else {
                twttr.widgets.load();
            }
        }
    }
}