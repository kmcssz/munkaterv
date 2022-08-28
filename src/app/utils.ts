
export function ensure<T>(
    argument: T | undefined | null,
    message: string = 'This value was promised to be there.'
): T {
    if (argument === undefined || argument === null) {
        throw new TypeError(message)
    }

    return argument
}

export function first<T>(
    array: T[],
): T {
    if (ensure(array).length === 0) {
        throw new TypeError("Empty array passed")
    }

    return array[0]
}

export function filterComparator<T>(
    array: T[],
    comparator: (t: T) => boolean,
    message: string,
): T {
    const result = array.filter(comparator)
    if (result.length != 1) {
        throw new Error(message)
    }
    return result[0]
}
