
export function range(start, end) {
    return new Array(end + 1 - start).fill().map((d, i) => i + start)
}