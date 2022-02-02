import { BoundingBox } from '../public/js/BoundingBox.mjs';
import * as assert from 'assert';

describe('BoundingBox Initialized', () => {

    describe('#Bounding Box Constructor Test', function () {
        let box = new BoundingBox(20, 30, 40, 50);
        it('left should be 20', function () {
            assert.equal(box.left, 20);
        });

        it('top should be 30', function () {
            assert.equal(box.top, 30);
        });

        it('right should be 60', function () {
            assert.equal(box.right, 60);
        });

        it('bottom should be 80', function () {
            assert.equal(box.bottom, 80);
        });

        it('x should be 20', function () {
            assert.equal(box.x, 20);
        });

        it('y should be 30', function () {
            assert.equal(box.y, 30);
        });

        it('width should be 40', function () {
            assert.equal(box.width, 40);
        });

        it('height should be 50', function () {
            assert.equal(box.height, 50);
        });
    });
});

describe('BoundingBox collide', () => {
    describe('#BoundingBox collide Test', function () {
        let box = new BoundingBox(20, 30, 40 ,50);
        
        it('Collide shoud be true', function () {
            let otherBox = new BoundingBox(20, 30, 45, 50);
            assert.equal(box.collide(otherBox), true);

        });

        it('Collide shoul be null', () => {
            assert.equal(box.collide(), null);
        })

        it('Collide shoud be true', function () {
            let otherBox = new BoundingBox(20, 30, 40, 55);
            assert.equal(box.collide(otherBox), true);

        });

        it('Collide shoud be true', function () {
            let otherBox = new BoundingBox(25, 30, 40, 50);
            assert.equal(box.collide(otherBox), true);
        });

        it('Collide shoud be false', function () {
            let otherBox = new BoundingBox(0, 0, 0, 0);
            assert.equal(box.collide(otherBox), false);
        });

        it('Collide shoud be false', function () {
            let otherBox = new BoundingBox(0, 0, 50, 0);
            assert.equal(box.collide(otherBox), false);
        });
        
        it('Collide shoud be false', function () {
            let otherBox = new BoundingBox(0, 50, 0, 0);
            assert.equal(box.collide(otherBox), false);
        });

        it('Collide shoud be false', function () {
            let otherBox = new BoundingBox(0, 0, 0, 50);
            assert.equal(box.collide(otherBox), false);
        });
    })
})

describe('BoundingBox equals', () => {
    describe('#BoundingBox Equals Tests', function () { 
        let box = new BoundingBox(20, 30, 40 ,50);
        
        it('equals shoud be true', function () {
            let otherBox = new BoundingBox(20, 30, 40, 50);
            assert.equal(box.equals(otherBox), true);
        });

        it('equals shoud be false the_x', function () {
            let otherBox = new BoundingBox(0, 30, 40, 50);
            assert.equal(box.equals(otherBox), false);
        });

        it('equals shoud be false the_y', function () {
            let otherBox = new BoundingBox(20, 0, 40, 50);
            assert.equal(box.equals(otherBox), false);
        });

        it('equals shoud be false the_width', function () {
            let otherBox = new BoundingBox(20, 30, 5, 50);
            assert.equal(box.equals(otherBox), false);
        });

        it('equals shoud be false the_height', function () {
            let otherBox = new BoundingBox(20, 30, 40, 5);
            assert.equal(box.equals(otherBox), false);
        });

        it('equals shoud be false all inputs', function () {
            let otherBox = new BoundingBox(0, 0, 0, 0);
            assert.equal(box.equals(otherBox), false);
        });
    })

})
