import {BackwardDiagonal, ForwardDiagonal, Horizontal, Vertical} from "./direction/Orientation.js";
import {Ascending, Descending} from "./direction/Order.js";
import {Direction} from "./direction/Direction.js";
import {Board} from "./board/Board.js";
import {TileSubset} from "./board/TileSubset.js";

function connectFourWinner(strArr) {

    const playerValue = strArr.shift()
    //Alternative: const boardArray = strArr.map(row => row.replace('(', '').replace(')', '').split(','))
    const boardArray = strArr.map(row => [...row.matchAll(/[(,](.)/g)].map(match => match[1]))
    const board = new Board(boardArray)

    return traverseTilesForMatch(board, playerValue)
}

/**
 *
 * Given a {@link Board|board}, traverses through the tiles with the current player's value and checks in each direction to see if they are part of a potential winning setup.
 * @param {Board} board - The board instance to traverse.
 * @param {string} playerValue - The current player's color value, represented as 'R' for Red and 'Y' for Yellow.
 * @return {string} '(RxC)' where R=row and C=column if a winning tile is found, otherwise 'none'.
 */
function traverseTilesForMatch(board, playerValue) {
    const primaryTraversalDirection = new Direction(Horizontal, Ascending)
    const secondaryTraversalDirection = new Direction(Vertical, Descending)

    for (let tile of board.traverse(primaryTraversalDirection, secondaryTraversalDirection, playerValue)) {

        const matchDirections = [
            new Direction(Horizontal, Ascending),
            new Direction(Vertical, Descending),
            new Direction(ForwardDiagonal, Descending),
            new Direction(BackwardDiagonal, Descending)
        ]

        for (let direction of matchDirections) {
            const matchTile = checkDirectionForMatch(tile, direction, playerValue)
            if (matchTile) {
                return matchTile.toString('($rowx$column)')
            }
        }
    }

    return 'none'
}

/**
 * Given a {@link Tile|tile} and {@link Direction|direction}, checks if the tile is part of potential winning setup in that direction, returning the winning tile if found.
 * @param {Tile} tile - The tile to check.
 * @param {Direction} direction - The direction to check in.
 * @param {string} playerValue - The current player's color value, represented as 'R' for Red and 'Y' for Yellow.
 * @return {Tile} The winning empty tile if found, otherwise `undefined`.
 */
function checkDirectionForMatch(tile, direction, playerValue) {
    const tiles = new TileSubset(direction, tile)

    const threeTiles = checkForThreeTiles(tiles, playerValue)
    if (!threeTiles) return

    const emptyTile = checkForSupportedEmptyTile(threeTiles)
    if (!emptyTile) return

    return emptyTile
}


/**
 * Given a {@link TileSubset|subset of tiles} (containing 1 {@link Tile|tile}), checks if the following 2 tiles contain the current player's value, and returns the subset (now containing 3 tiles) if they do.
 * @param {TileSubset} tiles - The subset of tiles, containing 1 tile.
 * @param {string} playerValue - The current player's color value, represented as 'R' for Red and 'Y' for Yellow.
 * @return {TileSubset} The subset of tiles, now containing 3 tiles, if successful, otherwise `undefined`.
 */
function checkForThreeTiles(tiles, playerValue) {
    while (tiles.length < 3) {
        const tile = tiles.addFollowingTile()

        if (!tile || tile.value !== playerValue) return
    }

    return tiles
}

/**
 * Given a {@link TileSubset|subset of 3 tiles}, checks the preceding and following tiles to see if either of them are empty and supported below, returning whichever is.
 * @param {TileSubset} threeTiles - The subset of tiles, containing 3 tiles.
 * @return {Tile} The preceding or following tile, if empty and supported, otherwise `undefined`.
 */
function checkForSupportedEmptyTile(threeTiles) {
    const predecingTile = threeTiles.getPrecedingTile()
    if (predecingTile && predecingTile.isEmpty() && predecingTile.isSupported()) {
        return predecingTile
    }

    const followingTile = threeTiles.getFollowingTile()
    if (followingTile && followingTile.isEmpty() && followingTile.isSupported()) {
        return followingTile
    }
}





// keep this function call here
// console.log(connectFourWinner(readline()));
console.log(connectFourWinner(["R",
"(x,x,x,x,x,x,x)",
"(x,x,x,x,x,x,x)",
"(x,x,x,x,x,x,x)",
"(Y,Y,x,x,Y,x,R)",
"(Y,Y,R,R,Y,R,x)",
"(Y,x,R,R,R,Y,Y)"]));
