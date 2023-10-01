
import barba from '@barba/core';
/**
 * ヘッドタグの置き換え
 */
export default class{

    constructor(){
        barba.hooks.beforeEnter((data) => {
            this.run(data);
        });
    }
    run(data){
        const head = document.head;
    
        const newPageRawHead = data.next.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0];
        const newPageHead = document.createElement('head');
        newPageHead.innerHTML = newPageRawHead;
    
        const removeHeadTags = [ 
            "meta[name='keywords']"
            ,"meta[name='description']"
            ,"meta[property^='og']"
            ,"meta[name^='twitter']"
            ,"meta[itemprop]"
            ,"link[itemprop]"
            ,"link[rel='prev']"
            ,"link[rel='next']"
            ,"link[rel='canonical']"
        ].join(',');
        
        const headTags = head.querySelectorAll(removeHeadTags);
    
        for(let i = 0; i < headTags.length; i++ ){
            head.removeChild(headTags[i]);
        }
        
        const newHeadTags = newPageHead.querySelectorAll(removeHeadTags);
    
        for(let i = 0; i < newHeadTags.length; i++ ){
            head.appendChild(newHeadTags[i]);
        }
    }
}