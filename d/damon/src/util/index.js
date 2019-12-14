export function fangdou(wait,fn){
    let timer;
    return function (){
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, wait);
    }
}


export function jieliu(wait,fn){
    let timer;
    return function(){
        if(timer) return;
        timer = setTimeout(() => {
            fn();
            clearTimeout(timer);
        }, wait);
    }
}