/**
 * 粒子类
 */

import { Methods } from '../math';


// 边界的类型 [xmin, xmax, ymin, ymax]
type EdgeType = [number, number, number, number];

// 类的基础参数
interface ParticleBase {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  edges?: EdgeType;
  size?: number; // 粒子大小
}

// 类的 options 类型
interface ParticleOptions {
  color?: string; // 粒子颜色
}

// 类的 states 类型
interface ParticleStates {
  moving: boolean; // 是否处于运动中
}

// 类主体
export default class Particle {
  ctx: CanvasRenderingContext2D;
  // 参数
  options: Required<ParticleOptions> = {
    color: '#fff',
  };
  // 状态
  states: ParticleStates = {
    moving: false,
  };
  #x = 0; // 横坐标
  #y = 0; // 纵坐标
  #vx = 0; // 横向速度
  #vy = 0; // 纵向速度
  #edges: EdgeType = [0, 0, 0, 0]; // 边界
  #size = 5; // 半径大小
  constructor(
    ctx: CanvasRenderingContext2D,
    {
      vx = 0,
      vy = 0,
      x = 0,
      y = 0,
      edges = [0, 0, 0, 0],
      size = 5,
    }: ParticleBase = {},
    options: ParticleOptions = {},
  ) {
    this.ctx = ctx;
    this.setOptions(options);
    this.setSpeed(vx, vy);
    this.setPosition(x, y);
    this.setEdges(edges);
    this.setSize(size);
  }

  // 设置参数
  setOptions(options: ParticleOptions): void {
    Object.assign(this.options, options);
  }

  // 设置大小
  setSize(size: number): void {
    this.#size = size;
  }

  // 开始移动到目标点
  moveTo(tx: number, ty: number): void {

  }

  // 无动画移动
  moveToImmediately(x: number, y: number): void {
    this.setPosition(x, y);
  }

  // 速度反向
  reverseSpeed(): void {
    this.setSpeed(-this.#vx, -this.#vy);
  }

  // 设置当前位置
  setPosition(x: number | null = null, y: number | null = null): void {
    this.#x = x ?? this.#x;
    this.#y = y ?? this.#y;
  }

  // 设置速度
  setSpeed(vx: number | null = null, vy: number | null = null): void {
    this.#vx = vx ?? this.#vx;
    this.#vy = vy ?? this.#vy;
  }

  // 每一帧
  tick(): void {
    // 移动
    this.#x += this.#vx;
    this.#y += this.#vy;

    // 范围控制
    if(this.left <= this.xmin) {
      this.left = this.xmin;
      this.#vx *= -1;
    } else if(this.right >= this.xmax) {
      this.right = this.xmax;
      this.#vx *= -1;
    }
    if(this.top <= this.ymin) {
      this.top = this.ymin;
      this.#vy *= -1;
    } else if(this.bottom >= this.ymax) {
      this.bottom = this.ymax;
      this.#vy *= -1;
    }

    this.draw();
  }

  // 绘制
  draw(): void {
    this.ctx.save();
    this.ctx.fillStyle = this.options.color;
    this.ctx.beginPath();
    this.ctx.arc(this.#x, this.#y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  // 设置边界
  setEdges(edges: EdgeType): void {
    this.setEdgeX(edges[0], edges[1]);
    this.setEdgeY(edges[2], edges[3]);
  }
  // 设置 x 轴边界
  setEdgeX(min: number, max: number): void {
    this.#edges[0] = min;
    this.#edges[1] = max;
  }
  // 设置 y 轴边界
  setEdgeY(min: number, max: number): void {
    this.#edges[2] = min;
    this.#edges[3] = max;
  }
  // 获取边界
  get xmin(): number {
    return this.#edges[0];
  }
  get xmax(): number {
    return this.#edges[1];
  }
  get ymin(): number {
    return this.#edges[2];
  }
  get ymax(): number {
    return this.#edges[3];
  }

  // 大小
  get size(): number {
    return this.#size;
  }

  // 上下左右的边界
  // 上边界
  get top(): number {
    return this.#y - this.size;
  }
  set top(val: number) {
    this.#y = val + this.size;
  }
  // 下边界
  get bottom(): number {
    return this.#y + this.size;
  }
  set bottom(val: number) {
    this.#y = val - this.size;
  }
  // 左边界
  get left(): number {
    return this.#x - this.size;
  }
  set left(val: number) {
    this.#x = val + this.size;
  }
  // 右边界
  get right(): number {
    return this.#x + this.size;
  }
  set right(val: number) {
    this.#x = val - this.size;
  }

  // 坐标
  get x(): number {
    return this.#x || 0;
  }
  set x(val: number) {
    this.#x = val;
  }
  get y(): number {
    return this.#y || 0;
  }
  set y(val: number) {
    this.#y = val;
  }

  // 速度
  get vx(): number {
    return this.#vx || 0;
  }
  set vx(val: number) {
    this.#vx = val;
  }
  get vy(): number {
    return this.#vy || 0;
  }
  set vy(val: number) {
    this.#vy = val;
  }
}
