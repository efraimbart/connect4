/**
 * Class representing a subset of {@link Tile|tiles} heading in a particular direction.
 * @class BoardSubset
 * @extends {Array}
 */
export class TileSubset extends Array {
    /**
     * Creates an instance of TileSubset.
     * @param {Direction} direction - The {@link Direction|direction} this subset heads in.
     * @param {...Tile} tiles - The {@link Tile|tiles} to initially populate this subset with.
     * @memberof TileSubset
     */
    constructor(direction, ...tiles) {
        super(...tiles)
        this.direction = direction
    }

    /**
     * Adds the {@link Tile|tile} following this subset to this subset and returns the tile.
     * @return {Tile} The following {@link Tile|tile} if any, otherwise `undefined`.
     * @memberof TileSubset
     */
    addFollowingTile() {
        const tile = this.getFollowingTile()

        if (tile) this.push(tile)

        return tile
    }

    /**
     * Adds the {@link Tile|tile} preceding this subset to this subset and returns the tile.
     * @return {Tile} The preceding {@link Tile|tile} if any, otherwise `undefined`
     * @memberof TileSubset
     */
    addPrecedingTile() {
        const tile = this.getPrecedingTile()

        if (tile) this.unshift(tile)

        return tile
    }

    /**
     * Returns the {@link Tile|tile} following this subset.
     * @return {Tile} The {@link Tile|tile} following this subset.
     * @memberof TileSubset
     */
    getFollowingTile() {
        return this[this.length - 1].getNextTile(this.direction)
    }

    /**
     * Returns the {@link Tile|tile} preceding this subset.
     * @return {Tile} The {@link Tile|tile} preceding this subset.
     * @memberof TileSubset
     */
    getPrecedingTile() {
        return this[0].getPreviousTile(this.direction)
    }
}
