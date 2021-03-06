'use strict';

var CONSTANTS = require('./../constants');
var LOG = require('./../../defaultLogger');

var getFrameHeader = require('./getFrameHeader');
var encodePayload = require('./encodePayload');
var metadata = require('./metadata');

var FLAGS = CONSTANTS.FLAGS;
var TYPES = CONSTANTS.TYPES;

/**
 * @param {Number} streamId -
 * @param {Object} payload The payload of the frame.
 * @param {Boolean} isCompleted - If the this response is the last response for
 * this setup - request flow.
 * @returns {Buffer} The encoded frame.
 */
function getResponseFrame(streamId, payload, isCompleted) {

    LOG.debug({streamId: streamId, payload: payload, isCompleted: isCompleted},
              'getResponseFrame: entering');

    var payloadBuf = encodePayload(payload);
    var flags = isCompleted && FLAGS.COMPLETE || FLAGS.NONE;

    var headerBuf = getFrameHeader(payloadBuf.length, TYPES.RESPONSE,
                                   flags, streamId);

    // Attach the metadata flag if there is a metadata payload
    if (payload && payload.metadata) {
        metadata.flagMetadata(headerBuf);
    }

    var buf = Buffer.concat([headerBuf, payloadBuf]);

    LOG.debug({responseFrame: buf}, 'returning response Frame');

    return buf;
}

module.exports = getResponseFrame;
