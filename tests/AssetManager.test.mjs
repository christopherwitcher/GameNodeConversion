import {AssetManager} from '../modules/engine/AssetManager.mjs';
import * as assert from 'assert';

describe('AssetManager', () => {
        describe('#isDone()', function () {
            it('should return true', function () {
              let assetManager = new AssetManager();
              assert.equal(assetManager.isDone(), true);
            });
        });
    });

    

describe('AssetManager', () => {
    describe('#isDone()', function () {
        it('should return false', function () {
            let assetManager = new AssetManager();
            assetManager.successCount = 2;

          assert.equal(assetManager.isDone(), false);
        });
    });
});

