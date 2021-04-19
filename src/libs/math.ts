/**
 * @description 向量
 */
export class Vector {
  x: number; // x 轴分量
  y: number; // y 轴分量
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // 获取长度
  get length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  // 相加
  add(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  // 相减
  subtract(vector: Vector): Vector {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  // 乘常数
  multiply(scale: number): Vector {
    return new Vector(this.x * scale, this.y * scale);
  }

  // 点积
  dotProduct(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y;
  }

  // 垂直的向量
  perpendicular(clockwise = true): Vector {
    const sym = clockwise ? 1 : -1;
    return new Vector(this.y * sym, -this.x * sym);
  }

  // 归一化
  normalize(reverse = false): Vector {
    const len = this.length;
    if(len === 0) {
      return new Vector(0, 0);
    } else {
      return reverse ? new Vector(-this.x / len, -this.y / len) : new Vector(this.x / len, this.y / len);
    }
  }

  // 反归一化
  antiNormalize(len: number): Vector {
    return new Vector(this.x * len, this.y * len);
  }

  // 获取垂直单位向量
  verticalUnitVector(clockwise: boolean): Vector {
    return this.perpendicular(clockwise).normalize();
  }

  // 获取边向量
  edgeVector(vector: Vector): Vector {
    return this.subtract(vector);
  }

  // 反向
  reverse(): Vector {
    return new Vector(-this.x, -this.y);
  }

  // 方向象限相同
  isSameQuadrant(vector: Vector): boolean {
    const x1 = this.x === 0 ? 0 : (this.x / (Math.abs(this.x)));
    const y1 = this.y === 0 ? 0 : (this.y / (Math.abs(this.y)));
    const x2 = vector.x === 0 ? 0 : (vector.x / (Math.abs(vector.x)));
    const y2 = vector.y === 0 ? 0 : (vector.y / (Math.abs(vector.y)));
    return x1 === x2 && y1 === y2;
  }

  // 两向量间的弧度
  radianWith(vector: Vector): number {
    return Math.acos(this.dotProduct(vector) / this.length / vector.length);
  }

  // 判断两个向量之间的夹角是否锐角
  // <90：锐角，90：直角，>90：钝角
  angleWith(vector: Vector): number {
    return this.radianWith(vector) / Math.PI * 180;
  }
}

/**
 * @description 投影
 */
export class Projection {
  min: number; // 投影的最小坐标点
  max: number; // 投影的最大坐标点
  constructor(arr: number[]) {
    this.min = Math.min(...arr);
    this.max = Math.max(...arr);
  }

  // 是否重叠，返回重叠部分的长度
  overlapWith(projection: Projection): number | null {
    const flag = !(this.min > projection.max || this.max < projection.min);

    // 计算重叠到分离的最短长度
    if(flag) {
      const arr = [this.min, this.max, projection.min, projection.max].sort((a, b) => a - b);
      // 当一个投影完全在另一个投影中时，需要区分
      if(Math.abs(arr[3] - arr[0] - Math.max(this.max - this.min, projection.max - projection.min)) <= Number.EPSILON) {
        // 部分重叠
        return Math.min(arr[2] - arr[0], arr[3] - arr[1]);
      } else {
        return arr[2] - arr[1];
      }
    }
    return null;
  }
}

// 工具类
export class Methods {
  // 范围内随机值
  static randomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  // 随机颜色
  static randomColor(): string {
    return '#' + Math.floor(Math.random() * 2 ** 24).toString(16);
  }

  // 随机位置
  static randomPosition(xmin = 0, xmax = 0, ymin = 0, ymax = 0): ReturnTypeXY {
    return [
      Methods.randomValue(xmin, xmax),
      Methods.randomValue(ymin, ymax),
    ];
  }

  // 随机速度
  static randomSpeed(min = 0, max = 0): ReturnTypeXY {
    return [
      Methods.randomValue(min, max) * (Math.random() > 0.5 ? 1 : -1),
      Methods.randomValue(min, max) * (Math.random() > 0.5 ? 1 : -1),
    ];
  }

  // 随机正负值范围
  static randomPlusMinus(min = 0, max = 0): number {
    return Methods.randomValue(min, max) * (Math.random() > 0.5 ? 1 : -1);
  }
}
