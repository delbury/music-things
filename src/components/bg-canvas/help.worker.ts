import CanvasAnimation from './CanvasAnimation';
import { InitCanvasWorkerEvent } from '/@types/index';

const _self: DedicatedWorkerGlobalScope = self as DedicatedWorkerGlobalScope;
_self.onmessage = ev => {
  const { canvas, width, height } = ev.data as InitCanvasWorkerEvent;
  const ca = new CanvasAnimation(canvas, width, height);
};
