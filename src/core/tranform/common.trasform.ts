import lodash from 'lodash'
import crypto from 'crypto'
import { Transform } from 'class-transformer'

export const TransformPassword = () : PropertyDecorator => Transform(params => {
    const value = params.value
    if (!lodash.isString(value)) {
        return ''
    }

    return crypto.createHash('sha512').update(value).digest('base64')
}, { })

export const TransformBoolean = () : PropertyDecorator => Transform(params => {
    const v = params.value
    if (lodash.isBoolean(v)) {
        return v
    } else if (lodash.isString(v)) {
        return v === 'true'
    }

    return false
})