/**
 * Abstract class representing an order.
 * @abstract
 * @class Order
 */
export class Order {
    /**
     * Given an array of boundaries, assigns them as either start or end and returns them as an object.
     * @static
     * @param {Number[]} boundaries - The boundaries to assign.
     * @returns {Object} A boundaries object containing 'start' and 'end' properties.
     * @memberof Order
     */
    static boundaries(boundaries) {
    }

    /**
     * Compares all the inversion conditions and inverts if necessary.
     * @static
     * @param {...boolean} invert - Inversion conditions.
     * @memberof Order
     */
    static invert(...invert) {
    }

    /**
     * The value to add to the previous element to progress forward.
     * @static
     * @memberof Order
     */
    static increase
}

/**
 * Class representing the ascending order.
 * @class Ascending
 * @extends {Order}
 */
export class Ascending extends Order {
    static boundaries(boundaries) {
        return {
            start: Math.min(...boundaries),
            end: Math.max(...boundaries)
        }
    }

    static invert(...invert) {
        const inverted = invert.reduce((previousValue, currentValue) => currentValue !== previousValue)
        return inverted ? Descending : this
    }

    static increase = +1
}

export class Descending extends Order {
    static boundaries(boundaries) {
        return {
            start: Math.max(...boundaries),
            end: Math.min(...boundaries)
        }
    }

    static invert(...invert) {
        const inverted = invert.reduce((previousValue, currentValue) => currentValue !== previousValue)
        return inverted ? Ascending : this
    }

    static increase = -1
}
