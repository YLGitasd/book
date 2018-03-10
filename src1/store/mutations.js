import * as Types from './mutations-types';

const mutations = {
[Types.INCREMENT](state,count){//state是自动放进去的，默认当前就是state
    // if(isNaN(parseInt(count))) return
    state.count += count;
  },
  [Types.DECREMENT](state){
    state.count -= 1;
  }
};
export default mutations;

//宏 快捷键
