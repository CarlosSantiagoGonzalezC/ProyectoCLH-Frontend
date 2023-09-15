import { expect, test } from 'vitest'
import { login } from './login'

let goodRes = 'ok'

test('login response: ', async () => {
    expect(login()).toBe(goodRes)
})