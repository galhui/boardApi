
export class BooleanBitValueTransformer {
    static to (value: boolean): Buffer {
      const buf = Buffer.alloc(1)
      if (value) {
        buf[0] = 1
      } else {
        buf[0] = 0
      }
  
      return buf
    }
  
    static from (value: Buffer): boolean {
      if (!value) {
        return false
      } else if (!Buffer.isBuffer(value)) {
        return false
      } else if (value.length < 1) {
        return false
      }
  
      return value[0] === 1
    }
  }
  
  export class BooleanIntValueTransformer {
    static to (value: boolean): number {
      if (value) {
        return 1
      } else {
        return 0
      }
    }
  
    static from (value: number): boolean {
      return value === 1
    }
  }
  