import {Column, Row} from "./Vector.js";

/**
 * Abstract class representing an orientation with its traveral vectors.
 * @abstract
 * @class Orientation
 * @property vectors
 */
export class Orientation {
    /**
     * The traversal vectors for this orientation.
     * @static
     * @memberof Orientation
     */
    static vectors
}

/**
 * Abstract class representing a simple orientation with only 1 traversal vector.
 * @abstract
 * @class SimpleOrientation
 * @extends {Orientation}
 */
export class SimpleOrientation extends Orientation {
}

/**
 * Class representing the horizontal orientation.
 * @class Horizontal
 * @extends {SimpleOrientation}
 */
export class Horizontal extends SimpleOrientation {
    static vectors = [new Row()]
}

/**
 * Class representing the vertical orientation.
 * @class Vertical
 * @extends {SimpleOrientation}
 */
export class Vertical extends SimpleOrientation {
    static vectors = [new Column()]
}

/**
 * Class representing the backward diagonal (i.e. \\ ) orientation.
 * @class BackwardDiagonal
 * @extends {Orientation}
 */
export class BackwardDiagonal extends Orientation {
    static vectors = [new Row(), new Column()]
}

/**
 * Class representing the forward diagonal (i.e. / ) orientation.
 * @class ForwardDiagonal
 * @extends {Orientation}
 */
export class ForwardDiagonal extends Orientation {
    static vectors = [new Row({inverted: true}), new Column()]
}
