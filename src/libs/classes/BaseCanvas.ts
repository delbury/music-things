/**
 * canvas 2d 基础类
 */
import Events from './Events';

// 配置参数类型
interface BaseCanvasOptions {
  bgColor?: string; // 背景颜色
}
export default class BaseCanvas extends Events {
  public canvas: HTMLCanvasElement | OffscreenCanvas;
  public ctx: CanvasRenderingContext2D;
  protected options: Required<BaseCanvasOptions> = {
    bgColor: '',
  };
  constructor(canvas: HTMLCanvasElement | OffscreenCanvas, options: BaseCanvasOptions = {}) {
    super();
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if(!this.ctx) throw Error('can\'t get canvas 2d context');
    this.setDefault(options);
  }

  // 设置配置
  setDefault(options: BaseCanvasOptions): void {
    Object.assign(this.options, options);
  }

  // 设置 canvas 的宽高
  setSize(w: number, h: number): void {
    this.canvas.width = w;
    this.canvas.height = h;

    this.clear(true);
  }

  // 清除
  clear(fillWithBgColor = false): void {
    if(fillWithBgColor && this.options.bgColor) {
      // 填充
      this.ctx.save();
      this.ctx.fillStyle = this.options.bgColor;
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.restore();
    } else {
      // 清除
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  // 获取 canvase 的高度
  get height(): number {
    return this.canvas.height;
  }
  // 获取 canvase 的宽度
  get width(): number {
    return this.canvas.width;
  }
}
