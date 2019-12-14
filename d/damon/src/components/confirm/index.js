import Confirm from './confirm'
import Vue from 'vue'


let instance ;

const confirmInstance = Vue.extend(Confirm);


const initInstance = (time) => {
    instance = new confirmInstance({data:{duration:time}}).$mount();
    document.body.append(instance.$el);
    return instance.showBlock();
}
export default initInstance