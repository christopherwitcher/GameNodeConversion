import { Animation } from '../modules/engine/Animation.mjs';
import * as assert from 'assert';

describe('Animation is Done', () => {

    describe('#isDone() on Greater than', function () {
        it('should return true', function () {
            let animation = new Animation();
            animation.elapsedTime = 5155;
            animation.totalTime = 4000;
            assert.equal(animation.isDone(), true);
        });
    });

    describe('#isDone() on Equal', function () {
        it('should return true', function () {
            let animation = new Animation();
            animation.elapsedTime = 4000;
            animation.totalTime = 4000;
            assert.equal(animation.isDone(), true);
        });
    });

});

describe('Animation is not Done', () => {
    describe('#isDone()', function () {
        it('should return false', function () {
            let animation = new Animation();
            animation.elapesedTime = 3000;
            animation.totalTime = 4000;
            assert.equal(animation.isDone(), false);
        });
    });
});



describe('Animation Current Frame', () => {
    describe('#currentFrame()', function () {
        it('elapsedTime Set Correctly', () => {
            let animation = new Animation();
            animation.elapsedTime = 30000;

            assert.equal(animation.elapsedTime, 30000);
        });

        it('frameDuration is set Correctly', () => {
            let animation = new Animation();
            animation.frameDuration = 5643;

            assert.equal(animation.frameDuration, 5643);
        })

        it('should return 5', function () {
            let animation = new Animation();
            animation.elapsedTime = 30000;
            animation.frameDuration = 5643;

            assert.equal(animation.currentFrame(), 5);
           
        });

        it('should return error', function () {
            let animation = new Animation();
            animation.elapsedTime = 30000;
            animation.frameDuration = 0;
            try{
                animation.currentFrame();
            }catch(error){
                assert.equal(error.message, 'Frame Duration must be greater than 0');
            }
            
        })
    })
});

/* describe('Animation isDone() Errors', () => {
    describe('#isDone() Errors', function () {
        it('should return error', function () {
            let animation = new Animation();
            animation.elapesedTime = '3000';
            animation.totalTime = 4000;
            assert.throws(() => {
                animation.isValid('3000')
            }, {
                message: 'Not Correct Format'
            });
        })
    })
}) */

