/**
 * Events 自定义事件基础类
 */

type CallbackType = (...args: any[]) => any;

export default class Events {
  protected events: Map<string, Set<CallbackType>>;
  constructor() {
    this.events = new Map(); // 事件列表
  }

  // 绑定事件
  on(eventName: string, fn: CallbackType): void {
    const eventList = this.events.get(eventName);
    if(eventList) {
      eventList.add(fn);
    } else {
      const set = new Set<CallbackType>();
      set.add(fn);
      this.events.set(eventName, set);
    }
  }

  // 解绑事件
  off(eventName: string, fn: CallbackType): boolean {
    if(eventName) {
      const eventList = this.events.get(eventName);
      if(eventList) {
        if(fn) {
          // 解绑单个事件
          return eventList.delete(fn);
        } else {
          // 解绑全部同名事件
          return this.events.delete(eventName);
        }
      }
      return false;
    } else {
      // 全部解绑
      this.events = new Map();
      return true;
    }
  }

  // 触发事件
  dispatch(eventName: string, ...args: any[]): void {
    const eventList = this.events.get(eventName);
    if(eventList) {
      for(const fn of eventList) {
        fn(...args);
      }
    }
  }
}
