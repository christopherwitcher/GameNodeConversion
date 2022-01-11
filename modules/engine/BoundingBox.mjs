export class BoundingBox {
    left = 0;
    top = 0;
    right = 0;
    bottom = 0;
    constructor(the_x, the_y, the_width, the_height) {
        this.x = the_x;
        this.y = the_y;
        this.width = the_width;
        this.height = the_height;

        this.left = the_x;
        this.top = the_y;
        this.right = this.left + the_width;
        this.bottom = this.top + the_height;
    }
    //checks if this bounding box collided with the the_other.
    collide(the_other) {

        let output = null;
        if (the_other == null) { //DO NOT CHANGE TO ===
            output = null;
        } else if (this.right > the_other.left && this.left < the_other.right && this.top < the_other.bottom && this.bottom > the_other.top) {
            output = true;
        } else {
            output = false;
        }

        return output;
    }

    equals(the_other) {

        return this.x === the_other.x && this.y === the_other.y && this.width === the_other.width && this.height === the_other.height;

    }
}
