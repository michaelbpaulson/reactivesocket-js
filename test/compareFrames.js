'use strict';

var expect = require('chai').expect;
var friendlyHex = require('./friendlyHex');

var EXPECT_STRING = 'expects the buffers to have the same ';

console.log('Compare frames breaks up data in the following way');
console.log('0 - 4 length of frame');
console.log('4 - 6 Type of frame');
console.log('6 - 8 flags of frame');
console.log('8+ rest of data of frame');

/**
 * Compares the two buffers in a more readible way.
 * @param {Buffer} expected -
 * @param {Buffer} actual -
 * @returns {undefined} -
 */
module.exports = function compareFrames(expected, actual) {

    // comparing the header.
    // First the length
    var expectedLength = friendlyHex(expected.slice(0, 4));
    var actualLength = friendlyHex(actual.slice(0, 4));
    expect(actualLength, EXPECT_STRING + 'LENGTH (0 - 4)').
        to.equals(expectedLength);

    // then the type
    var expectedType = friendlyHex(expected.slice(4, 6));
    var actualType = friendlyHex(actual.slice(4, 6));
    expect(actualType, EXPECT_STRING + 'TYPE (4 - 6)').
        to.equals(expectedType);

    // then the flags
    var expectedFlags = friendlyHex(expected.slice(6, 8));
    var actualFlags = friendlyHex(actual.slice(6, 8));
    expect(actualFlags, EXPECT_STRING + 'FLAGS (6 - 8)').
        to.equals(expectedFlags);

    // Comparison of the rest of the data.
    var expectedRestOfData = friendlyHex(expected.slice(8));
    var actualRestOfData = friendlyHex(actual.slice(8));
    expect(actualRestOfData, EXPECT_STRING + 'REST OF DATA (8+)').
        to.equals(expectedRestOfData);
};

