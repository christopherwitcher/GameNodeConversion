import {AssetManager} from '../modules/engine/AssetManager.mjs';
import * as assert from 'assert';
/*let AssetManager = class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    }
    //
    queueDownload(path) {
        console.log(path.toString());
        this.downloadQueue.push(path);
    }
    isDone() {
        return (this.downloadQueue.length === this.successCount + this.errorCount);
    }
    //loads all the image files.
    downloadAll(callback) {
        if (this.downloadQueue.length === 0)
            window.setTimeout(callback, 100);
        for (var i = 0; i < this.downloadQueue.length; i++) {
            var path = this.downloadQueue[i];
            var img = new Image();
            var that = this;
            img.addEventListener("load", function () {
                console.log("dun: " + this.src.toString());
                that.successCount += 1;
                if (that.isDone()) { callback(); }
            });
            img.addEventListener("error", function () {
                that.errorCount += 1;
                if (that.isDone()) { callback(); }
            });
            img.src = path;
            this.cache[path] = img;
        }
    }
    //gets an asset to add to the cache.
    getAsset(path) {
        //console.log(path.toString());
        return this.cache[path];
    }
};
 */



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

