import { plainToClass } from "class-transformer"

export type Constructor<T> = {
    new (...args: any[]): T;
}

export async function plainToClassExclude<T> (cls: Constructor<T>, plain: Partial<T>): Promise<T> {
    const res = plainToClass(cls, plain, { excludeExtraneousValues: true })
    return res
  }