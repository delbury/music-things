type InitCanvasWorkerEventType = 'init' | 'fps';
export declare interface InitCanvasWorkerEvent {
  type: InitCanvasWorkerEventType;
  width: number;
  height: number;
  canvas: OffscreenCanvas;
  count?: number; // 粒子数量
}

export declare interface CanvasWorkerPostEvent<T = any> {
  type: InitCanvasWorkerEventType;
  data: T;
}
