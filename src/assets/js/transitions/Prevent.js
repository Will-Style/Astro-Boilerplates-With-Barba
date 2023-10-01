
/**
 * Barbaを無効にするリンクの設定
 * trueを返すことで無効にできる
 * 
 * el : リンクエレメント
 * event : イベントオブジェクト
 * href : href要素
 */
export default ({el ,event ,href}) => {
        
    // 外部リンクはtarget="_blank"に
    let site_url = location.protocol + '//' + location.host;
    if (!href.startsWith(site_url)) {
        el.setAttribute('target','_blank');
        return true;
    }
    // アンカーリンクであり同一ページでなければbarbaを有効に
    let url = location.protocol + '//' + location.host + location.pathname;
    let extract_hash = href.replace(/#.*$/,"");
    if (href.startsWith(location.protocol + '//' + location.host)) {
        if (href.indexOf('#') > -1 && extract_hash != url ){
            return false;
        }
    }
    // 拡張子が該当する場合はtarget="_blank"に
    if (/\.(xlsx?|docx?|pptx?|pdf|jpe?g|png|gif|svg)/.test(href.toLowerCase())) {
        el.setAttribute('target','_blank');
        return true;
    }
    // 該当クラスに属していればBarbaを無効に
    let ignoreClasses = ['ab-item'];
    let ret = false;
    ignoreClasses.forEach((cls) => {
        if (el.classList.contains(cls)) {
            el.setAttribute('target','_blank');
            ret = true;
        }
    });
    if(ret){
        return true;
    }
    // 該当クラスに属していればBarbaを無効に
    if (el.classList.contains('no-barba')) {
        return true;
    }
};