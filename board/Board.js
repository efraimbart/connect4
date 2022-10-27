import {Direction} from "../direction/Direction.js";
import {Vertical} from "../direction/Orientation.js";
import {Descending} from "../direction/Order.js";

/**
 * Abstract class representing a board.
 * @abstract
 * @class BoardBase
 */
export class BoardBase {
    /**
     * Creates an instance of BoardBase.
     * @param {string[][]} board - The 2D array representation of a board.
     * @memberof BoardBase
     */
    constructor(board) {
        this._board = board
    }

    /**
     * Inner function to return a {@link Tile|tile} on the board for a given set of vector indexes.
     * @private
     * @param {Object} vectorIndexes - The vector indexes at which to get the {@link Tile|tile}.
     * @param {Number} vectorIndexes.rowVector
     * @param {Number} vectorIndexes.columnVector
     * @return {Tile} The given tile at these indexes.
     * @memberof BoardBase
     */
    _getTile({rowVector, columnVector}) {
        if (!this._board[columnVector] || !this._board[columnVector][rowVector]) return

        return new Tile(this._board, {rowVector, columnVector})
    }
}

/**
 * Class representing a board.
 *
 * @class Board
 * @extends {BoardBase}
 */
export class Board extends BoardBase {
    /**
     * Creates an instance of Board.
     * @param {string[][]} board - The 2D array representation of a board.
     * @memberof Board
     */
    constructor(board) {
        super(board)
        this.vectorBoundaries = {
            rowVector: [0, board[0].length - 1],
            columnVector: [0, board.length - 1]
        }
    }

    /**
     * Given set of vector indexes, returns a {@link Tile|tile} on the board at those indexes.
     * @private
     * @param {Object} vectorIndexes - The vector indexes at which to get the {@link Tile|tile}.
     * @param {Number} vectorIndexes.rowVector
     * @param {Number} vectorIndexes.columnVector
     * @return {Tile} The given tile at these indexes.
     * @memberof BoardBase
     */
    getTile({rowVector, columnVector}) {
        return this._getTile({rowVector, columnVector})
    }

    /**
     * Given directions, traverses the board in the primary {@link Direction|direction}, moving in the secondary {@link Direction|direction} only after reaching a boundary and wrapping around, while optionally filtering out irrelevant tiles.
     * @param {Direction} primaryDirection - The primary {@link Direction|direction} of traversal. Should contain a {@link SimpleOrientation|simple orientation}.
     * @param {Direction} secondaryDirection - The secondary {@link Direction|direction} of traversal. Should contain a {@link SimpleOrientation|simple orientation}
     * @param {*} filter - An optional filter to exclude irrelevant tiles.
     * @yields The next {@link Tile|tile} in the traversal.
     * @memberof Board
     */
    * traverse(primaryDirection, secondaryDirection, filter) {
        const primaryStartingPoint = primaryDirection.start(this.vectorBoundaries)
        const secondaryStartingPoint = secondaryDirection.start(this.vectorBoundaries)

        let tile = this._getTile({...secondaryStartingPoint, ...primaryStartingPoint})

        do {
            if (!filter || tile.value === filter) {
                yield tile
            }

            const nextTile = tile.getNextTile(primaryDirection)

            if (nextTile) {
                tile = nextTile
            } else {
                tile = tile.getNextTile(primaryDirection, {wrapAround: true, vectorBoundaries: this.vectorBoundaries})
                tile = tile.getNextTile(secondaryDirection)
            }
        }
        while (tile)
    }
}

/**
 * Class representing a single tile on a board.
 * @class Tile
 * @extends {BoardBase}
 */
export class Tile extends BoardBase {
    /**
     * Creates an instance of Tile.
     * @param {string[][]} board - The 2D array representation of a board.
     * @param {Object} vectorIndexes - The vector indexes of this tile.
     * @param {Number} vectorIndexes.rowVector
     * @param {Number} vectorIndexes.columnVector
     * @memberof Tile
     */
    constructor(board, {rowVector, columnVector}) {
        super(board)
        this.rowVector = rowVector
        this.columnVector = columnVector
        this.value = this._board[columnVector][rowVector]
    }

    /**
     * The human-readable row number of this tile.
     *
     * @readonly
     * @memberof Tile
     */
    get row() {
        return this.columnVector + 1
    }

    /**
     * The human-readable column number of this tile.
     *
     * @readonly
     * @memberof Tile
     */
    get column() {
        return this.rowVector + 1
    }

    /**
     * Return the tile after this one in given direction.
     * @param {Direction} direction - The direction to head in.
     * @param {{wrapAround, vectorBoundaries}} [boundaries={}] - Wrap-around boundary options.
     * @return {Tile} The tile after this one if any, otherwise `undefined`.
     * @memberof Tile
     */
    getNextTile(direction, boundaries = {}) {
        return this._getTile(direction.moveForward(this, boundaries))
    }

    /**
     * Return the tile before this one in given direction.
     * @param {Direction} direction - The direction to head in, in reverse.
     * @param {{wrapAround, vectorBoundaries}} [boundaries={}] - Wrap-around boundary options.
     * @return {Tile} The tile before this one if any, otherwise `undefined`.
     * @memberof Tile
     */
    getPreviousTile(direction, boundaries = {}) {
        return this._getTile(direction.moveBackward(this, boundaries))
    }

    /**
     * Checks whether this tile is empty.
     * @return {boolean} True if this tile is empty, otherwise false.
     * @memberof Tile
     */
    isEmpty() {
        return this.value === 'x'
    }

    /**
     * Checks whether this tile is supported.
     * @return {boolean} True if there are no empty tiles beneath this tile, otherwise false.
     * @memberof Tile
     */
    isSupported() {
        const supportingTile = this.getPreviousTile(new Direction(Vertical, Descending))
        return !supportingTile || !supportingTile.isEmpty()
    }

    /**
     * Returns a representation of this tile as a string.
     * @param {string} [format='$row:$column:$value'] - A format string. '$row' will be replaced with the row, '$column' will be replaced with the column, and '$value' will be replaced with the value.
     * @return {string} A representation of this tile as a string according to the format parameter.
     * @memberof Tile
     */
    toString(format = '$row:$column:$value') {
        return format.replace('$row', this.row).replace('$column', this.column).replace('$value', this.value)
    }
}
