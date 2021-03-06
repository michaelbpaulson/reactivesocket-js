'use strict';

var data = require('../data');
var Frame = require('../../lib/protocol/frame');

var compareFrames = require('../compareFrames');

describe('Request Response', function() {
    it('Request Frame -- should create a request/response frame with no data.',
        function() {
            var expected = data.reqResFrame;
            var actual = Frame.getReqResFrame(data.STREAM_ID);

            compareFrames(expected, actual);
        });

    it('Request Frame -- should create a request/response frame with data.',
        function() {
            var expected = data.reqResFrameWithData;
            var actual = Frame.getReqResFrame(data.STREAM_ID, {
                data: data.REQ_RES_DATA
            });

            compareFrames(expected, actual);
        });

    it('Request Frame -- should create a request/response frame with meta.',
        function() {
            var expected = data.reqResFrameWithMeta;
            var actual = Frame.getReqResFrame(data.STREAM_ID, {
                data: data.REQ_RES_DATA,
                metadata: data.REQ_RES_META
            });

            compareFrames(expected, actual);
        });

    it('Request Frame -- create a req-res frame with meta (buffer)',
        function() {
            var expected = data.reqResFrameWithMeta;
            var actual = Frame.getReqResFrame(data.STREAM_ID, {
                data: new Buffer(data.REQ_RES_DATA),
                metadata: new Buffer(data.REQ_RES_META)
            });

            compareFrames(expected, actual);
        });
});
