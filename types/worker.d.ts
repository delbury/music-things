export interface InitCanvasWorkerEvent {
  type: string;
  width: number;
  height: number;
  canvas: OffscreenCanvas;
}
