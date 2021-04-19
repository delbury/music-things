import { BaseCanvas, Particle } from '/@/libs/classes';
import { Methods } from '/@/libs/math';

export default class CanvasAnimation extends BaseCanvas {
  private particles: Particle[] = []; // 粒子数组
  private particleCount = 5; // 粒子数量
  private prevAnimateTime = 0; // 上一次动画帧的时间
  private raf: number | null = null; // 动画帧回调的 id
  constructor(canvas: HTMLCanvasElement | OffscreenCanvas, width: number, height: number) {
    super(canvas);

    this.setSize(width, height);
    this.init();
  }

  // 初始化
  init(): void {
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
    } else {
      // 否则开始动画
      this.particles.forEach(p => p.tick());
    }

    this.raf = requestAnimationFrame(this.tick.bind(this));
  }
}
