export function singleValuePayload(type) {
    return value => ({
        type,
        payload: {
            value,
        }
    })
}