import CanvasAnimation from './CanvasAnimation';
import { InitCanvasWorkerEvent, CanvasWorkerPostEvent } from '/@types/index';

const _self: DedicatedWorkerGlobalScope = self as DedicatedWorkerGlobalScope;
let ca: CanvasAnimation | null = null;

_self.onmessage = ev => {
  const { canvas, width, height, count, type } = ev.data as InitCanvasWorkerEvent;

  if(type === 'init') {
    // 初始化
    // 创建离屏缓存 screen
    // const offcanvas = new OffscreenCanvas(width, height);
    // const ca = new CanvasAnimation(offcanvas, width, height, { count, transferToCanvas: canvas });

    ca = new CanvasAnimation(canvas, width, height, { count });

    ca.on('fps', (fps: number) => {
      const ev: CanvasWorkerPostEvent<number> = {
        type: 'fps',
        data: fps,
      };
      _self.postMessage(ev);
    });
  }
};
