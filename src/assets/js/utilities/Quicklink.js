import {listen} from 'quicklink';
export default class{
	
	constructor(){
        // Quicklinkは開発環境では無効に
        if ( import.meta.env.MODE != "development") {
            barba.hooks.once((data) => {
                listen();
            });
            
            barba.hooks.after((data) => {
                listen();
            });

        }
	}
    
}