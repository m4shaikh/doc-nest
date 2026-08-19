export const parseStringify = (value:unknown) => {
    return JSON.parse(JSON.stringify(value))
}