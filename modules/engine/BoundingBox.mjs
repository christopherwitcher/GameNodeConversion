function BoundingBox(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = this.left + width;
    this.bottom = this.top + height;
}

//checks if this bounding box collided with the other.
BoundingBox.prototype.collide = function (oth) {

    if (oth == null) { //DO NOT CHANGE TO ===
        return null;
    }

    if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) {
        return true;
    }

    return false;
};

BoundingBox.prototype.equals = function (oth) {

    return this.x === oth.x && this.y === oth.y && this.width === oth.width && this.height === oth.height;

}