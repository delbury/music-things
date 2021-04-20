import { BaseCanvas } from '/@/libs/classes';
import Particle from './Particle';
import { Methods } from '/@/libs/math';

interface CanvasAnimationOptions {
  count?: number;
  transferToCanvas?: OffscreenCanvas; // 受控的 canvas
}
export default class CanvasAnimation extends BaseCanvas {
  private particles: Particle[] = []; // 粒子数组
  private particleCount = 5; // 粒子数量
  private prevAnimateTime = 0; // 上一次动画帧的时间
  private fps = 0; // 帧率
  private raf: number | null = null; // 动画帧回调的 id
  private ctrledCtx: OffscreenCanvasRenderingContext2D | null = null; // 受控 canvas 的 ctx
  constructor(
    canvas: HTMLCanvasElement | OffscreenCanvas,
    width: number,
    height: number,
    options: CanvasAnimationOptions = {},
  ) {
    super(canvas);

    this.setSize(width, height);
    this.init(options);
  }

  // 初始化
  init(options: CanvasAnimationOptions): void {
    // 设置粒子个数
    this.particleCount = options?.count ?? this.particleCount;

    // 初始化受控 canvas
    if(options.transferToCanvas) {
      options.transferToCanvas.height = this.height;
      options.transferToCanvas.width = this.width;
      this.ctrledCtx = options.transferToCanvas.getContext('2d');
    }

    for(let i = 0; i < this.particleCount; i++) {
      const [x, y] = Methods.randomPosition(0, this.width, 0, this.height);
      const [vx, vy] = Methods.randomSpeed(0, 2);
      this.particles.push(new Particle(this.ctx, {
        x,
        y,
        vx,
        vy,
        edges: [0, this.width, 0, this.height],
        size: Methods.randomValue(0.1, 2),
      }));
    }

    this.startTick();
  }

  // 开始动画
  startTick(): void {
    if(this.raf) {
      cancelAnimationFrame(this.raf);
    }
    this.tick();
  }

  // 动画帧
  tick(currentTime: number | null = null): void {
    this.clear(true); // 清除
    if(!currentTime) {
      // 设置开始动画帧的时间
      this.prevAnimateTime = performance.now();
      this.fps = 0;
    } else {
      // 计算 fps
      this.fps = +(1 / (currentTime - this.prevAnimateTime) * 1000).toFixed(2);
      this.prevAnimateTime = currentTime;

      // 否则开始动画
      this.particles.forEach(p => p.tick());

      // 离屏绘制
      if(this.ctrledCtx) {
        this.ctrledCtx.clearRect(0, 0, this.width, this.height);
        this.ctrledCtx.drawImage(this.canvas, 0, 0);
      }
    }
    // this.dispatch('fps', this.fps);
    this.raf = requestAnimationFrame(this.tick.bind(this));
  }

  // 获取 fps
  getFps(): number {
    return this.fps;
  }
}
