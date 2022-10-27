/**
 * Class representing a direction with its {@link Orientation|orientation} and {@link Order| order}.
 * @class Direction
 */
export class Direction {
    /**
     * Creates an instance of Direction.
     * @param {Orientation} orientation - The {@link Orientation|orientation} for this direction.
     * @param {Order} order - The {@link Order| order} for this direction.
     * @memberof Direction
     */
    constructor(orientation, order) {
        this.orientation = orientation
        this.order = order
    }

    /**
     * Given vector boundaries, returns their starting position according to this direction.
     * @param {{rowVector, columnVector}} [vectorBoundaries={rowVector, columnVector}] - An object containing 'rowVector' and/or 'columnVector', each containing an array their respective boundaries.
     * @return {{rowVector, columnVector}} An object containing 'rowVector' and/or 'columnVector' with their respective start position.
     * @memberof Direction
     */
    start(vectorBoundaries = {rowVector, columnVector}) {
        return this._move({}, {forward: true}, {start: true, vectorBoundaries})
    }

    /**
     * Given vector indexes, returns the next indexes according to this direction.
     *
     * @param {{rowVector, columnVector}} [vectorIndexes={rowVector, columnVector}] - An object containing 'rowVector' and 'columnVector' with their respective indexes.
     * @param {{wrapAround, vectorBoundaries}} [boundaries={wrapAround, vectorBoundaries} = {}] - An object containing wrap-around boundary info for optionally wrapping around from the start if the end is reached.
     * @return {{rowVector, columnVector}} An object containing 'rowVector' and 'columnVector' with their respective next indexes.
     * @memberof Direction
     */
    moveForward(vectorIndexes = {rowVector, columnVector}, boundaries = {wrapAround, vectorBoundaries} = {}) {
        return this._move(vectorIndexes, {forward: true}, boundaries)
    }

    /**
     * Given vector indexes, returns the previous indexes according to this direction.
     *
     * @param {{rowVector, columnVector}} [vectorIndexes={rowVector, columnVector}] - An object containing 'rowVector' and 'columnVector' with their respective indexes.
     * @param {{wrapAround, vectorBoundaries}} [boundaries={wrapAround, vectorBoundaries} = {}] - An object containing wrap-around boundary info for optionally wrapping around from the start if the end is reached.
     * @return {{rowVector, columnVector}} An object containing 'rowVector' and 'columnVector' with their respective previous indexes.
     * @memberof Direction
     */
    moveBackward(vectorIndexes = {rowVector, columnVector}, boundaries = {wrapAround, vectorBoundaries} = {}) {
        return this._move(vectorIndexes, {forward: false}, boundaries)
    }

    /**
     * Inner function to calculate vector indexes based on this direction.
     * @private
     * @param {{rowVector, columnVector}} [vectorIndexes={rowVector, columnVector}] - Current vector indexes, if any.
     * @param {Object} options - Options.
     * @param {boolean} options.forward - Whether to move forward in this direction or not.
     * @param {Object} boundaries - Boundary options.
     * @param {boolean} boundaries.start - Whether to return the starting vector indexes.
     * @param {boolean} boundaries.wrapAround - Whether to wrap the indexes around the end is reached.
     * @param {Object} boundaries.vectorBoundaries - The vector boundaries.
     * @return {{rowVector, columnVector}} - An object containing 'rowVector' and/or 'columnVector' with their respective calculated indexes.
     * @memberof Direction
     */
    _move(vectorIndexes = {rowVector, columnVector}, {forward}, {start, wrapAround, vectorBoundaries}) {
        vectorIndexes = {...vectorIndexes}
        for (let vector of this.orientation.vectors) {
            let order = this.order.invert(vector.inverted, !forward)

            if (start || wrapAround) {
                const vectorBoundary = order.boundaries(vectorBoundaries[vector.name])

                if (!(vector.name in vectorIndexes) || vectorIndexes[vector.name] === vectorBoundary.end) {
                    vectorIndexes[vector.name] = vectorBoundary.start

                    continue
                }
            }

            vectorIndexes[vector.name] += order.increase
        }
        return vectorIndexes
    }
}
