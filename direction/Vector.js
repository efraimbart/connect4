/**
 * Abstract class representing a traversal vector.
 * @abstract
 * @class Vector
 */
class Vector {
    constructor({inverted} = {inverted: false}) {
        this.inverted = inverted
    }

    name
}

/**
 * Class representing the row traversal vector.
 * @class Row
 * @extends {Vector}
 */
export class Row extends Vector {
    name = 'rowVector'
}

/**
 * Class representing the column traversal vector.
 * @class Column
 * @extends {Vector}
 */
export class Column extends Vector {
    name = 'columnVector'
}
