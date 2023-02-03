window.Promise || loadPolyfill();

function loadPolyfill() {
    var js = document.createElement('script');
    js.src = "https://cdn.polyfill.io/v2/polyfill.js";
    document.head.appendChild(js);
}; "use strict";

/**
 * Function to create the instance that will save info to identify the chunk/segment resource
 * This object is needed to be passed in as input param to getQubitResource, and also as the output param of the resouce
 * Note - This type is used as input param to getQBRChunk method to identify the chunk in unambigiuous way.
 * To specify the chunk, as of now, either combination of trackIdx and sequence should be used
 * OR, combination of resourceURL and byteRange should be present
 * Latter is the preffered approach.
 * To specify the chunk to be complete entity refferd by resourceURL, startByte in byteRange should be 0 and endByte should be set to -1
 * Values which user does not want to set, should be set with undefined
 * Note attribytes initStartByte and initEndByte in the object are for future versions of the SDK and should be ignored when set in return value of getQBRChunk
 * @param {Number} [trackIdx] Track id of the representation to which chunk belongs
 * @param {Number} [bitrate] Bitrate of the representation to which chunk belongs in bps (Mandatory)
 * @param {Number} [sequence] Sequence number of the chunk in the representation
 * @param {String} [resourceURL] Resource url of the chunk
 * @param {Number} [startTime] Start time of the chunk in milliseconds
 * @param {Number} [duration] Duration of the chunk in milliseconds
 * @param {Number} [startByte] Start byte of the chunk
 * @param {Number} [endByte] End byte of the chunk
 * @returns {Object} ChunkInformation
 */
var MMChunkInformation = function MMChunkInformation(trackIdx, bitrate, sequence, resourceURL, startTime, duration, startByte, endByte) {
    var obj = {};

    if (trackIdx === undefined) {
        obj.trackIdx = -1;
    } else {
        obj.trackIdx = trackIdx;
    }

    if (trackIdx === undefined) {
        obj.trackIdx = -1;
    } else {
        obj.trackIdx = trackIdx;
    }

    if (bitrate === undefined) {
        obj.bitrate = -1;
    } else {
        obj.bitrate = bitrate;
    }

    if (sequence === undefined) {
        obj.sequence = -1;
    } else {
        obj.sequence = sequence;
    }

    if (startTime === undefined) {
        obj.startTime = -1;
    } else {
        obj.startTime = startTime;
    }

    if (startByte === undefined) {
        obj.startByte = -1;
    } else {
        obj.startByte = startByte;
    }

    if (endByte === undefined) {
        obj.endByte = -1;
    } else {
        obj.endByte = endByte;
    }

    if (duration === undefined) {
        obj.duration = -1;
    } else {
        obj.duration = duration;
    }

    obj.initStartByte = -1;
    obj.initEndByte = -1;
    obj.resourceURL = resourceURL || null;
    return obj;
};
/**
 * Function to create the instance that will save info on the representation
 * @param {Number} trackIdx Track Id of the representation
 * @param {Number} bitrate Bitrate of the representation in bps (Mandatory)
 * @param {Number} width Width of the representation
 * @param {Number} height Height of the representation
 * @param {String} codecIdentifier identifier specifying the codec
 * @returns {Object} Representation
 */


var MMRepresentation = function MMRepresentation(trackIdx, bitrate, width, height, codecIdentifier, segmentInfo) {
    var obj = {};
    obj.trackIdx = trackIdx || 0;
    obj.bitrate = bitrate || 0;
    obj.width = width || 0;
    obj.height = height || 0;
    obj.codecIdentifier = codecIdentifier || "";
    obj.segmentInfo = segmentInfo || [];
    return obj;
};
/**
 * Function to create the instance presentationInfo
 * @param {Boolean} isLive: If the presentation is live.
 * @param {Number} duration: Duration of the representation in millisec. For live, it should be set to -1 (Mandatory).
 * @param {Object} representationArray: Array of representations in the presentation.
 * @returns {Object} MMPresentationInfo
 */


var MMPresentationInfo = function MMPresentationInfo(isLive, duration, representationArray) {
    var obj = {};

    if (isLive === 1) {
        isLive = true; //Sometimes use may interpret isLive to be an integer value instead of boolean value.
    }

    obj.isLive = isLive || false;
    obj.duration = duration || -1;
    obj.representationArray = representationArray || [];
    return obj;
};
/**
 * AD_BLOCKED: Entered when Ad is blocked.
 * AD_IMPRESSION: Based on the IAB definition of an ad impression.
 * AD_STARTED: Entered when VPAID script signals that it is starting.
 * AD_PLAYING: Entered when Ad starts playing or when Ad is unpaused.
 * AD_CLICKED: Entered whenever a user clicks an ad to be redirected to its landing page.
 * AD_PAUSED: Entered when Ad is paused.
 * AD_RESUMED: Entered when Ad playback session is resumed.
 * AD_SKIPPED: Entered when Ad is skipped.
 * AD_COMPLETED: Entered when Ad completes play .
 * AD_ERROR: Entered when an error prevents Ad play.
 * AD_REQUEST: Entered when ad is requested.
**/


var MMAdState = Object.freeze({
    AD_BLOCKED: 1,
    AD_IMPRESSION: 2,
    AD_STARTED: 3,
    AD_PLAYING: 4,
    AD_CLICKED: 5,
    AD_PAUSED: 6,
    AD_RESUMED: 7,
    AD_SKIPPED: 8,
    AD_COMPLETED: 9,
    AD_ERROR: 10,
    AD_REQUEST: 11,
    AD_PLAY: 12,
    AD_BUFFERING: 13,
    AD_MIDPOINT: 14,
    AD_FIRST_QUARTILE: 15,
    AD_THIRD_QUARTILE: 16,
    AD_ENDED: 17
});
/**
 * adClient Client used to play the ad, eg: VAST, IMA etc.
 * adID Tag represented by the ad (AD ID).
 * adDuration Length of the video ad (in milliseconds).
 * adPosition Position of the ad in the video  playback; one of "pre", "post" or "mid"
 *            that represents that the ad played before, after or during playback respectively.
 * adIsLinear Type of the ad (true for linear, false for non-linear).
 * adCreativeType  Ad MIME type.
 * adServer Ad server (ex. DoubleClick, YuMe, AdTech, Brightroll, etc.)
 * adResolution Advertisement video resolution.
 * adPodIndex Position of the ad within the ad group 
     * 0 for pre-roll 
     * 1-N for mid-roll
     * -1 for post-roll
 * adPositionInPod Position of the ad within the pod (starts from 1).
 * adPodLength Total number of ads in the ad group.
 * isBumper True if bumper Ad else false
 * adScheduledTime The content time offset at which the current ad pod was scheduled (-1 if unknown)
**/

var MMAdInfo = function MMAdInfo() {
    var obj = {};
    obj.adClient = undefined;
    obj.adId = undefined;
    obj.adDuration = 0;
    obj.adPosition = undefined;
    obj.adIsLinear = false;
    obj.adCreativeType = undefined;
    obj.adServer = undefined;
    obj.adResolution = undefined;
    obj.adPodIndex = undefined;
    obj.adPositionInPod = undefined;
    obj.adPodLength = undefined;
    obj.isBumper = false;
    obj.adScheduledTime = -1.0;
    obj.adCreativeId = undefined;
    obj.adUrl = undefined;
    obj.adTitle = undefined;
    obj.adBitrate = undefined;
    return obj;
};
/**
* MMPlayerState - State of the player
* Possible states include-
* MMPlayerState.PLAYING: User of SDK should report transition to PLAYING state when player user presses RESUME button(after pause), or player is ready to render first frame of the media.
* MMPlayerState.PAUSED: User of the player has pressed the PAUSE button.
* MMPlayerState.STOPPED: Playback has finished, and current session is considered to be completed User may will like to loop the content, or playback another content, when current playback session finishes, in that cases, SDK user is expected to call initialize and reportUserRequestedForPlayback again.
*/


var MMPlayerState = Object.freeze({
    PLAYING: 1,
    PAUSED: 2,
    STOPPED: 3
});
/**
* MMQBRMode - This specifies the mode of QBR operation.
* Possible values include -
* QBRModeDisabled: Disable QBR optimization. Analytics will be active
* QBRModeQuality: Emphasis is on savings bandwidth; maximizing quality as a secondary objective.
* QBRModeBitsave: Emphasis is on savings bandwidth without degrading quality.
* QBRModeCostsave: Emphasis is on saving bandwidth without degrading quality.
*/

var MMQBRMode = Object.freeze({
    QBRModeDisabled: "QBRDisabled",
    QBRModeQuality: "QBRQuality",
    QBRModeBitsave: "QBRBitsave",
    QBRModeCostsave: "QBRCostsave"
});
/**
* MMConnectionInfo - This Object specifies the various connection types on which playback is being done
* Possible values include -
* MMConnectionInfo.Cellular: Connection type is cellular (generic).
* MMConnectionInfo.Cellular_2G: Connection type is 2G cellular.
* MMConnectionInfo.Cellular_3G: Connection type is 3G cellular.
* MMConnectionInfo.Cellular_4G: Connection type is 4G cellular.
* MMConnectionInfo.Cellular_LTE: Connection type is LTE cellular.
* MMConnectionInfo.Cellular_5G: Connection type is 5G cellular.
* MMConnectionInfo.NotReachable: Connection non reachable.
* MMConnectionInfo.Wifi: Connection type is WiFi.
* MMConnectionInfo.WiredNetwork: Connection type is wired.
*/

var MMConnectionInfo = Object.freeze({
    Cellular: "Cellular",
    Cellular_2G: "Cellular_2G",
    Cellular_3G: "Cellular_3G",
    Cellular_4G: "Cellular_4G",
    Cellular_LTE: "Cellular_LTE",
    Cellular_5G: "Cellular_5G",
    NotReachable: "WebNotReachable",
    Wifi: "Wifi",
    WiredNetwork: "WiredNetwork"
});
/**
* MMOverridableMetric - Player may would like to override few metrics that are computed by SDK internally.
* This Object is used to specify metrics that can be overriden
* These metrics include -
* MMOverridableMetric.Latency: This is the time between when user requests the start of the playback session, and the playback starts.
* MMOverridableMetric.ServerAddress: IP address of manifest server.
* MMOverridableMetric.DurationWatched: This is the duration of time for which player stays in the PLAYING state for the playback of the content.
*/

var MMOverridableMetric = Object.freeze({
    Latency: "Latency",
    ServerAddress: "CDN",
    DurationWatched: "DurationWatched"
});; "use strict";

var MMSTREAMSMARTERCONSTANTS = {
    SDK_REGISTER_URL: "https://register.mediamelon.com/mm-apis/register/",
    SDK_CONFIG: {
        sdkVersion: "JSSDKv4.4.1_JW8_v1.0.1",
        hintFileVersion: "2.0.0",
        EP_SCHEMA_VERSION: "2.0.0",
        platform: "Browser",
        qmetric: true,
        statistics: false,
        log_level: 2
    },
    SDK_BUILD_VERSION: "17032021"
};;/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/* global define */

var MMMD5 = function ($) {
    'use strict'

    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    var safeAdd = function (x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff)
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
        return (msw << 16) | (lsw & 0xffff)
    }

    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    var bitRotateLeft = function (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt))
    }

    /*
    * These functions implement the four basic operations the algorithm uses.
    */
    var md5cmn = function (q, a, b, x, s, t) {
        return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
    }
    var md5ff = function (a, b, c, d, x, s, t) {
        return md5cmn((b & c) | (~b & d), a, b, x, s, t)
    }
    var md5gg = function (a, b, c, d, x, s, t) {
        return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
    }
    var md5hh = function (a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t)
    }
    var md5ii = function (a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | ~d), a, b, x, s, t)
    }

    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    var binlMD5 = function (x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (len % 32)
        x[((len + 64) >>> 9 << 4) + 14] = len

        var i
        var olda
        var oldb
        var oldc
        var oldd
        var a = 1732584193
        var b = -271733879
        var c = -1732584194
        var d = 271733878

        for (i = 0; i < x.length; i += 16) {
            olda = a
            oldb = b
            oldc = c
            oldd = d

            a = md5ff(a, b, c, d, x[i], 7, -680876936)
            d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
            c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
            b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
            a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
            d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
            c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
            b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
            a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
            d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
            c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
            b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
            a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
            d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
            c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
            b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

            a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
            d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
            c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
            b = md5gg(b, c, d, a, x[i], 20, -373897302)
            a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
            d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
            c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
            b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
            a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
            d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
            c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
            b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
            a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
            d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
            c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
            b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

            a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
            d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
            c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
            b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
            a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
            d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
            c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
            b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
            a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
            d = md5hh(d, a, b, c, x[i], 11, -358537222)
            c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
            b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
            a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
            d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
            c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
            b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

            a = md5ii(a, b, c, d, x[i], 6, -198630844)
            d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
            c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
            b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
            a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
            d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
            c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
            b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
            a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
            d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
            c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
            b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
            a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
            d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
            c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
            b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

            a = safeAdd(a, olda)
            b = safeAdd(b, oldb)
            c = safeAdd(c, oldc)
            d = safeAdd(d, oldd)
        }
        return [a, b, c, d]
    }

    /*
    * Convert an array of little-endian words to a string
    */
    var binl2rstr = function (input) {
        var i
        var output = ''
        var length32 = input.length * 32
        for (i = 0; i < length32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff)
        }
        return output
    }

    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    var rstr2binl = function (input) {
        var i
        var output = []
        output[(input.length >> 2) - 1] = undefined
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0
        }
        var length8 = input.length * 8
        for (i = 0; i < length8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
        }
        return output
    }

    /*
    * Calculate the MD5 of a raw string
    */
    var rstrMD5 = function (s) {
        return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
    }

    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    var rstrHMACMD5 = function (key, data) {
        var i
        var bkey = rstr2binl(key)
        var ipad = []
        var opad = []
        var hash
        ipad[15] = opad[15] = undefined
        if (bkey.length > 16) {
            bkey = binlMD5(bkey, key.length * 8)
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636
            opad[i] = bkey[i] ^ 0x5c5c5c5c
        }
        hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
        return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
    }

    /*
    * Convert a raw string to a hex string
    */
    var rstr2hex = function (input) {
        var hexTab = '0123456789abcdef'
        var output = ''
        var x
        var i
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i)
            output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
        }
        return output
    }

    /*
    * Encode a string as utf-8
    */
    var str2rstrUTF8 = function (input) {
        return unescape(encodeURIComponent(input))
    }

    /*
    * Take string arguments and return either raw or hex encoded strings
    */
    var rawMD5 = function (s) {
        return rstrMD5(str2rstrUTF8(s))
    }
    var hexMD5 = function (s) {
        return rstr2hex(rawMD5(s))
    }
    var rawHMACMD5 = function (k, d) {
        return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
    }
    var hexHMACMD5 = function (k, d) {
        return rstr2hex(rawHMACMD5(k, d))
    }

    var mm_md5 = function (string, key, raw) {
        if (!key) {
            if (!raw) {
                return hexMD5(string)
            }
            return rawMD5(string)
        }
        if (!raw) {
            return hexHMACMD5(key, string)
        }
        return rawHMACMD5(key, string)
    }

    return {
        mm_md5: mm_md5,
        hexMD5: hexMD5,
        rawMD5: rawMD5,
        hexHMACMD5: hexHMACMD5,
        rawHMACMD5: rawHMACMD5
    }
}
    ;/*
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * author Digital Primates
 * copyright dash-if 2012
 */

/*
 * var parent,
 *     child,
 *     properties = [
                    {
                        name: 'profiles',
                        merge: false
                    }
                ];
 *
 * parent = {};
 * parent.name = "ParentNode";
 * parent.isRoor = false;
 * parent.isArray = false;
 * parent.parent = null;
 * parent.children = [];
 * parent.properties = properties;
 *
 * child = {};
 * child.name = "ChildNode";
 * child.isRoor = false;
 * child.isArray = true;
 * child.parent = parent;
 * child.children = null;
 * child.properties = properties;
 * parent.children.push(child);
 *
 */

function ObjectIron(map) {

    var lookup;

    // create a list of top level items to search for
    lookup = [];
    for (var h = 0, len = map.length; h < len; h += 1) {
        if (map[h].isRoot) {
            lookup.push("root");
        } else {
            lookup.push(map[h].name);
        }
    }

    var mergeValues = function (parentItem, childItem) {
        var name,
            parentValue,
            childValue;

        if (parentItem === null || childItem === null) {
            return;
        }

        for (name in parentItem) {
            if (parentItem.hasOwnProperty(name)) {
                if (!childItem.hasOwnProperty(name)) {
                    childItem[name] = parentItem[name];
                }
            }
        }
    },

        mapProperties = function (properties, parent, child) {
            var i,
                len,
                property,
                parentValue,
                childValue;

            if (properties === null || properties.length === 0) {
                return;
            }

            for (i = 0, len = properties.length; i < len; i += 1) {
                property = properties[i];

                if (parent.hasOwnProperty(property.name)) {
                    if (child.hasOwnProperty(property.name)) {
                        // check to see if we should merge
                        if (property.merge) {
                            parentValue = parent[property.name];
                            childValue = child[property.name];

                            // complex objects; merge properties
                            if (typeof parentValue === 'object' && typeof childValue === 'object') {
                                mergeValues(parentValue, childValue);
                            }
                            // simple objects; merge them together
                            else {
                                if (property.mergeFunction != null) {
                                    child[property.name] = property.mergeFunction(parentValue, childValue);
                                } else {
                                    child[property.name] = parentValue + childValue;
                                }
                            }
                        }
                    } else {
                        // just add the property
                        child[property.name] = parent[property.name];
                    }
                }
            }
        },

        mapItem = function (obj, node) {
            var item = obj,
                i,
                len,
                v,
                len2,
                array,
                childItem,
                childNode,
                property;

            if (item.children === null || item.children.length === 0) {
                return;
            }

            for (i = 0, len = item.children.length; i < len; i += 1) {
                childItem = item.children[i];

                if (node.hasOwnProperty(childItem.name)) {
                    if (childItem.isArray) {
                        array = node[childItem.name + "_asArray"];
                        for (v = 0, len2 = array.length; v < len2; v += 1) {
                            childNode = array[v];
                            mapProperties(item.properties, node, childNode);
                            mapItem(childItem, childNode);
                        }
                    } else {
                        childNode = node[childItem.name];
                        mapProperties(item.properties, node, childNode);
                        mapItem(childItem, childNode);
                    }
                }
            }
        },

        performMapping = function (source) {
            var i,
                len,
                pi,
                pp,
                item,
                node,
                array;

            if (source === null) {
                return source;
            }

            if (typeof source !== 'object') {
                return source;
            }

            // first look to see if anything cares about the root node
            for (i = 0, len = lookup.length; i < len; i += 1) {
                if (lookup[i] === "root") {
                    item = map[i];
                    node = source;
                    mapItem(item, node);
                }
            }

            // iterate over the objects and look for any of the items we care about
            for (pp in source) {
                if (source.hasOwnProperty(pp) && pp != "__children") {
                    pi = lookup.indexOf(pp);
                    if (pi !== -1) {
                        item = map[pi];

                        if (item.isArray) {
                            array = source[pp + "_asArray"];
                            for (i = 0, len = array.length; i < len; i += 1) {
                                node = array[i];
                                mapItem(item, node);
                            }
                        } else {
                            node = source[pp];
                            mapItem(item, node);
                        }
                    }
                    // now check this to see if he has any of the properties we care about
                    performMapping(source[pp]);
                }
            }

            return source;
        };

    return {
        run: performMapping
    };
};/*
 Copyright 2011 Abdulla Abdurakhmanov
 Original sources are available at https://code.google.com/p/x2js/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/*
 Modified to keep track of children nodes in order in attribute __children.
*/

var MMX2JS = function (matchers, attrPrefix, ignoreRoot) {
    if (attrPrefix === null || attrPrefix === undefined) {
        attrPrefix = "_";
    }

    if (ignoreRoot === null || ignoreRoot === undefined) {
        ignoreRoot = false;
    }

    var VERSION = "1.0.11";
    var escapeModeFlag = false;

    var DOMNodeTypes = {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9
    };

    function getNodeLocalName(node) {
        var nodeLocalName = node.localName;
        if (nodeLocalName == null) // Yeah, this is IE!!
            nodeLocalName = node.baseName;
        if (nodeLocalName == null || nodeLocalName == "") // =="" is IE too
            nodeLocalName = node.nodeName;
        return nodeLocalName;
    }

    function getNodePrefix(node) {
        return node.prefix;
    }

    function escapeXmlChars(str) {
        if (typeof (str) == "string")
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
        else
            return str;
    }

    function unescapeXmlChars(str) {
        return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, '\/')
    }

    function parseDOMChildren(node) {
        if (node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
            var result,
                child = node.firstChild,
                i,
                len;

            // get the first node that isn't a comment
            for (i = 0, len = node.childNodes.length; i < len; i += 1) {
                if (node.childNodes[i].nodeType !== DOMNodeTypes.COMMENT_NODE) {
                    child = node.childNodes[i];
                    break;
                }
            }

            if (ignoreRoot) {
                result = parseDOMChildren(child);
            } else {
                result = {};
                var childName = getNodeLocalName(child);
                result[childName] = parseDOMChildren(child);
            }

            return result;
        }
        else
            if (node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
                var result = new Object;
                result.__cnt = 0;

                var children = [];

                var nodeChildren = node.childNodes;

                // Children nodes
                for (var cidx = 0; cidx < nodeChildren.length; cidx++) {
                    var child = nodeChildren.item(cidx); // nodeChildren[cidx];
                    var childName = getNodeLocalName(child);

                    result.__cnt++;
                    if (result[childName] == null) {
                        var c = parseDOMChildren(child);
                        if ((childName != "#text") || (/[^\s]/.test(c))) {
                            var o = {};
                            o[childName] = c;
                            children.push(o);
                        }
                        result[childName] = c;
                        result[childName + "_asArray"] = new Array(1);
                        result[childName + "_asArray"][0] = result[childName];
                    }
                    else {
                        if (result[childName] != null) {
                            if (!(result[childName] instanceof Array)) {
                                var tmpObj = result[childName];
                                result[childName] = new Array();
                                result[childName][0] = tmpObj;

                                result[childName + "_asArray"] = result[childName];
                            }
                        }
                        var aridx = 0;
                        while (result[childName][aridx] != null) aridx++;

                        var c = parseDOMChildren(child);
                        if ((childName != "#text") || (/[^\s]/.test(c))) { // Don't add white-space text nodes
                            var o = {};
                            o[childName] = c;
                            children.push(o);
                        }
                        (result[childName])[aridx] = c;
                    }
                }

                result.__children = children;

                // Attributes
                for (var aidx = 0; aidx < node.attributes.length; aidx++) {
                    var attr = node.attributes.item(aidx); // [aidx];
                    result.__cnt++;

                    var value2 = attr.value;
                    for (var m = 0, ml = matchers.length; m < ml; m++) {
                        var matchobj = matchers[m];
                        if (matchobj.test.call(this, attr))
                            value2 = matchobj.converter.call(this, attr.value);
                    }

                    result[attrPrefix + attr.name] = value2;
                }

                // Node namespace prefix
                var nodePrefix = getNodePrefix(node);
                if (nodePrefix != null && nodePrefix != "") {
                    result.__cnt++;
                    result.__prefix = nodePrefix;
                }

                if (result.__cnt == 1 && result["#text"] != null) {
                    result = result["#text"];
                }

                if (result["#text"] != null) {
                    result.__text = result["#text"];
                    if (escapeModeFlag)
                        result.__text = unescapeXmlChars(result.__text)
                    delete result["#text"];
                    delete result["#text_asArray"];
                }
                if (result["#cdata-section"] != null) {
                    result.__cdata = result["#cdata-section"];
                    delete result["#cdata-section"];
                    delete result["#cdata-section_asArray"];
                }

                if (result.__text != null || result.__cdata != null) {
                    result.toString = function () {
                        return (this.__text != null ? this.__text : '') + (this.__cdata != null ? this.__cdata : '');
                    }
                }
                return result;
            }
            else
                if (node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
                    return node.nodeValue;
                }
                else
                    if (node.nodeType == DOMNodeTypes.COMMENT_NODE) {
                        return null;
                    }
    }

    function startTag(jsonObj, element, attrList, closed) {
        var resultStr = "<" + ((jsonObj != null && jsonObj.__prefix != null) ? (jsonObj.__prefix + ":") : "") + element;
        if (attrList != null) {
            for (var aidx = 0; aidx < attrList.length; aidx++) {
                var attrName = attrList[aidx];
                var attrVal = jsonObj[attrName];
                resultStr += " " + attrName.substr(1) + "='" + attrVal + "'";
            }
        }
        if (!closed)
            resultStr += ">";
        else
            resultStr += "/>";
        return resultStr;
    }

    function endTag(jsonObj, elementName) {
        return "</" + (jsonObj.__prefix != null ? (jsonObj.__prefix + ":") : "") + elementName + ">";
    }

    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    function jsonXmlSpecialElem(jsonObj, jsonObjField) {
        if (endsWith(jsonObjField.toString(), ("_asArray"))
            || jsonObjField.toString().indexOf("_") == 0
            || (jsonObj[jsonObjField] instanceof Function))
            return true;
        else
            return false;
    }

    function jsonXmlElemCount(jsonObj) {
        var elementsCnt = 0;
        if (jsonObj instanceof Object) {
            for (var it in jsonObj) {
                if (jsonXmlSpecialElem(jsonObj, it))
                    continue;
                elementsCnt++;
            }
        }
        return elementsCnt;
    }

    function parseJSONAttributes(jsonObj) {
        var attrList = [];
        if (jsonObj instanceof Object) {
            for (var ait in jsonObj) {
                if (ait.toString().indexOf("__") == -1 && ait.toString().indexOf("_") == 0) {
                    attrList.push(ait);
                }
            }
        }
        return attrList;
    }

    function parseJSONTextAttrs(jsonTxtObj) {
        var result = "";

        if (jsonTxtObj.__cdata != null) {
            result += "<![CDATA[" + jsonTxtObj.__cdata + "]]>";
        }

        if (jsonTxtObj.__text != null) {
            if (escapeModeFlag)
                result += escapeXmlChars(jsonTxtObj.__text);
            else
                result += jsonTxtObj.__text;
        }
        return result
    }

    function parseJSONTextObject(jsonTxtObj) {
        var result = "";

        if (jsonTxtObj instanceof Object) {
            result += parseJSONTextAttrs(jsonTxtObj)
        }
        else
            if (jsonTxtObj != null) {
                if (escapeModeFlag)
                    result += escapeXmlChars(jsonTxtObj);
                else
                    result += jsonTxtObj;
            }

        return result;
    }

    function parseJSONArray(jsonArrRoot, jsonArrObj, attrList) {
        var result = "";
        if (jsonArrRoot.length == 0) {
            result += startTag(jsonArrRoot, jsonArrObj, attrList, true);
        }
        else {
            for (var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
                result += startTag(jsonArrRoot[arIdx], jsonArrObj, parseJSONAttributes(jsonArrRoot[arIdx]), false);
                result += parseJSONObject(jsonArrRoot[arIdx]);
                result += endTag(jsonArrRoot[arIdx], jsonArrObj);
            }
        }
        return result;
    }

    function parseJSONObject(jsonObj) {
        var result = "";

        var elementsCnt = jsonXmlElemCount(jsonObj);

        if (elementsCnt > 0) {
            for (var it in jsonObj) {

                if (jsonXmlSpecialElem(jsonObj, it))
                    continue;

                var subObj = jsonObj[it];

                var attrList = parseJSONAttributes(subObj)

                if (subObj == null || subObj == undefined) {
                    result += startTag(subObj, it, attrList, true)
                }
                else
                    if (subObj instanceof Object) {

                        if (subObj instanceof Array) {
                            result += parseJSONArray(subObj, it, attrList)
                        }
                        else {
                            var subObjElementsCnt = jsonXmlElemCount(subObj);
                            if (subObjElementsCnt > 0 || subObj.__text != null || subObj.__cdata != null) {
                                result += startTag(subObj, it, attrList, false);
                                result += parseJSONObject(subObj);
                                result += endTag(subObj, it);
                            }
                            else {
                                result += startTag(subObj, it, attrList, true);
                            }
                        }
                    }
                    else {
                        result += startTag(subObj, it, attrList, false);
                        result += parseJSONTextObject(subObj);
                        result += endTag(subObj, it);
                    }
            }
        }
        result += parseJSONTextObject(jsonObj);

        return result;
    }

    var parseXmlString = function (xmlDocStr) {
        var xmlDoc,
            parser,
            ns;

        if (window.DOMParser) {
            parser = new window.DOMParser();

            try {
                ns = parser.parseFromString('<', 'text/xml').getElementsByTagName("parsererror")[0].namespaceURI;
            } catch (e) {
                // IE11 will definitely throw SyntaxError here
                // ns will be undefined
            }

            try {
                xmlDoc = parser.parseFromString(xmlDocStr, "text/xml");

                if (ns) {
                    if (xmlDoc.getElementsByTagNameNS(ns, 'parsererror').length) {
                        xmlDoc = undefined;
                    }
                }
            } catch (e) {
                // IE11 may throw SyntaxError here if xmlDocStr is
                // not well formed. xmlDoc will be undefined
            }
        }
        else {
            // IE :(
            if (xmlDocStr.indexOf("<?") == 0) {
                xmlDocStr = xmlDocStr.substr(xmlDocStr.indexOf("?>") + 2);
            }
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlDocStr);
        }
        return xmlDoc;
    }

    var xml2json = function (xmlDoc) {
        return parseDOMChildren(xmlDoc);
    }

    var xml_str2json = function (xmlDocStr) {
        var xmlDoc = this.parseXmlString(xmlDocStr);
        return xmlDoc ? this.xml2json(xmlDoc) : undefined;
    }

    var json2xml_str = function (jsonObj) {
        return parseJSONObject(jsonObj);
    }

    var json2xml = function (jsonObj) {
        var xmlDocStr = this.json2xml_str(jsonObj);
        return this.parseXmlString(xmlDocStr);
    }

    var getVersion = function () {
        return VERSION;
    }

    var escapeMode = function (enabled) {
        escapeModeFlag = enabled;
    }

    return {
        escapeMode: escapeMode,
        getVersion: getVersion,
        json2xml: json2xml,
        json2xml_str: json2xml_str,
        xml_str2json: xml_str2json,
        xml2json: xml2json,
        parseXmlString: parseXmlString
    }
}
    ; "use strict";

function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } if (Object.getOwnPropertySymbols) { var objectSymbols = Object.getOwnPropertySymbols(descs); for (var i = 0; i < objectSymbols.length; i++) { var sym = objectSymbols[i]; var desc = descs[sym]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, sym, desc); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var MMAdvertisentInformation = {
    _adClient: undefined,
    _adId: undefined,
    _adPosition: undefined,
    _adDuration: undefined,
    _adResolution: undefined,
    _adLinear: undefined,
    _adCreativeType: undefined,
    _adServer: undefined,
    _prevAdState: undefined,
    _playSent: false,
    _adCreativeId: undefined,
    _adTitle: undefined,
    _adBitrate: undefined,
    _adUrl: undefined,
    _adPlaybackStartWallClockTime: 0,
    _adplaydur: 0,
    _adPlaybackTime: 0,
    _adLastPlayingEventTimeStamp: -1,
    _adLastAdEventTimeStamp: -1,
    _isBumper: false,
    _adPodIndex: -2,
    _adPodLength: -1,
    _adPositionInPod: -1,
    _adScheduledTime: -1.0
};
var MMExperienceProbeState = Object.freeze({
    IDLE: 0,
    INITIALIZED: 1,
    ONLOAD_SENT: 2,
    STARTED: 3,
    STOPPED: 4,
    ERROR: 5
});

var ExperienceProbe = function ExperienceProbe() {
    var _postInterval, _postInterval2, _producerURL, _producerURL2, _recordIndex, _recordIndex2, _upShiftCount, _upshiftCount, _downShiftCount, _downshiftCount, _qoeMetric, _qoeMetric2, _eventMetric, _eventMetric2, _ref, _mutatorMap;

    return _ref = {
        _httpUtil: undefined,
        _playerName: undefined,
        _customerID: undefined,
        _subscriberID: undefined,
        _assetID: undefined,
        _assetName: undefined,
        _videoId: undefined,
        _contentMetadata: undefined,
        _domainName: undefined,
        _component: undefined,
        _inProgress: false,
        _simulatedEndedSent: false,
        _mode: null,
        _modeFromResponse: null,
        _timerObj: null,
        _timerTimestampSynchro: null,
        _regStatus: "",
        _sdkVersion: "",
        _hintFileVersion: "",
        _playDur: 0,
        _latencyStartTime: 0,
        _enableEP: false,
        _KAdKeepAliveInterval: 5 * 1000,
        // 5 seconds
        _adInformation: Object.create(MMAdvertisentInformation),
        _flagStartLatencyViaPlayer: false,
        _statsMetric: {
            version: "1.0.0",
            qubitData: []
        },
        _recordIndex: 0,
        _upshiftCount: 0,
        _downshiftCount: 0,
        _pbTime: 0,
        _progressMark: 0,
        _totalDuration: 0,
        _buffWait: 0,
        _sumBuffWait: 0,
        _prevPlayerState: 0,
        _EPState: 0,
        _pauseStartTime: 0,
        _pauseDuration: 0,
        _adPlaybackTime: 0,
        _bufferLength: 0,
        _downloadRate: 0,
        _downloadRateCount: 0,
        _avgDownloadRate: 0,
        _networkType: "",
        adClient: "",
        adURL: "",
        adDuration: 0,
        adPosition: 0,
        adLinear: false,
        _adServer: "",
        _adCreativeMime: "",
        _wifiDataRate: 0,
        frameLoss: 0,
        _wifiSignalStrenth: 0,
        _wifiSSID: "",
        _presentationWidth: 0,
        _presentationHeight: 0,
        _videoQuality: "",
        _bufferStartTime: 0,
        _isBufferingState: false,
        prevBitrate: 0,
        newBitrate: 0,
        _playerBrand: "",
        _playerModel: "",
        _playerVersion: "",
        _appName: "",
        _appVersion: "",
        _deviceType: "",
        _deviceBrand: "",
        _deviceModel: "",
        _deviceOs: "",
        _deviceOsVersion: "",
        _deviceOperator: "",
        _deviceMarketingName: "",
        _timeShift: 0,
        _timeDeltaInMs: 0,
        _isFirstBatch: true,
        _eventToSend: [],
        _statsToSend: [],
        _epocTime: 0,
        _setState: false,
        _qoeMetric: {},
        _bwExtSet: false,
        _prevSegInfo: {},
        _segINfoStatus: false,
        _adBeforePlayback: false,
        _cfVal: 0.0,
        _maxSteps: 0,
        _maxStepUp: 0,
        _maxStepDown: 0,
        _maxEventsInQ: 40,
        // min is 8
        _onLoadSentAtTS: 0,
        _lastStatsPostedAtTS: 0,
        _statsMonitorStartedAtTS: 0,
        _bufferingCount: 0,
        _subscriberType: undefined,
        _subscriberTag: undefined,
        _pbTimeBeforeAdStart: 0,
        _adLoadTime: 0,
        _adStartEpocTime: 0,
        _adBuffWaitForInterval: 0,
        _adSumBuffWait: 0,
        _adPauseStartTime: 0,
        _adPauseDuration: 0,
        _adPauseDurationToOffsetFromInterval: 0,
        _adLoadStartTime: 0,
        _segRepeatationCount: 0,
        _httpPostTimeout: 90000,
        sessionId: "",
        _eventMetric: {
            version: "1.0.0",
            qubitData: []
        },
        attributes: {
            UPSHIFTCOUNT: "upShiftCount",
            DOWNSHIFTCOUNT: "downShiftCount",
            SDKBOOTTIME: "sdkBootuptime",
            STREAMFORMAT: "streamFormat",
            SDKVERSION: "sdkVersion",
            HFILEVERSION: "hFileVersion",
            ISLIVE: "isLive",
            DATASOURCE: "dataSrc",
            CUSTID: "custId",
            SESSIONID: "sessionId",
            CDN: "cdn",
            PBTIME: "pbTime",
            OPERATOR: "operator",
            NETWORKTYPE: "nwType",
            WIFISSID: "wifissid",
            WIFIDATERATE: "wifidatarate",
            SIGNALSTRENGTH: "signalstrength",
            PLATFORM: "platform",
            LOCATION: "location",
            SCREENRES: "scrnRes",
            BANDWIDTH: "bwInUse",
            LATENCY: "latency",
            BUFFERING: "buffWait",
            SUMBUFFERING: "sumBuffWait",
            PLAYDUR: "playDur",
            FRAMELOSS: "frameloss",
            ASSETID: "assetId",
            ASSETNAME: "assetName",
            VIDEOID: "videoId",
            STREAMURL: "streamURL",
            MINRES: "minRes",
            MAXRES: "maxRes",
            MAXFPS: "maxFps",
            MINFPS: "minFps",
            NUMPROFILE: "numOfProfile",
            TOTALDURATION: "totalDuration",
            RESOLUTION: "res",
            QBRBITRATE: "qbrBitrate",
            CBRBITRATE: "cbrBitrate",
            QBRQUALITY: "qbrQual",
            CBRQUALITY: "cbrQual",
            DURATION: "dur",
            FPS: "fps",
            SEQNUM: "seqNum",
            STARTTIME: "startTime",
            PROFILENUM: "profileNum",
            LASTTS: "lastTS",
            CBRSIZE: "cbrSize",
            QBRSIZE: "qbrSize",
            PAUSEDURATION: "pauseDuration",
            SUBSCRIBERID: "subscriberId",
            DOMAINNAME: "domainName",
            PLAYERNAME: "playerName",
            QBRSDKMODE: "mode",
            DEVICETYPE: "device",
            DEVICEBRAND: "brand",
            DEVICEMODEL: "model",
            DEVICEMARKETINGNAME: "deviceMarketingName",
            OSVERSION: "version",
            SUBSCRIBERTYPE: "subscriberType",
            SUBSCRIBERTAG: "subscriberTag",
            CONTENTTYPE: "contentType",
            DRMPROTECTION: "drmProtection",
            EPISODENUMBER: "episodeNumber",
            GENRE: "genre",
            SEASON: "season",
            SERIESTITLE: "seriesTitle",
            VIDEOTYPE: "videoType",

            VIDEOTRACK: "videoTrack",
            SUBTITLETRACK: "subtitleTrack",
            AUDIOTRACK: "audioTrack",
            ISVDSACTIVE: "isVDSActive",
            ISSUBTITLEACTIVE: "isSubtitleActive",
            PROGRESSMARK: "progressMark",
            APPNAME: "appName",
            APPVERSION: "appVersion",
            VIDEOQUALITY: "videoQuality"
        },
        _producerURL: undefined,
        _postInterval: 10,
        _customTag: {},
        _baseServerTimeStampMS: 0,
        _prevBitrate: -1,
        _streamUrl: "",
        _initLatancy: 0
    }, _defineProperty(_ref, "_adPauseStartTime", 0), _defineProperty(_ref, "_adEpocTime", 0), _defineProperty(_ref, "setEPState", function setEPState(state) {
        // console.log(state);
        this._EPState = state;
    }), _defineProperty(_ref, "getEPState", function getEPState() {
        return this._EPState;
    }), _defineProperty(_ref, "getQbrMode", function getQbrMode() {
        return this._mode;
    }), _defineProperty(_ref, "isValidStateTransition", function isValidStateTransition(newState) {
        // Check if transition from _EPState to newState is valid, if yes return true else false
        return true;
    }), _defineProperty(_ref, "setRegistrationStatus", function setRegistrationStatus(value) {
        this._regStatus = value;
    }), _defineProperty(_ref, "getRegistrationStatus", function getRegistrationStatus() {
        return this._regStatus;
    }), _postInterval = "postInterval", _mutatorMap = {}, _mutatorMap[_postInterval] = _mutatorMap[_postInterval] || {}, _mutatorMap[_postInterval].set = function (value) {
        this._postInterval = value;
    }, _postInterval2 = "postInterval", _mutatorMap[_postInterval2] = _mutatorMap[_postInterval2] || {}, _mutatorMap[_postInterval2].get = function () {
        return this._postInterval;
    }, _producerURL = "producerURL", _mutatorMap[_producerURL] = _mutatorMap[_producerURL] || {}, _mutatorMap[_producerURL].set = function (value) {
        this._producerURL = value;
    }, _producerURL2 = "producerURL", _mutatorMap[_producerURL2] = _mutatorMap[_producerURL2] || {}, _mutatorMap[_producerURL2].get = function () {
        return this._producerURL;
    }, _recordIndex = "recordIndex", _mutatorMap[_recordIndex] = _mutatorMap[_recordIndex] || {}, _mutatorMap[_recordIndex].set = function (value) {
        this._recordIndex = value;
    }, _recordIndex2 = "recordIndex", _mutatorMap[_recordIndex2] = _mutatorMap[_recordIndex2] || {}, _mutatorMap[_recordIndex2].get = function () {
        return this._recordIndex;
    }, _upShiftCount = "upShiftCount", _mutatorMap[_upShiftCount] = _mutatorMap[_upShiftCount] || {}, _mutatorMap[_upShiftCount].set = function (value) {
        this._upshiftCount = value;
    }, _upshiftCount = "upshiftCount", _mutatorMap[_upshiftCount] = _mutatorMap[_upshiftCount] || {}, _mutatorMap[_upshiftCount].get = function () {
        return this._upshiftCount;
    }, _downShiftCount = "downShiftCount", _mutatorMap[_downShiftCount] = _mutatorMap[_downShiftCount] || {}, _mutatorMap[_downShiftCount].set = function (value) {
        this._downshiftCount = value;
    }, _downshiftCount = "downshiftCount", _mutatorMap[_downshiftCount] = _mutatorMap[_downshiftCount] || {}, _mutatorMap[_downshiftCount].get = function () {
        return this._downshiftCount;
    }, _qoeMetric = "qoeMetric", _mutatorMap[_qoeMetric] = _mutatorMap[_qoeMetric] || {}, _mutatorMap[_qoeMetric].set = function (value) {
        this._qoeMetric = value;
    }, _qoeMetric2 = "qoeMetric", _mutatorMap[_qoeMetric2] = _mutatorMap[_qoeMetric2] || {}, _mutatorMap[_qoeMetric2].get = function () {
        return this._qoeMetric;
    }, _eventMetric = "eventMetric", _mutatorMap[_eventMetric] = _mutatorMap[_eventMetric] || {}, _mutatorMap[_eventMetric].set = function (value) {
        this._eventMetric = value;
    }, _eventMetric2 = "eventMetric", _mutatorMap[_eventMetric2] = _mutatorMap[_eventMetric2] || {}, _mutatorMap[_eventMetric2].get = function () {
        return this._eventMetric;
    }, _defineProperty(_ref, "registerMMSmartStreaming", function registerMMSmartStreaming(playerName, customerID, subscriberID, domainName, subscriberType, subscriberTag) {
        this._playerName = playerName;
        this._customerID = customerID;
        this._subscriberID = subscriberID;
        this._domainName = domainName;
        this._subscriberType = subscriberType;
        this._subscriberTag = subscriberTag;
    }), _defineProperty(_ref, "updateSubscriberID", function updateSubscriberID(subscriberID) {
        this._subscriberID = subscriberID;
    }), _defineProperty(_ref, "updateSubscriber", function updateSubscriber(subscriberID, subscriberType, subscriberTag) {
        this._subscriberID = subscriberID;
        this._subscriberType = subscriberType;
        this._subscriberTag = subscriberTag;
    }), _defineProperty(_ref, "initializeSession", function initializeSession(mode, manifestURL, metaURL, contentMetadata) {
        //this._mode = mode;
        if (this._httpUtil) {
            this._httpUtil.cleanUp();

            this._httpUtil = undefined;
        }

        this._producerURL = undefined;
        this.setRegistrationStatus("PENDING"); //console.log("QbrSdkVersion:" + MMSTREAMSMARTERCONSTANTS.SDK_BUILD_VERSION);

        this._statsMetric.version = this._eventMetric.version = MMSTREAMSMARTERCONSTANTS.SDK_CONFIG.EP_SCHEMA_VERSION;
        this._streamUrl = manifestURL;
        this._assetID = contentMetadata.assetId;
        this._assetName = contentMetadata.assetName;
        this._videoId = contentMetadata.videoId;
        // contentMetadata.contentType=_mmVideoAssetInfo.contentType;
        // contentMetadata.genre=_mmVideoAssetInfo.genre;
        // contentMetadata.episodeNumber=_mmVideoAssetInfo.episodeNumber;
        // contentMetadata.title=_mmVideoAssetInfo.title;
        // contentMetadata.seriesTitle=_mmVideoAssetInfo.seriesTitle;
        // contentMetadata.season=_mmVideoAssetInfo.season;
        // contentMetadata.drmProtection=_mmVideoAssetInfo.drmProtection;
        // contentMetadata.contentType=_mmVideoAssetInfo.contentType;
        // contentMetadata.videoType=_mmVideoAssetInfo.videoType;
        this._contentMetadata = contentMetadata;
        this.initialize();
        return this.registerSdkWithBackend(mode);
    }), _defineProperty(_ref, "registerSdkWithBackend", function registerSdkWithBackend(mode) {
        var apiUrl = MMSTREAMSMARTERCONSTANTS.SDK_REGISTER_URL + this._customerID;
        var data = MMSTREAMSMARTERCONSTANTS.SDK_CONFIG;
        data.component = this._component;
        data.mode = mode;
        this._httpUtil = new HttpUtil();
        return this._httpUtil.doGet(apiUrl, data);
    }), _defineProperty(_ref, "reportRegistrationSuccess", function reportRegistrationSuccess(data) {
        this.setRegistrationStatus("SUCCESS"); //this.reportMode(data.mode);

        this._modeFromResponse = data.mode;
        this.setCfVal(data.cfVal);
        var maxUp, maxDown;

        if (data.maxStepsUp !== undefined) {
            if (!isNaN(data.maxStepsUp)) maxUp = data.maxStepsUp;
        }

        if (data.maxStepsDown !== undefined) {
            if (!isNaN(data.maxStepsDown)) maxDown = data.maxStepsDown;
        }

        if (maxUp === undefined && maxDown === undefined && data.maxSteps !== undefined) {
            if (!isNaN(data.maxSteps)) {
                maxUp = maxDown = data.maxSteps;
            }
        }

        this.setMaxSteps(maxUp, maxDown);
        this.reportServerTimeStamp(data.timestamp);
        this.reportProducer(data.producerURL, data.statsInterval);
        this.monitorRegistration();
        this._inProgress = true;
        this._simulatedEndedSent = false;
    }), _defineProperty(_ref, "reportRegistrationFailure", function reportRegistrationFailure() {
        this.setRegistrationStatus("FAILED");
        this._producerURL = undefined;
        this._modeFromResponse = null;
        this._postInterval = -1;
        this._eventToSend = [];
        this._statsToSend = [];
        this.stopMonitoring();
    }), _defineProperty(_ref, "synchronizeTimestamp", function synchronizeTimestamp() {
        this.registerSdkWithBackend(this._mode).then(function (dataraw) {
            var data = JSON.parse(dataraw);

            if (data && data.timestamp) {
                this.reportServerTimeStamp(data.timestamp);
            }
        })["catch"](function (status) {// Error
        });
    }), _defineProperty(_ref, "addSegInfo", function addSegInfo(segInfo) {
        // To Avoid segment repeat incase of segment retry on error
        // If media error occured, player as to notify error and set ended event, else below check will be done to avoid.
        if (this._prevSegInfo) {
            if (segInfo.seqNum != -1 && this._prevSegInfo.seqNum == segInfo.seqNum && this._prevSegInfo.startTime === segInfo.startTime) {
                if (this._prevSegInfo.cbrBitrate === segInfo.cbrBitrate && this._segRepeatationCount++ < 10) {
                    return;
                }
            }
        }

        if (!segInfo.cbrBitrate) {
            return; // Return if CBR Bitrate (Mandatory) is not valid
        }

        if (this._downloadRate > 0) segInfo.downloadRate = parseFloat((this._downloadRate * 1024).toFixed(2));
        if (this._bufferLength >= 0) segInfo.bufferLength = parseInt(this._bufferLength);

        if (segInfo.cbrSize) {
            if (segInfo.dur < 0) segInfo.cbrSize = segInfo.qbrSize = 0;
        } else {
            if (segInfo.dur > 0) {
                segInfo.cbrSize = segInfo.qbrSize = segInfo.dur * segInfo.cbrBitrate;
            } else {
                segInfo.cbrSize = segInfo.qbrSize = 0;
            }
        }

        segInfo.timestamp = this.getCorrectedCurrentTimeinMs();

        this._statsMetric.qubitData[this._recordIndex].segInfo.push(segInfo);

        this._prevSegInfo = segInfo.constructor === Array ? segInfo[length - 1] : segInfo;
        this._segINfoStatus = true;
        this._segRepeatationCount = 0;
    }), _defineProperty(_ref, "setBandwidth", function setBandwidth(value) {
        if (typeof value !== 'undefined' && value > 0) {
            //this.setPBStats(this.attributes.BANDWIDTH, value/1024);
            this._downloadRate = value / 1024;
            this._downloadRateCount = this._downloadRateCount + 1;
            this._avgDownloadRate = this._downloadRate + this._avgDownloadRate; //this._bwExtSet = true;
        }
    }), _defineProperty(_ref, "reportBufferLength", function reportBufferLength(value) {
        if (value >= 0) {
            this._bufferLength = value;
        }
    }), _defineProperty(_ref, "clearAdInfo", function clearAdInfo() {
        delete this._eventMetric.qubitData[this._recordIndex].adInfo;
    }), _defineProperty(_ref, "setCustomTag", function setCustomTag(tag, value) {
        if (typeof this._eventMetric.qubitData[this._recordIndex].customTags === 'undefined') {
            this._eventMetric.qubitData[this._recordIndex].customTags = {};
        }

        if (typeof this._statsMetric.qubitData[this._recordIndex].customTags === 'undefined') {
            this._statsMetric.qubitData[this._recordIndex].customTags = {};
        }

        var newMap = this._eventMetric.qubitData[this._recordIndex].customTags;
        newMap[tag] = value;
        this._eventMetric.qubitData[this._recordIndex].customTags = newMap;
        this._statsMetric.qubitData[this._recordIndex].customTags = newMap;
    }), _defineProperty(_ref, "reportContentMetadata", function reportContentMetadata(contentMetadata) {
        if (contentMetadata.assetId !== undefined && contentMetadata.assetId !== null) {
            this.setContentMetadata(this.attributes.ASSETID, contentMetadata.assetId);
        }

        if (contentMetadata.assetName !== undefined && contentMetadata.assetName !== null) {
            this.setContentMetadata(this.attributes.ASSETNAME, contentMetadata.assetName);
        }

        if (contentMetadata.videoId) {
            this.setContentMetadata(this.attributes.VIDEOID, contentMetadata.videoId);
        }

        if (contentMetadata.contentType) {
            this.setContentMetadata(this.attributes.CONTENTTYPE, contentMetadata.contentType);
        }

        if (contentMetadata.drmProtection) {
            this.setContentMetadata(this.attributes.DRMPROTECTION, contentMetadata.drmProtection);
        }

        if (contentMetadata.episodeNumber) {
            this.setContentMetadata(this.attributes.EPISODENUMBER, contentMetadata.episodeNumber);
        }

        if (contentMetadata.genre) {
            this.setContentMetadata(this.attributes.GENRE, contentMetadata.genre);
        }

        if (contentMetadata.season) {
            this.setContentMetadata(this.attributes.SEASON, contentMetadata.season);
        }

        if (contentMetadata.seriesTitle) {
            this.setContentMetadata(this.attributes.SERIESTITLE, contentMetadata.seriesTitle);
        }
        if (contentMetadata.videoType) {
            this.setContentMetadata(this.attributes.VIDEOTYPE, contentMetadata.videoType);
        }
    }), _defineProperty(_ref, "setContentMetadata", function setContentMetadata(property, value) {
        if (value !== undefined && value !== null) {
            this._statsMetric.qubitData[this._recordIndex].contentMetadata[property] = value;
            this._eventMetric.qubitData[this._recordIndex].contentMetadata[property] = value;
        }
    }), _defineProperty(_ref, "reportNetworkType", function reportNetworkType(nwType) {
        if (nwType) {
            this._networkType = nwType;
            this.setClientInfo(this.attributes.NETWORKTYPE, this._networkType);
        }
    }), _defineProperty(_ref, "reportDeviceType", function reportDeviceType(devType) {
        this._deviceType = devType;
    }), _defineProperty(_ref, "setCfVal", function setCfVal(val) {
        this._cfVal = val;
    }), _defineProperty(_ref, "getCfVal", function getCfVal() {
        return this._cfVal;
    }), _defineProperty(_ref, "setMaxSteps", function setMaxSteps(maxUp, maxDown) {
        if (maxUp >= 0) this._maxStepUp = maxUp;
        if (maxDown >= 0) this._maxStepDown = maxDown;
    }), _defineProperty(_ref, "getMaxStepsToSwitch", function getMaxStepsToSwitch() {
        return [this._maxStepUp, this._maxStepDown];
    }), _defineProperty(_ref, "reportWifiSSID", function reportWifiSSID(ssid) {
        if (ssid) {
            this._wifiSSID = ssid;
            this.setClientInfo(this.attributes.WIFISSID, this._wifiSSID);
        }
    }), _defineProperty(_ref, "reportWifiSignalStrenthPercentage", function reportWifiSignalStrenthPercentage(strength) {
        if (strength) {
            this._wifiSignalStrenth = strength;
            this.setClientInfo(this.attributes.SIGNALSTRENGTH, this._wifiSignalStrenth);
        }
    }), _defineProperty(_ref, "reportWifiDataRate", function reportWifiDataRate(datarate) {
        if (datarate) {
            this._wifiDataRate = datarate;
            this.setClientInfo(this.attributes.WIFIDATERATE, this._wifiDataRate);
        }
    }), _defineProperty(_ref, "reportServerTimeStamp", function reportServerTimeStamp(timeStampInMs) {
        this._baseServerTimeStampMS = timeStampInMs;
        this.setCurrentTimeDelta();
    }), _defineProperty(_ref, "reportProducer", function reportProducer(producerUrl, dataInterval) {
        this._producerURL = producerUrl;
        this._postInterval = dataInterval;
    }), _defineProperty(_ref, "reportMode", function reportMode(mode) {
        this._mode = mode;
        this.setStreamID(this.attributes.QBRSDKMODE, this._mode);
        this.sendEventInfo();
    }), _defineProperty(_ref, "reportAssetID", function reportAssetID(assetID, assetName, videoId) {
        if (assetID) this._assetID = assetID;
        if (assetName) this._assetName = assetName;
        if (videoId) this._videoId = videoId;
    }), _defineProperty(_ref, "reportPresentationSize", function reportPresentationSize(width, height) {
        this._presentationWidth = width;
        this._presentationHeight = height;
    }), _defineProperty(_ref, "reportFrameLoss", function reportFrameLoss(lossCnt) {
        this.frameloss = lossCnt;
        this.setPBStats(this.attributes.FRAMELOSS, this.frameloss);
    }), _defineProperty(_ref, "reportABRSwitch", function reportABRSwitch(prevBitrate, newBitrate) {
        if (prevBitrate < newBitrate) {
            this._upshiftCount++;
        } else if (prevBitrate > newBitrate) {
            this._downshiftCount++;
        }

        this.setSegInfo(this.attributes.CBRBITRATE, newBitrate);
    }), _defineProperty(_ref, "monitorRegistration", function monitorRegistration() {
        this.sendEventInfo();
        this.sendQueuedStats();
        this.startMonitoring(); //console.log("Setting interval for sendQBRStats");
    }), _defineProperty(_ref, "sendQueuedStats", function sendQueuedStats() {
        if (this._producerURL !== undefined) {
            for (var i = 0; i < this._statsToSend.length; i++) {
                var jsonToSend = this._statsToSend[i];
                var xhttp = new XMLHttpRequest();
                xhttp.open('POST', this._producerURL, true);
                xhttp.timeout = this._httpPostTimeout;
                xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
                xhttp.setRequestHeader('Content-type', 'application/json');
                xhttp.send(jsonToSend);
                this._lastStatsPostedAtTS = this.getCurrentTimeinMs(); //logger.logi("JSON to be sent="+finalJson+" to URL="+this._producerURL);

                this._statsToSend[i] = null;
            }

            this._statsToSend = []; // clear all after sending
        }
    }), _defineProperty(_ref, "reportPlayerInfo", function reportPlayerInfo(brand, model, version) {
        this._playerBrand = brand;
        this._playerModel = model;
        this._playerVersion = version;
    }),
        _defineProperty(_ref, "reportAppInfo", function reportAppInfo(appName, appVersion) {
            this._appName = appName;
            this._appVersion = appVersion;
        }),
        _defineProperty(_ref, "reportVideoQuality", function reportVideoQuality(videoQuality) {
            this._videoQuality = videoQuality;
        }),
        _defineProperty(_ref, "reportDeviceInfo", function reportDeviceInfo(brand, deviceModel, os, osVersion, operator, deviceMarketingName, screenWidth, screenHeight) {
            if (brand) this._deviceBrand = brand;
            if (deviceModel) this._deviceModel = deviceModel;
            if (os) this._deviceOs = os;
            if (osVersion) this._deviceOsVersion = osVersion;
            if (operator) this._deviceOperator = operator;
            if (screenWidth) this._presentationWidth = screenWidth;
            if (screenHeight) this._presentationHeight = screenHeight;
            if (deviceMarketingName) this._deviceMarketingName = deviceMarketingName;
            this.setScreenRes();
        }), _defineProperty(_ref, "reportMetricValue", function reportMetricValue(metric, value) {
            if (metric === MMOverridableMetric.Latency) {
                //this.setPBStats(this.attributes.LATENCY, value);
                this._initLatency = parseFloat(value.toFixed(2));
                this._flagStartLatencyViaPlayer = true;
            } else if (metric === MMOverridableMetric.ServerAddress) {
                this.setClientInfo(this.attributes.CDN, value);
            } else if (metric === MMOverridableMetric.DurationWatched) {// Not Implemented yet
            }
        }), _defineProperty(_ref, "reportAdBufferingStarted", function reportAdBufferingStarted() {
            if (this._adInformation) {
                if (!this._adInformation._playSent || this._isBufferingState) {
                    return;
                }

                this._isBufferingState = true;
                var now = this.getCurrentTimeinMs();
                populateAdRelatedInfo(now);
                this._bufferStartTime = now;
                this.setBufPBEvent(this.attributes.SUMBUFFERING, this._adSumBuffWait);
                notifyEvent("AD_BUFFERING", "Ad Buffering started", "AD_BUFFERING", null);
                _adInformation._adLastAdEventTimeStamp = now;
            }
        }), _defineProperty(_ref, "reportAdBufferingCompleted", function reportAdBufferingCompleted() {
            if (this._adInformation) {
                if (!_adInformation._playSent || this._isBufferingState == false) {
                    return;
                }

                this._isBufferingState = false;

                if (this._prevPlayerState === MMPlayerState.PLAYING) {
                    var now = this.getCurrentTimeinMs();

                    if (this._bufferStartTime) {
                        this._adBuffWaitForInterval = now - this._bufferStartTime;
                        this._adSumBuffWait = this._adSumBuffWait + this._adBuffWaitForInterval;
                        this.setPBStats(this.attributes.BUFFERING, this._adBuffWaitForInterval);
                        this.setBufPBEvent(this.attributes.SUMBUFFERING, this._adSumBuffWait);
                        this._bufferStartTime = 0;
                    }
                }
            }
        }), _defineProperty(_ref, "reportBufferingStarted", function reportBufferingStarted() {
            if (this.getEPState() !== MMExperienceProbeState.STARTED || this._isBufferingState) return;
            this._isBufferingState = true;

            if (this._prevPlayerState === MMPlayerState.PLAYING) {
                this._bufferStartTime = this.getCurrentTimeinMs();
                this._bufferingCount++;
                this.setBufPBEvent(this.attributes.SUMBUFFERING, this._sumBuffWait);
                this.notifyEvent("BUFFERING", "Playback Buffering", "BUFFERING", this._pbTime);
            }
        }), _defineProperty(_ref, "reportBufferingCompleted", function reportBufferingCompleted() {
            if (this.getEPState() !== MMExperienceProbeState.STARTED) return;
            this._isBufferingState = false;

            if (this._prevPlayerState === MMPlayerState.PLAYING) {
                this.setBuffering();
            }
        }), _defineProperty(_ref, "reportUserInitiatedPlayback", function reportUserInitiatedPlayback() {
            var now = this.getCurrentTimeinMs();

            if (this.getEPState() === MMExperienceProbeState.INITIALIZED) {
                this._latencyStartTime = now;
                this.notifyEvent("ONLOAD", "Player Initializing..", "ONLOAD", 0);
                this.setEPState(MMExperienceProbeState.ONLOAD_SENT);
            } else {
                console.log("Warn: State not valid");
            }
        }), _defineProperty(_ref, "reportPlayerState", function reportPlayerState(playerState) {
            var epState = this.getEPState();
            var now = this.getCurrentTimeinMs();
            this.setBufPBEvent(this.attributes.SUMBUFFERING, this._sumBuffWait);
            var isBufferingNeeded = false;
            var setNewState = false;

            switch (playerState) {
                case MMPlayerState.PLAYING:
                    {
                        if (this._prevPlayerState == MMPlayerState.PAUSED && epState === MMExperienceProbeState.ONLOAD_SENT) {
                            this._pauseDuration = now - this._pauseStartTime;
                            this.setBufPBEvent(this.attributes.PAUSEDURATION, this._pauseDuration);
                            this._pauseStartTime = 0;

                            this.notifyEvent("RESUME", "Playback resumed", "RESUME", this._pbTime);
                            this.startMonitoring();
                            this._initLatency = this._initLatency - this._pauseDuration;
                            setNewState = true;
                        }

                        if (epState === MMExperienceProbeState.ONLOAD_SENT) {
                            if (!this._flagStartLatencyViaPlayer) {
                                //console.log("LATENCYDEBUG - ", "STARTED : " + now + " from " + this._latencyStartTime);
                                var latency = now - this._latencyStartTime;
                                this._initLatency = latency;

                                if (this._adBeforePlayback && this._adInformation) {
                                    if (this._initLatency > 0) {
                                        if (this._adLoadTime > 0) {
                                            this._initLatency -= this._adLoadTime;
                                        }

                                        if (this._initLatency > 0 && this._adInformation._adDuration > 0) {
                                            this._initLatency -= this._adInformation._adDuration;
                                        }

                                        if (this._initLatency > 0 && this._adPauseDuration > 0) {
                                            this._initLatency -= this._adPauseDuration;
                                        }
                                    }
                                }

                                if (this._initLatency < 0) {
                                    this._initLatency = 0;
                                }
                            }

                            this._epocTime = now;
                            if (!this._statsMonitorStartedAtTS) this._statsMonitorStartedAtTS = now;
                            this.setPBStats(this.attributes.LATENCY, this._initLatency);
                            this.notifyEvent("START", "Playback Start", "START", this._pbTime);
                            this.setEPState(MMExperienceProbeState.STARTED);
                            if (this._adBeforePlayback) this.notifyEvent("START_AFTER_AD", "Playback Started after ad", "START_AFTER_AD", this._pbTime);
                            this._latencyStartTime = 0;
                            this.startMonitoring();
                            setNewState = true;
                            this._pbTimeBeforeAdStart = this._pbTime;
                        } else if (epState === MMExperienceProbeState.STARTED && this._prevPlayerState === MMPlayerState.PAUSED) {
                            if (this._pauseStartTime) {
                                this._pauseDuration = now - this._pauseStartTime;
                                this.setBufPBEvent(this.attributes.PAUSEDURATION, this._pauseDuration);
                                this._epocTime += this._pauseDuration;
                                this._pauseStartTime = 0;
                                this._bufferStartTime = now;

                                this.notifyEvent("RESUME", "Playback resumed", "RESUME", this._pbTime); //this._playDur -= parseInt(this._pauseDuration/1000);

                                if (this._isBufferingState) {
                                    // If Buffer event before resume, raise now and wait for buffer complated.
                                    this._isBufferingState = false;
                                    isBufferingNeeded = true;
                                }

                                this.startMonitoring();
                                setNewState = true;
                                this._pbTimeBeforeAdStart = this._pbTime;
                            }
                        } else if (epState === MMExperienceProbeState.STOPPED && this._prevPlayerState === MMPlayerState.STOPPED) {
                            // RePlay usecase
                            var cStreamInfo = this.getStreamInfo();
                            var cStreamId = this.getStreamId();
                            var prevMode = this._mode;
                            this.reset();
                            this.initialize(); // ReInit EP (new sessionId)

                            this.reportMode(prevMode);
                            this.setPresentationStreamInfo(cStreamInfo.maxRes, cStreamInfo.minRes, cStreamInfo.maxFps, cStreamInfo.minFps, cStreamInfo.numOfProfile, cStreamInfo.streamFormat);
                            this.setVideoDuration(cStreamInfo.totalDuration);
                            this.setPresentationType(cStreamId.isLive);
                            this.setEPState(MMExperienceProbeState.INITIALIZED);
                            this.reportUserInitiatedPlayback();
                            this.reportPlayerState(MMPlayerState.PLAYING);
                            this.setEPState(MMExperienceProbeState.STARTED);
                            setNewState = true;
                        }

                        break;
                    }

                case MMPlayerState.PAUSED:
                    {
                        if (epState === MMExperienceProbeState.STARTED || epState === MMExperienceProbeState.ONLOAD_SENT) {
                            this.sendQBRStats();
                            this._pauseStartTime = now;

                            this.notifyEvent("PAUSE", "Playback Paused", "PAUSE", this._pbTime);
                            this.stopMonitoring();
                            setNewState = true;
                            this._pbTimeBeforeAdStart = this._pbTime;
                        }

                        break;
                    }

                case MMPlayerState.STOPPED:
                    {
                        if (this._simulatedEndedSent === true || epState === MMExperienceProbeState.STOPPED || this._prevPlayerState === undefined || this._prevPlayerState === MMPlayerState.STOPPED) break;
                        this.startMonitoring();
                        var totalWait = this._sumBuffWait + this._initLatency;
                        this.setBufPBEvent(this.attributes.SUMBUFFERING, totalWait);
                        if (this._totalDuration) this.sendQBRStats();

                        if (this._totalDuration <= 0 || this._pbTime < this._totalDuration * 0.9) {
                            this.notifyEvent("ENDED", "Playback completion", "ENDED", this._pbTime);
                        } else {
                            this.notifyEvent("COMPLETE", "Playback completion", "COMPLETE", this._pbTime);
                        }

                        this.stopMonitoring();
                        this._inProgress = false;
                        this.setEPState(MMExperienceProbeState.STOPPED);
                        setNewState = true;
                        break;
                    }

                default:
                    {
                        MMLogger.log("INFO", "Unknown State");
                        return;
                    }
            } // Update prev state with the current


            if (setNewState) {
                this._prevPlayerState = playerState;
            } //


            if (isBufferingNeeded) this.reportBufferingStarted();
        }), _defineProperty(_ref, "reportError", function reportError(error, playbackPosMilliSec) {
            this.setPlaybackPos(playbackPosMilliSec);

            if (this.getEPState() >= MMExperienceProbeState.ONLOAD_SENT) {
                this.notifyEvent("ERROR", error, "ERROR", this._pbTime);
            }
        }), _defineProperty(_ref, "isValid", function isValid(value) {
            return value !== undefined && value !== null && value.length;
        }), _defineProperty(_ref, "reportPlayerSeekCompleted", function reportPlayerSeekCompleted(seekEndPos) {
            var now = this.getCurrentTimeinMs();

            if (this.getEPState() === MMExperienceProbeState.STARTED) {
                if (this._pauseStartTime) {
                    this._epocTime += now - this._pauseStartTime; // To Adjust playDur in Pause -> Seek -> Resume
                }

                this.setPlaybackPos(seekEndPos);
                this.notifyEvent("SEEKED", "Playback Seeked", "SEEKED", seekEndPos / 1000);

                if (this._pauseStartTime) {
                    this._epocTime -= now - this._pauseStartTime; // To Adjust playDur in Pause -> Seek -> Resume
                }
            }
        }), _defineProperty(_ref, "reset", function reset() {
            //We got EP as singleton, so it may happen that there could be more than one observer of state transitions, and one of observer (that is not our SDK), starts another session on ENDED event
            //In that case, EP state will be reset, and we will wipe out the EP state
            //So, one way could be reset the stuff asynchronously
            if (this._inProgress && this.getEPState() === MMExperienceProbeState.STARTED) {
                this.reportPlayerState(MMPlayerState.STOPPED);
                this._inProgress = false;
                this._simulatedEndedSent = true;
            }

            this._mode = null;
            this._bufferLength = 0;
            this._downloadRate = 0;
            this._downloadRateCount = 0;
            this._avgDownloadRate = 0;
            this._isFirstBatch = true;
            this._onLoadSentAtTS = 0;
            this._lastStatsPostedAtTS = 0;
            this._statsMonitorStartedAtTS = 0; //this._producerURL = undefined;

            this._bufferingCount = 0;
            this._recordIndex = 0;
            this._prevBitrate = -1;
            this._upshiftCount = 0;
            this._pbTime = 0;
            this._progressMark = 0;
            this._pbTimeBeforeAdStart = 0;
            this._downshiftCount = 0;
            this._playDur = 0;
            this._baseServerTimeStampMS = 0;
            this._totalDuration = 0;
            this._buffWait = 0;
            this._sumBuffWait = 0;
            this._initLatency = 0;
            this._latencyStartTime = 0;
            this._enableEP = false;
            this._flagStartLatencyViaPlayer = false;
            this._prevPlayerState = undefined;
            this._prevSegInfo = {};
            this._pauseStartTime = 0;
            this._pauseDuration = 0;
            this._adPlaybackTime = 0;
            this.adDuration = 0;
            this.adPosition = 0;
            this._adBeforePlayback = false;
            this._bufferStartTime = 0;
            this._isBufferingState = false;
            this.newBitrate = 0;
            this._epocTime = 0;
            this._qoeMetric = {};
            this._statsMetric.qubitData = [];
            this._eventMetric.qubitData = [];

            this._statsMetric.qubitData.push(this.QBRMetricTemplate());

            this._eventMetric.qubitData.push(this.EventMetricTemplate());

            this._eventToSend = [];
            this._statsToSend = [];
            this.sessionId = "";
            this._segRepeatationCount = 0;
            this._maxSteps = 0;
            this._maxStepUp = 0;
            this._maxStepDown = 0;
            this.setEPState(MMExperienceProbeState.IDLE);
        }), _defineProperty(_ref, "initialize", function initialize() {
            //logger.logi( "Initialize ExperienceProbe");
            //this.setStreamID(this.attributes.ISLIVE, false);
            this.setStreamID(this.attributes.CUSTID, parseInt(this._customerID));
            this.setStreamID(this.attributes.DATASOURCE, "Player");
            this.setStreamID(this.attributes.PLAYERNAME, this._playerName);
            this.sessionId = this.getSessionId();
            this.setStreamID(this.attributes.SESSIONID, this.sessionId);
            this.setStreamID(this.attributes.DOMAINNAME, this.getDomainName());
            this.setStreamID(this.attributes.STREAMURL, this._streamUrl); //this.setStreamID(this.attributes.QBRSDKMODE,this._mode);

            this.setSDKInfo(this.attributes.SDKVERSION, this._sdkVersion);
            this.setSDKInfo(this.attributes.HFILEVERSION, this._hintFileVersion);
            this.setClientInfo(this.attributes.DEVICETYPE, this._deviceType);
            this.setClientInfo(this.attributes.DEVICEBRAND, this._deviceBrand);
            this.setClientInfo(this.attributes.DEVICEMODEL, this._deviceModel);
            this.setClientInfo(this.attributes.OSVERSION, this._deviceOsVersion);
            this.setClientInfo(this.attributes.PLATFORM, this._deviceOs);
            this.setClientInfo(this.attributes.OPERATOR, this._deviceOperator);
            this.setClientInfo(this.attributes.NETWORKTYPE, this._networkType);
            this.setClientInfo(this.attributes.WIFISSID, this._wifiSSID);
            this.setClientInfo(this.attributes.WIFIDATERATE, this._wifiDataRate);
            this.setClientInfo(this.attributes.SIGNALSTRENGTH, this._wifiSignalStrenth);
            this.setClientInfo(this.attributes.APPNAME, this._appName);
            this.setClientInfo(this.attributes.APPVERSION, this._appVersion);
            this.setClientInfo(this.attributes.DEVICEMARKETINGNAME, this._deviceMarketingName);
            this.setSubscriberID();
            this.setSubscriberType();
            this.setSubscriberTag();
            this.setAssetID();
            this.reportContentMetadata(this._contentMetadata);
            this.setScreenRes();
            this.setEPState(MMExperienceProbeState.INITIALIZED);
        }), _defineProperty(_ref, "getSessionId", function getSessionId() {
            var d = new Date().getTime();
            var uuid = 'xxxxxyyxxxyyxxxyxxx-ymxyxxyxxyxx-'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 32) % 32 | 0;
                d = Math.floor(d / 32);
                return (c == 'x' ? r : r & 0x3 | 0x8).toString(32);
            });
            uuid = uuid + new Date().getTime();

            if (this._playerName) {
                uuid += "_" + this._playerName;
                ;
            }

            if (this._playerBrand) {
                uuid += "_" + this._playerBrand;
            }

            if (this._playerModel) {
                uuid += "_" + this._playerModel;
            }

            if (this._playerVersion) {
                uuid += "_" + this._playerVersion;
            }

            uuid = uuid.replace(/\//gi, "_");
            uuid = uuid.replace(/\s/gi, "_");
            return uuid;
        }), _defineProperty(_ref, "getDomainName", function getDomainName() {
            if (!this.isValid(this._domainName)) {
                this._domainName = this.getDefaultDomainName();
            }

            return this._domainName;
        }), _defineProperty(_ref, "getDefaultDomainName", function getDefaultDomainName() {
            var defDomainName = window.location.hostname;

            if (typeof defDomainName === 'undefined' && typeof document.location !== 'undefined') {
                var start = document.location.indexOf("//") + 2;
                defDomainName = document.location.substring(start, document.location.indexOf("/", start));
            }

            return defDomainName;
        }), _defineProperty(_ref, "isEmpty", function isEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) return false;
            }

            return true;
        }), _defineProperty(_ref, "getCustomTag", function getCustomTag(tag) {
            return this._customTag[tag];
        }), _defineProperty(_ref, "notifyEvent", function notifyEvent(name, desc, id, pbTime) {

            // console.log("EVENT == " + name);
            const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
            const LOG_RECEIVER_TAG = 'Receiver';
            castDebugLogger.debug(LOG_RECEIVER_TAG, "MM_EVENT == " + name);

            if (_typeof(desc) === 'object') {
                desc = "Unknown error took place: " + desc;
            }

            if (this._regStatus === "FAILED") return;
            this._eventMetric.playDur = this.getPlayDur();
            var prevScrnResValue = this._eventMetric.qubitData[this._recordIndex].clientInfo[this.attributes.SCREENRES];

            if (!(name.indexOf("AD_") === 0)) {
                // do not send adInfo with non-ad events
                this.clearAdInfo();
            } else {
                if (this._adInformation._adResolution !== undefined) {
                    this._eventMetric.qubitData[this._recordIndex].clientInfo[this.attributes.SCREENRES] = this._adInformation._adResolution;
                }

                this._eventMetric.playDur = parseInt(this.getAdPlayDur());
            }

            if (pbTime) pbTime = parseFloat(pbTime); else pbTime = parseFloat(0.0);

            if (!this._eventMetric.playDur) {
                this._eventMetric.playDur = 0;
            }

            this._eventMetric.qubitData[this._recordIndex].pbEventInfo.event = name;
            this._eventMetric.qubitData[this._recordIndex].pbEventInfo.desc = desc;
            this._eventMetric.qubitData[this._recordIndex].pbEventInfo.id = id;
            this._eventMetric.qubitData[this._recordIndex].pbEventInfo.pbTime = parseFloat(pbTime.toFixed(2));
            this._qoeMetric.timestamp = this._eventMetric.timestamp = this.getCorrectedCurrentTimeinMs(); //let playdur = (isNaN(this._eventMetric.timestamp))? this._baseServerTimeStampMS: (this._eventMetric.timestamp - this._baseServerTimeStampMS);
            if (this._totalDuration) this._progressMark = (this._pbTime / this._totalDuration) * 100;
            this._qoeMetric[this.attributes.PROGRESSMARK] = parseFloat(this._progressMark.toFixed(2));

            //playdur = parseInt(playdur / 1000);

            this._eventMetric.interval = this._postInterval;
            this._eventMetric.pbTime = parseFloat(pbTime.toFixed(2));

            if (Object.keys(this._qoeMetric).length) {
                this._eventMetric.qubitData[this._recordIndex].pbInfo.push(this._qoeMetric);
            }

            if (this._eventMetric.qubitData[this._recordIndex].pbInfo[0].hasOwnProperty(this.attributes.BUFFERING)) {
                delete this._eventMetric.qubitData[this._recordIndex].pbInfo[0][this.attributes.BUFFERING];
            }

            if (this._eventMetric.qubitData[this._recordIndex].pbInfo[0].hasOwnProperty(this.attributes.UPSHIFTCOUNT)) {
                delete this._eventMetric.qubitData[this._recordIndex].pbInfo[0][this.attributes.UPSHIFTCOUNT];
            }

            if (this._eventMetric.qubitData[this._recordIndex].pbInfo[0].hasOwnProperty(this.attributes.DOWNSHIFTCOUNT)) {
                delete this._eventMetric.qubitData[this._recordIndex].pbInfo[0][this.attributes.DOWNSHIFTCOUNT];
            }

            var qubitEvent = JSON.parse(JSON.stringify(this._eventMetric));

            this._eventToSend.push(qubitEvent);

            this.sendEventInfo();
            this._eventMetric.qubitData[this._recordIndex].clientInfo[this.attributes.SCREENRES] = prevScrnResValue;
            this._eventMetric.qubitData[this._recordIndex].adInfo = undefined;
            this._eventMetric.qubitData[this._recordIndex].pbEventInfo = {};
            this._eventMetric.qubitData[this._recordIndex].pbInfo = [];

            if (this._qoeMetric.hasOwnProperty(this.attributes.LATENCY)) {
                delete this._qoeMetric[this.attributes.LATENCY]; // remove latency, so that it is sent only in one payload (START payload)
            }

            if (this._qoeMetric.hasOwnProperty(this.attributes.PAUSEDURATION)) {
                delete this._qoeMetric[this.attributes.PAUSEDURATION];
            }
        }), _defineProperty(_ref, "downShift", function downShift() {
            this._downshiftCount++;
        }), _defineProperty(_ref, "upShift", function upShift() {
            this._upshiftCount++;
        }), _defineProperty(_ref, "getInitialDelay", function getInitialDelay() {
            return this._initLatency;
        }), _defineProperty(_ref, "getBuffWait", function getBuffWait() {
            return this._sumBuffWait;
        }), _defineProperty(_ref, "getBufferingCount", function getBufferingCount() {
            return this._bufferingCount;
        }), _defineProperty(_ref, "setStreamID", function setStreamID(property, value) {
            if (value !== undefined && value !== null) {
                this._statsMetric.qubitData[this._recordIndex].streamID[property] = value;
                this._eventMetric.qubitData[this._recordIndex].streamID[property] = value;
            }
        }), _defineProperty(_ref, "setMode", function setMode(value) {
            if (typeof value !== 'undefined' && String(value).length > 0) {
                statsMetric.qubitData[this._recordIndex].streamID.mode = value;
                eventMetric.qubitData[this._recordIndex].streamID.mode = value;
            }
        }), _defineProperty(_ref, "setClientInfo", function setClientInfo(property, value) {
            if (this._eventMetric.qubitData) {
                if (typeof this._eventMetric.qubitData[this._recordIndex].clientInfo === 'undefined') {
                    this._eventMetric.qubitData[this._recordIndex].clientInfo = {};
                }

                if (typeof this._statsMetric.qubitData[this._recordIndex].clientInfo === 'undefined') {
                    this._statsMetric.qubitData[this._recordIndex].clientInfo = {};
                }

                if (value) {
                    this._statsMetric.qubitData[this._recordIndex].clientInfo[property] = value;
                    this._eventMetric.qubitData[this._recordIndex].clientInfo[property] = value;
                }
            }
        }), _defineProperty(_ref, "setPlaybackPos", function setPlaybackPos(pbT) {
            this._pbTime = pbT / 1000;
        }), _defineProperty(_ref, "getPlaybackPos", function getPlaybackPos() {
            return this._pbTime;
        }), _defineProperty(_ref, "setPBStats", function setPBStats(property, value) {
            if (this._enableEP) {
                if (property !== this.attributes.LATENCY) {
                    var stats = {};
                    stats.timestamp = this.getCorrectedCurrentTimeinMs();
                    stats[property] = parseFloat(value.toFixed(2));
                    stats[this.attributes.PBTIME] = parseFloat(this._pbTime.toFixed(2));
                    // this._progressMark = (this._pbTime / this._totalDuration) * 100;
                    // stats[this.attributes.PROGRESSMARK] = parseFloat(this._progressMark.toFixed(2));

                    this._statsMetric.qubitData[this._recordIndex].pbInfo.push(stats);
                }
            }

            if (value || property == this.attributes.LATENCY) {
                this._qoeMetric[property] = parseFloat(value.toFixed(2));
            }
        }), _defineProperty(_ref, "setBufPBEvent", function setBufPBEvent(property, value) {
            if (value) {
                if (property in this._qoeMetric && property === this.attributes.BUFFERING) {
                    this._qoeMetric[property] = parseInt(value);
                } else {
                    this._qoeMetric[property] = value;
                }
            }
        }), _defineProperty(_ref, "setSDKInfo", function setSDKInfo(property, value) {
            if (value) {
                this._statsMetric.qubitData[this._recordIndex].sdkInfo[property] = value;
                this._eventMetric.qubitData[this._recordIndex].sdkInfo[property] = value;
            }
        }), _defineProperty(_ref, "getPBStats", function getPBStats(property) {
            return this._qoeMetric[property];
        }), _defineProperty(_ref, "setDiagnostics", function setDiagnostics(property, value) {
            if (value) {
                this._statsMetric.qubitData[this._recordIndex].diagnostics[property] = value;
            }
        }), _defineProperty(_ref, "setStreamInfo", function setStreamInfo(property, value) {
            if (typeof property !== 'undefined' && typeof value !== 'undefined') {
                this._statsMetric.qubitData[this._recordIndex].streamInfo[property] = value;
                this._eventMetric.qubitData[this._recordIndex].streamInfo[property] = value;
            }
        }), _defineProperty(_ref, "getStreamInfo", function getStreamInfo() {
            return this._statsMetric.qubitData[this._recordIndex].streamInfo;
        }), _defineProperty(_ref, "getStreamId", function getStreamId() {
            return this._statsMetric.qubitData[this._recordIndex].streamID;
        }), _defineProperty(_ref, "setSegInfo", function setSegInfo(property, value) {
            if (value) {
                this._statsMetric.qubitData[this._recordIndex].segInfo[property] = value;
            }
        }), _defineProperty(_ref, "setScreenRes", function setScreenRes() {
            var screenRes = "";

            if (this.isValid(this._presentationHeight) && this.isValid(this._presentationWidth) || this._presentationHeight > 0 && this._presentationWidth > 0) {
                screenRes = this._presentationWidth + 'x' + this._presentationHeight;
            } else {
                if (window.innerWidth && window.innerHeight) {
                    screenRes = window.innerWidth + 'x' + window.innerHeight;
                }
            }

            this.setClientInfo(this.attributes.SCREENRES, screenRes);
            this.setClientInfo(this.attributes.VIDEOQUALITY, this._videoQuality);
        }), _defineProperty(_ref, "setAssetID", function setAssetID() {
            if (this._assetID !== undefined && this._assetID !== null) {
                this.setStreamID(this.attributes.ASSETID, this._assetID);
            }

            if (this._assetName !== undefined && this._assetName !== null) {
                this.setStreamID(this.attributes.ASSETNAME, this._assetName);
            }

            if (this._videoId) {
                this.setStreamID(this.attributes.VIDEOID, this._videoId);
            }
        }), _defineProperty(_ref, "setSubscriberIDCookie", function setSubscriberIDCookie(name, value, maxAge) {
            var subscriber_cookie = name + "=" + encodeURIComponent(value);

            if (typeof maxAge === "number") {
                subscriber_cookie += "; max-age=" + maxAge * 24 * 60 * 60;
                document.cookie = subscriber_cookie;
            }
        }), _defineProperty(_ref, "getSubscriberIDCookie", function getSubscriberIDCookie(name) {
            var cookieArr = document.cookie.split(";");

            for (var i = 0; i < cookieArr.length; i++) {
                var cookiePair = cookieArr[i].split("=");

                if (name == cookiePair[0].trim()) {
                    return decodeURIComponent(cookiePair[1]);
                }
            }

            return null;
        }), _defineProperty(_ref, "uuidv4_subscriberID", function uuidv4_subscriberID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
        }), _defineProperty(_ref, "checkSubscriberIDCookie", function checkSubscriberIDCookie() {
            var subscrId = this.getSubscriberIDCookie("subscrId");

            if (!(subscrId != null)) {
                subscrId = this.uuidv4_subscriberID();

                if (subscrId != "" && subscrId != null) {
                    this.setSubscriberIDCookie("subscrId", subscrId, 730); //730 days ~ 2 years
                }
            }

            if (subscrId != "" && subscrId != null) {
                this.setStreamID(this.attributes.SUBSCRIBERID, MMMD5().mm_md5(subscrId));
            }
        }), _defineProperty(_ref, "setSubscriberID", function setSubscriberID() {
            if (this._subscriberID) {
                this.setStreamID(this.attributes.SUBSCRIBERID, MMMD5().mm_md5(this._subscriberID));
            } else {
                this.checkSubscriberIDCookie();
            }
        }), _defineProperty(_ref, "setSubscriberType", function setSubscriberType() {
            if (this._subscriberType) {
                this.setStreamID(this.attributes.SUBSCRIBERTYPE, this._subscriberType);
            }
        }), _defineProperty(_ref, "setSubscriberTag", function setSubscriberTag() {
            if (this._subscriberTag) {
                this.setStreamID(this.attributes.SUBSCRIBERTAG, this._subscriberTag);
            }
        }), _defineProperty(_ref, "setVideoDuration", function setVideoDuration(totalDuration) {
            if (totalDuration) {
                this._totalDuration = totalDuration;
                this.setStreamInfo(this.attributes.TOTALDURATION, parseFloat(totalDuration.toFixed(2)));
            }
        }), _defineProperty(_ref, "setPresentationType", function setPresentationType(isLive) {
            this.setStreamID(this.attributes.ISLIVE, isLive);
        }), _defineProperty(_ref, "setPresentationStreamInfo", function setPresentationStreamInfo(maxRes, minRes, maxFps, minFps, totalProfile, streamFormat) {
            this.setStreamInfo(this.getAttribute().MAXRES, maxRes);
            this.setStreamInfo(this.getAttribute().MINRES, minRes);
            this.setStreamInfo(this.getAttribute().MAXFPS, parseFloat(maxFps));
            this.setStreamInfo(this.getAttribute().MINFPS, parseFloat(minFps));
            this.setStreamInfo(this.getAttribute().NUMPROFILE, totalProfile);
            this.setStreamInfo(this.getAttribute().STREAMFORMAT, streamFormat);
        }), _defineProperty(_ref, "reportTrackinfo", function reportTrackinfo(videoTrack, subtitleTrack, audioTrack, isVDSActive, isSubtitleActive) {
            this.setStreamInfo(this.getAttribute().VIDEOTRACK, videoTrack);
            this.setStreamInfo(this.getAttribute().SUBTITLETRACK, subtitleTrack);
            this.setStreamInfo(this.getAttribute().AUDIOTRACK, audioTrack);
            this.setStreamInfo(this.getAttribute().ISVDSACTIVE, isVDSActive);
            this.setStreamInfo(this.getAttribute().ISSUBTITLEACTIVE, isSubtitleActive);
        }), _defineProperty(_ref, "reportComponent", function reportComponent(component) {
            this._component = component;
        }), _defineProperty(_ref, "reportSDKVersion", function reportSDKVersion(sdkVersion) {
            this._sdkVersion = sdkVersion;
        }), _defineProperty(_ref, "reportHintFileVersion", function reportHintFileVersion(hFileVersion) {
            this._hintFileVersion = hFileVersion;
        }), _defineProperty(_ref, "setBuffering", function setBuffering() {
            var now = this.getCurrentTimeinMs();

            if (this._bufferStartTime) {
                this._buffWait = now - this._bufferStartTime;
                this._sumBuffWait = this._sumBuffWait + this._buffWait;
                this.setPBStats(this.attributes.BUFFERING, this._buffWait);
                this.setBufPBEvent(this.attributes.SUMBUFFERING, this._sumBuffWait);
                this._bufferStartTime = 0;
            }
        }), _defineProperty(_ref, "setCurrentTimeDelta", function setCurrentTimeDelta() {
            var now = new Date().getTime(); //var d = new Date();
            //var now = (d.valueOf() + d.getTimezoneOffset() * 60000);

            if (this._baseServerTimeStampMS) {
                if (this._baseServerTimeStampMS > now) {
                    this._timeShift = -1;
                    this._timeDeltaInMs = this._baseServerTimeStampMS - now;
                } else {
                    this._timeShift = 1;
                    this._timeDeltaInMs = now - this._baseServerTimeStampMS;
                }
            }
        }), _defineProperty(_ref, "getCorrectedCurrentTimeinMs", function getCorrectedCurrentTimeinMs() {
            var now = new Date().getTime(); //var d = new Date();
            //var now = (d.valueOf() + d.getTimezoneOffset() * 60000);

            var curTime = now;

            if (this._timeShift > 0) {
                curTime = now - this._timeDeltaInMs;
            } else {
                curTime = now + this._timeDeltaInMs;
            }

            return curTime;
        }), _defineProperty(_ref, "getCurrentTimeinMs", function getCurrentTimeinMs() {
            var now = new Date().getTime(); //var d = new Date();
            //var now = (d.valueOf() + d.getTimezoneOffset() * 60000);

            return now;
        }), _defineProperty(_ref, "setProducerURL", function setProducerURL(url) {
            this._producerUrl = url;
        }), _defineProperty(_ref, "setPostInterval", function setPostInterval(dataInterval) {
            this._postInterval = dataInterval;
        }), _defineProperty(_ref, "stopMonitoring", function stopMonitoring() {
            this._enableEP = false;
            this._lastStatsPostedAtTS = 0;
            this._statsMonitorStartedAtTS = 0;
            if (this._timerObj) clearInterval(this._timerObj);
            this._timerObj = null;
            if (this._timerTimestampSynchro) clearInterval(this._timerTimestampSynchro);
            this._timerTimestampSynchro = null;
        }), _defineProperty(_ref, "startMonitoring", function startMonitoring() {
            if (this._regStatus === "SUCCESS") {
                this._enableEP = true;

                if (this._timerObj === null && this.getEPState() === MMExperienceProbeState.STARTED && this._postInterval > 0 && this._producerURL) {
                    this._timerObj = setInterval(this.sendQBRStats.bind(this), this._postInterval * 1000);
                    if (!this._statsMonitorStartedAtTS) this._statsMonitorStartedAtTS = this.getCurrentTimeinMs();
                    this._timerTimestampSynchro = setInterval(this.synchronizeTimestamp.bind(this), 60 * 1000 * 2);
                    this.synchronizeTimestamp();
                }
            }
        }), _defineProperty(_ref, "getChecksum", function getChecksum(custId, sessionId, timestamp) {
            var encryptedKey = MMMD5().mm_md5(custId + sessionId + timestamp);
            return encryptedKey.substr(8, 8) + encryptedKey.substr(24, 8) + encryptedKey.substr(0, 8) + encryptedKey.substr(16, 8);
        }), _defineProperty(_ref, "sendEventInfo", function sendEventInfo() {
            //send JSONIFied QubitMetric to producer URL
            if (this._producerURL === undefined) {
                if (this._eventToSend.length > this._maxEventsInQ) this._eventToSend.splice(this._maxEventsInQ - 4, 2);
                return;
            }

            if (this._regStatus === "FAILED") return;

            for (var i = 0; i < this._eventToSend.length; i++) {
                var event = this._eventToSend[i];

                if (event && event.qubitData[this._recordIndex].streamID) {
                    if (this._isFirstBatch === true) {
                        event.timestamp = this.getCorrectedCurrentTimeinMs();
                        event.qubitData[this._recordIndex].pbInfo[0].timestamp = event.timestamp;
                        event.qubitData[this._recordIndex].streamID.mode = this._mode;
                        event.interval = this._postInterval;
                    } else if (isNaN(event.timestamp) || event.timestamp === undefined || event.timestamp === null) {
                        event.timestamp = this.getCorrectedCurrentTimeinMs();
                    }

                    if (event.qubitData[this._recordIndex].pbEventInfo.event === "ONLOAD") {
                        this._onLoadSentAtTS = event.timestamp; // Store TimeStamp of Onload

                        if (this._modeFromResponse) event.qubitData[this._recordIndex].streamID.mode = this._modeFromResponse; //this._modeFromResponse = null;
                    } else if (event.qubitData[this._recordIndex].pbEventInfo.event !== "BUFFERING" && event.qubitData[this._recordIndex].pbEventInfo.event !== "SEEKED") {
                        if (this._modeFromResponse) event.qubitData[this._recordIndex].streamID.mode = this._modeFromResponse;
                    } else {
                        if (this._mode === null) return;
                        event.qubitData[this._recordIndex].streamID.mode = this._mode;
                    }

                    if (this._onLoadSentAtTS && event.qubitData[this._recordIndex].pbEventInfo.event === "START") {
                        if (this._mode === null) return;
                        this._modeFromResponse = this._mode;

                        if (this._totalDuration === -1 && event.qubitData[this._recordIndex].streamID.isLive === undefined) {
                            event.qubitData[this._recordIndex].streamID.isLive = true; // TotalDuration == -1 is only for Live
                        }

                        if (event.qubitData[this._recordIndex].streamID.isLive === undefined && this._totalDuration >= 0) {
                            event.qubitData[this._recordIndex].streamID.isLive = false; // invalid manifest url
                        }

                        if (event.qubitData[this._recordIndex].streamID.isLive === undefined) return;
                        event.timestamp = this._onLoadSentAtTS; // TimeStamp of Onload and Start should be same.

                        event.qubitData[this._recordIndex].streamID.mode = this._mode;
                    }

                    if (this._onLoadSentAtTS && event.qubitData[this._recordIndex].pbEventInfo.event === "START_AFTER_AD") {
                        event.timestamp = this._onLoadSentAtTS; // TimeStamp of start and start_after_ad should be same.
                    }

                    if (this._onLoadSentAtTS && event.qubitData[this._recordIndex].pbEventInfo.event === "AD_BLOCK") {
                        event.timestamp = this._onLoadSentAtTS; // TimeStamp of onload and ad_block should be same.
                    }

                    if (event.qubitData[this._recordIndex].pbEventInfo.event.indexOf("AD_") === 0) {
                        event.qubitData[this._recordIndex].streamID.mode = undefined; // Remove mode in ADS
                    }

                    event.qubitData[this._recordIndex].streamID.pId = this.getChecksum(this._customerID, this.sessionId, event.timestamp);
                    var finalJson = JSON.stringify(event);
                    var xhttp = new XMLHttpRequest();
                    xhttp.open('POST', this.producerURL, true);
                    // (HTTP METHOD, URL, true for async false for non-async-blocking call);
                    xhttp.timeout = this._httpPostTimeout;
                    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
                    xhttp.setRequestHeader('Content-type', 'application/json');
                    xhttp.send(finalJson);
                    this._eventToSend[i] = null;
                }
            }

            this._isFirstBatch = false;
            this._eventToSend = [];
        }), _defineProperty(_ref, "sendQBRStats", function sendQBRStats() {
            if (this._regStatus === "FAILED") return;

            if (this._regStatus === "PENDING" || this._enableEP && this.getEPState() === MMExperienceProbeState.STARTED) {
                if (this._bwExtSet === false) {
                    // this.setPBStats(this.attributes.BANDWIDTH, this._downloadRate);
                    var avgDownloadRate = this._avgDownloadRate / this._downloadRateCount;

                    if (!isNaN(avgDownloadRate) && avgDownloadRate > 0) {
                        this.setPBStats(this.attributes.BANDWIDTH, avgDownloadRate);
                    }

                    this._downloadRateCount = 0;
                    this._avgDownloadRate = 0;
                }

                this._progressMark = ((this._pbTime / this._totalDuration) * 100);
                this.setPBStats(this.attributes.PROGRESSMARK, this._progressMark);

                if (this._segINfoStatus === false) {
                    if (this._statsMetric && this._statsMetric.pbTime > -1 && parseFloat(this._statsMetric.pbTime.toFixed(2)) === parseFloat(this._pbTime.toFixed(2))) {
                        return; // Player struck/hang or paused or errored
                    }

                    if (this._prevSegInfo && this._prevSegInfo.cbrBitrate) {
                        this._prevSegInfo.timestamp = this.getCorrectedCurrentTimeinMs();
                        this._prevSegInfo.dur = -1; // Force remove duration for simulated segment.

                        this._prevSegInfo.cbrSize = this._prevSegInfo.qbrSize = 0; // Force remove Size for simulated segment.

                        this._statsMetric.qubitData[this._recordIndex].segInfo.push(this._prevSegInfo);
                    } else {
                        this._statsMetric.qubitData[this._recordIndex].segInfo = [];
                    }
                }

                this._segINfoStatus = false;
                this._bwExtSet = false;
                this._statsMetric.timestamp = this.getCorrectedCurrentTimeinMs(); //this._playDur = (isNaN(this._eventMetric.timestamp))? this._baseServerTimeStampMS: (this._statsMetric.timestamp - this._baseServerTimeStampMS);
                //this._playDur = parseInt(this._playDur / 1000);

                this._statsMetric.pbTime = parseFloat(this._pbTime.toFixed(2));
                this._statsMetric.playDur = this.getPlayDur();
                var timeDiffInterval = this._statsMonitorStartedAtTS ? this.getCurrentTimeinMs() - this._statsMonitorStartedAtTS : 0;
                timeDiffInterval = this._lastStatsPostedAtTS ? this.getCurrentTimeinMs() - this._lastStatsPostedAtTS : timeDiffInterval;
                this._statsMetric.interval = parseInt(timeDiffInterval ? timeDiffInterval / 1000 : 0);
                if (this._regStatus !== "PENDING" && !this._statsMetric.interval) return; // don't send stats if interval is zero
                //send JSONIFied QubitMetric to producer URL

                if (this._upshiftCount > 0) {
                    this.setPBStats(this.attributes.UPSHIFTCOUNT, this._upshiftCount);
                }

                if (this._downshiftCount > 0) {
                    this.setPBStats(this.attributes.DOWNSHIFTCOUNT, this._downshiftCount);
                }

                this._statsMetric.qubitData[this._recordIndex].streamID.pId = this.getChecksum(this._customerID, this.sessionId, this._statsMetric.timestamp);
                var finalJson = JSON.stringify(this._statsMetric);
                this._statsMetric.qubitData[this._recordIndex].segInfo = [];
                this._statsMetric.qubitData[this._recordIndex].pbInfo = [];
                this._upshiftCount = 0;
                this._downshiftCount = 0;

                this._statsToSend.push(finalJson);

                if (this._producerURL !== undefined) {
                    for (var i = 0; i < this._statsToSend.length; i++) {
                        var jsonToSend = this._statsToSend[i];
                        var xhttp = new XMLHttpRequest();
                        xhttp.open('POST', this._producerURL, true);
                        xhttp.timeout = this._httpPostTimeout;
                        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
                        xhttp.setRequestHeader('Content-type', 'application/json');
                        xhttp.send(jsonToSend);
                        this._lastStatsPostedAtTS = this.getCurrentTimeinMs(); //logger.logi("JSON to be sent="+finalJson+" to URL="+this._producerURL);

                        this._statsToSend[i] = null;
                    }

                    this._statsToSend = []; // clear all after sending
                } else {
                    if (this._statsToSend.length > this._maxEventsInQ) this._statsToSend.splice(this._maxEventsInQ - 4, 2);
                }
            }
        }), _defineProperty(_ref, "StreamInfo", function StreamInfo(maxRes, minRes, maxFps, minFps, numOfProfile, totalDuration, videoTrack, subtitleTrack, audioTrack, isVDSActive, isSubtitleActive) {
            return {
                maxRes: typeof maxRes !== 'undefined' ? maxRes : "1080*720",
                minRes: typeof minRes !== 'undefined' ? minRes : "720*640",
                maxFps: typeof maxFps !== 'undefined' ? maxFps : 0.0,
                minFps: typeof minFps !== 'undefined' ? minFps : 0.0,
                numOfProfile: typeof numOfProfile !== 'undefined' ? numOfProfile : 0,
                totalDuration: typeof totalDuration !== 'undefined' ? totalDuration : 0,
                videoTrack: typeof videoTrack !== 'undefined' ? videoTrack : "None",
                subtitleTrack: typeof subtitleTrack !== 'undefined' ? subtitleTrack : "None",
                audioTrack: typeof audioTrack !== 'undefined' ? audioTrack : "None",
                isVDSActive: typeof isVDSActive !== 'undefined' ? isVDSActive : "None",
                isSubtitleActive: typeof isSubtitleActive !== 'undefined' ? isSubtitleActive : "None"
            };
        }), _defineProperty(_ref, "getPlayDur", function getPlayDur() {
            var now = this.getCurrentTimeinMs();

            if (this._epocTime !== 0) {
                if (now > this._epocTime) {
                    this._playDur = parseInt((now - this._epocTime) / 1000);
                }
            } else {
                this._playDur = 0;
            }

            return this._playDur;
        }), _defineProperty(_ref, "getAdPlayDur", function getAdPlayDur() {
            var adPlayDur = 0;

            if (this._adInformation) {
                adPlayDur = this._adInformation._adPlayDur;
            }

            return adPlayDur;
        }), _defineProperty(_ref, "getAttribute", function getAttribute() {
            return this.attributes;
        }), _defineProperty(_ref, "StreamID", function StreamID(streamURL, assetId, custId, sessionId, isLive, dataSrc) {
            return {
                streamURL: typeof streamURL !== 'undefined' ? streamURL : "http://localhost",
                assetId: typeof assetId !== 'undefined' ? assetId : "",
                custId: typeof custId !== 'undefined' ? custId : 1111,
                sessionId: typeof sessionId !== 'undefined' ? sessionId : "session1",
                isLive: typeof isLive !== 'undefined' ? isLive : false,
                dataSrc: typeof dataSrc !== 'undefined' ? dataSrc : "player"
            };
        }), _defineProperty(_ref, "ContentMetadata", function ContentMetadata(assetId, assetName, contentType, drmProtection, episodeNumber, genre, season, seriesTitle, videoId, videoType) {
            return {
                assetId: typeof assetId !== 'undefined' ? assetId : "",
                assetName: typeof assetId !== 'undefined' ? assetName : "",
                contentType: typeof contentType !== 'undefined' ? contentType : "",
                drmProtection: typeof drmProtection !== 'undefined' ? drmProtection : "",
                episodeNumber: typeof episodeNumber !== 'undefined' ? episodeNumber : "",
                genre: typeof genre !== 'undefined' ? genre : "",
                season: typeof season !== 'undefined' ? season : "",
                seriesTitle: typeof seriesTitle !== 'undefined' ? seriesTitle : "",
                videoId: typeof videoId !== 'undefined' ? videoId : "",
                videoType: typeof videoType !== 'undefined' ? videoType : ""
            };
        }), _defineProperty(_ref, "SegmentInfo", function SegmentInfo(res, qbrBitrate, cbrBitrate, qbrQual, cbrQual, dur, seqNum, startTime, fps, profileNum, cbrProfileNum, cbrSize, qbrSize, vCodec, aCodec) {
            return {
                res: typeof res !== 'undefined' ? res : res,
                qbrBitrate: typeof qbrBitrate !== 'undefined' && qbrBitrate > 0 ? qbrBitrate : 0,
                cbrBitrate: typeof cbrBitrate !== 'undefined' && cbrBitrate > 0 ? cbrBitrate : 0,
                qbrQual: typeof qbrQual !== 'undefined' ? parseFloat(qbrQual.toFixed(2)) : 0.0,
                cbrQual: typeof cbrQual !== 'undefined' ? parseFloat(cbrQual.toFixed(2)) : 0.0,
                dur: typeof dur !== 'undefined' ? dur : 0,
                seqNum: typeof seqNum !== 'undefined' ? seqNum : 0,
                startTime: typeof startTime !== 'undefined' ? startTime : 0.0,
                fps: typeof fps !== 'undefined' ? fps : 0.0,
                cbrProfileNum: typeof cbrProfileNum !== 'undefined' ? cbrProfileNum : 0,
                profileNum: typeof profileNum !== 'undefined' ? profileNum : 0,
                cbrSize: typeof cbrSize !== 'undefined' ? Math.floor(cbrSize) : 0,
                qbrSize: typeof qbrSize !== 'undefined' ? Math.floor(qbrSize) : 0,
                vCodec: typeof vCodec !== 'undefined' ? vCodec : "",
                aCodec: typeof aCodec !== 'undefined' ? aCodec : ""
            };
        }), _defineProperty(_ref, "ClientInfo", function ClientInfo(location, operator, cdn, nwType, platform, scrnRes) {
            return {
                location: typeof location !== 'undefined' ? location : "",
                operator: typeof operator !== 'undefined' ? operator : "",
                cdn: typeof cdn !== 'undefined' ? cdn : "",
                nwType: typeof nwType !== 'undefined' ? nwType : "",
                platform: typeof platform !== 'undefined' ? platform : "",
                scrnRes: typeof scrnRes !== 'undefined' ? scrnRes : ""
            };
        }), _defineProperty(_ref, "PlaybackInfo", function PlaybackInfo(latency, buffWait, frameloss, bwInUse, lastTS, playerState) {
            return {
                latency: typeof latency !== 'undefined' ? latency : 0.0,
                buffWait: typeof buffWait !== 'undefined' ? buffWait : 0.0,
                frameloss: typeof frameloss !== 'undefined' ? frameloss : 0,
                bwInUse: typeof bwInUse !== 'undefined' ? bwInUse : 0,
                lastTS: typeof lastTS !== 'undefined' ? lastTS : 0,
                playerState: typeof playerState !== 'undefined' ? playerState : 0
            };
        }), _defineProperty(_ref, "EventMetricTemplate", function EventMetricTemplate() {
            return {
                streamID: {},
                pbEventInfo: {},
                streamInfo: {},
                contentMetadata: {},
                sdkInfo: {},
                pbInfo: []
            };
        }), _defineProperty(_ref, "QBRMetricTemplate", function QBRMetricTemplate() {
            return {
                streamID: {},
                streamInfo: {},
                contentMetadata: {},
                segInfo: [],
                pbInfo: [],
                sdkInfo: {}
                // diagnostics: {}
            };
        }), _defineProperty(_ref, "resetAdvertisementInfo", function resetAdvertisementInfo() {
            this._adInformation._adResolution = undefined;
            this._adInformation._adClient = undefined;
            this._adInformation._adId = undefined;
            this._adInformation._adDuration = undefined;
            this._adInformation._adPosition = undefined;
            this._adInformation._adLinear = undefined;
            this._adInformation._adCreativeType = undefined;
            this._adInformation._adServer = undefined;
            this._adInformation._prevAdState = undefined;
            this._adInformation._adPlaybackTime = undefined;
            this._adInformation._adCreativeId = undefined;
            this._adInformation._adTitle = undefined;
            this._adInformation._adBitrate = undefined;
            this._adInformation._adUrl = undefined;
            this._adInformation._playSent = false;
            this._adInformation._adPlaybackStartWallClockTime = undefined;
            this._adInformation._adPlayDur = 0;
            this._adInformation._adLastPlayingEventTimeStamp = -1;
            this._adInformation._adLastAdEventTimeStamp = -1;
            this._adInformation._isBumper = false;
            this._adInformation._adPodIndex = -2;
            this._adInformation._adPodLength = -1;
            this._adInformation._adPositionInPod = -1;
            this._adInformation._adScheduledTime = -1.0;
            this._adEpocTime = 0;
            this._adPauseStartTime = 0;
            this._adStartEpocTime = 0;
            this._adLoadTime = 0;
            this._adStartEpocTime = 0;
            this._adBuffWaitForInterval = 0;
            this._adSumBuffWait = 0;
            this._adPauseDuration = 0;
            this._adPauseDurationToOffsetFromInterval = 0;
            this._adLoadStartTime = 0;
        }), _defineProperty(_ref, "resetForNewAd", function resetForNewAd() {
            this._adInformation._prevAdState = null;
            this._adInformation._adPlaybackTime = -1;
            this._adInformation._playSent = false;
            this._adInformation._adPlaybackStartWallClockTime = -1;
            this._adInformation._adLastPlayingEventTimeStamp = -1;
            this._adInformation._adLastAdEventTimeStamp = -1;
            this._adInformation._adPlayDur = 0;
            this._adInformation._adPodIndex = -2;
            this._adInformation._adPodLength = -1;
            this._adInformation._adPositionInPod = -1;
            this._adInformation._adCreativeId = undefined;
            this._adInformation._adTitle = undefined;
            this._adInformation._adBitrate = undefined;
            this._adInformation._adUrl = undefined;
            this._adEpocTime = 0;
            this._adPauseStartTime = 0;
            this._adStartEpocTime = 0;
            this._adLoadTime = 0;
            this._adStartEpocTime = 0;
            this._adBuffWaitForInterval = 0;
            this._adSumBuffWait = 0;
            this._adPauseDuration = 0;
            this._adPauseDurationToOffsetFromInterval = 0;
            this._adLoadStartTime = 0;
        }), _defineProperty(_ref, "sendAdPlayingEvent", function sendAdPlayingEvent(timeNow, force) {
            if (this._adInformation != null && this._adInformation._playSent && this._adInformation._prevAdState != MMAdState.AD_PAUSED) {
                var elapsed = parseInt((timeNow - this._adInformation._adPlaybackStartWallClockTime) / 1000);

                if (force || elapsed > 0 && elapsed % (this._KAdKeepAliveInterval / 1000) == 0) {
                    this._adInformation._adPlaybackStartWallClockTime = timeNow;
                    this.populateAdRelatedInfo(timeNow);
                    this.notifyEvent("AD_PLAYING", "AD KEEP ALIVE", "AD_PLAYING", this.millisecToSec(this._adInformation._adPlaybackTime));
                    this._adInformation._adLastPlayingEventTimeStamp = timeNow;
                    this._adInformation._adLastAdEventTimeStamp = this.getCurrentTimeinMs();
                }
            }
        }), _defineProperty(_ref, "resetAdInfoIfInitialState", function resetAdInfoIfInitialState(newState) {
            if (this._adInformation == null) {
                this._adInformation = new MMAdvertisentInformation();
            }

            if (newState == MMAdState.AD_REQUEST || this._adInformation._prevAdState == null) {
                //VAST only
                this.resetAdvertisementInfo();
                this._adLoadStartTime = this._adPauseStartTime = this._adPauseDuration = this._adLoadTime = 0;
                this._adBuffWaitForInterval = this._adSumBuffWait = 0;
            } else {
                /*
                if(newState == MMAdState.AD_STARTED && this._adInformation._prevAdState != MMAdState.AD_REQUEST){ //VPAID Only
                    this.resetAdvertisementInfo();
                }
                */
                if (newState == MMAdState.AD_IMPRESSION && this._adInformation._prevAdState != MMAdState.AD_STARTED && this._adInformation._prevAdState != MMAdState.AD_REQUEST && this._adInformation._prevAdState != MMAdState.AD_IMPRESSION) {
                    this.resetForNewAd();
                    this._adLoadStartTime = this._adPauseStartTime = this._adPauseDuration = this._adLoadTime = 0;
                    this._adBuffWaitForInterval = this._adSumBuffWait = 0;
                }
            }

            var playBackPos = Math.ceil(this._pbTime + 3);

            if (this._adInformation._adPosition == undefined || this._adInformation._adPosition == null) {
                if (this.getEPState() == MMExperienceProbeState.STARTED || this._pbTime <= 1) {
                    this._adInformation._adPosition = "pre";
                } else if (!this._adInformation.prevAdState && this._adInformation.prevAdState != MMPlayerState.STOPPED && this._pbTime > 0 && playBackPos < this._totalDuration) {
                    this._adInformation._adPosition = "mid";
                } else if (!this._adInformation.prevAdState && this._adInformation.prevAdState == MMPlayerState.STOPPED || this._pbTime > 0 && playBackPos >= this._totalDuration) {
                    this._adInformation._adPosition = "post";
                }
            }

            this._adInformation._prevAdState = newState;
        }), _defineProperty(_ref, "populateAdRelatedInfo", function populateAdRelatedInfo(timeNow) {
            if (!this._adInformation) return;

            if (typeof this._eventMetric.qubitData[this._recordIndex].adInfo === 'undefined') {
                this._eventMetric.qubitData[this._recordIndex].adInfo = {};
            }

            if (this._adInformation._adClient !== undefined) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adClient"] = this._adInformation._adClient;
            }

            if (this._adInformation._adId !== undefined) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adId"] = this._adInformation._adId;
            }

            if (this._adInformation._adDuration !== undefined) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adDuration"] = parseFloat((this._adInformation._adDuration / 1000).toFixed(2));
            }

            if (this._adInformation._adPosition !== undefined) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adPosition"] = this._adInformation._adPosition;
            }

            if (this._adInformation._adLinear !== undefined) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adLinear"] = this._adInformation._adLinear;
            }

            if (this._adInformation._adCreativeType !== undefined) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adCreativeType"] = this._adInformation._adCreativeType;
            }

            if (this._adInformation._adServer !== undefined) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adSystem"] = this._adInformation._adServer;
            }

            if (this._adInformation._adResolution !== undefined) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adResolution"] = this._adInformation._adResolution;
            }

            if (this._adInformation._adTitle !== undefined) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adTitle"] = this._adInformation._adTitle;
            }

            if (this._adInformation._adBitrate !== undefined) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adBitrate"] = this._adInformation._adBitrate;
            }

            if (this._adInformation._adUrl !== undefined) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adUrl"] = this._adInformation._adUrl;
            }

            if (this._adInformation._adCreativeId !== undefined) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adCreativeId"] = this._adInformation._adCreativeId;
            }

            if (this._adInformation._adPodLength > 0) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adPodLength"] = this._adInformation._adPodLength;
            }

            if (this._adInformation._adPodIndex >= -1) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adPodIndex"] = this._adInformation._adPodIndex;
            }

            if (this._adInformation._adPositionInPod > 0) {
                this._eventMetric.qubitData[this._recordIndex].adInfo["adPodPosition"] = this._adInformation._adPositionInPod;
            }

            this._eventMetric.qubitData[this._recordIndex].adInfo["isBumper"] = this._adInformation._isBumper; //if(_adInformation._adLastAdEventTimeStamp != -1){

            this._eventMetric.qubitData[this._recordIndex].adInfo["adInterval"] = this.getAdInterval(timeNow); //}
        }), _defineProperty(_ref, "getAdInterval", function getAdInterval(timeNow) {
            var adIntervalInMS = 0.0;

            if (this._adInformation != null && this._adInformation._adLastAdEventTimeStamp > 0) {
                if (this._adPauseStartTime != null && this._adPauseStartTime > 0) {
                    //We are in paused state, let us assume current time to be same when playback was PAUSED
                    timeNow = this._adPauseStartTime;
                }

                adIntervalInMS = (timeNow - this._adInformation._adLastAdEventTimeStamp) * 1.0 / 1000;
            }

            if (this._adPauseDurationToOffsetFromInterval > 0) {
                adIntervalInMS = adIntervalInMS - this._adPauseDurationToOffsetFromInterval / 1000;
                this._adPauseDurationToOffsetFromInterval = 0;
            }

            if (this._adBuffWaitForInterval > 0) {
                adIntervalInMS = adIntervalInMS - this._adBuffWaitForInterval / 1000;
                this._adInformation._adPlayDur += this._adBuffWaitForInterval / 1000;
                this._adBuffWaitForInterval = 0;
            }

            if (adIntervalInMS < 0) {
                adIntervalInMS = 0.0;
            }

            this._adInformation._adPlayDur += adIntervalInMS;
            return adIntervalInMS;
        }), _defineProperty(_ref, "millisecToSec", function millisecToSec(millisec) {
            return parseFloat(millisec * 1.0 / 1000).toFixed(2);
        }), _defineProperty(_ref, "reportAdState", function reportAdState(adState) {
            var now = this.getCurrentTimeinMs();
            this.resetAdInfoIfInitialState(adState);
            this.populateAdRelatedInfo(now);

            switch (adState) {
                case MMAdState.AD_BLOCKED:
                    {
                        this.notifyEvent("AD_BLOCK", "Ad blocked", "AD_BLOCK", 0);
                        break;
                    }

                case MMAdState.AD_IMPRESSION:
                    {
                        this._adLoadStartTime = now;
                        this._adPauseStartTime = -1;
                        this.notifyEvent("AD_IMPRESSION", "Ad impression has been made", "AD_IMPRESSION", 0);
                        break;
                    }

                case MMAdState.AD_STARTED:
                case MMAdState.AD_PLAY:
                    {
                        this._adBeforePlayback = true;

                        if (this._adInformation._playSent == false) {
                            this._adInformation._playSent = true;

                            if (this._adLoadStartTime > 0) {
                                if (this.loadStartTime > 0 && this._adLoadStartTime > this.loadStartTime) {//adLoadStartTime = loadStartTime;
                                }

                                this._adLoadTime = now - this._adLoadStartTime;

                                if (this._adPauseDuration > 0) {
                                    this._adLoadTime -= this._adPauseDuration;
                                }

                                if (this._adLoadTime < 0) {
                                    this._adLoadTime = 0;
                                }

                                this._adInformation._adPlayDur += Math.ceil(this._adLoadTime / 1000);
                            } // Update Ad interval after Ad latency


                            this.populateAdRelatedInfo(now);
                            this.setPBStats(this.attributes.LATENCY, this._adLoadTime);
                            this.notifyEvent("AD_PLAY", "Ad Playback started", "AD_PLAY", 0);
                            this.adLoadStartTime = 0;
                            this._adInformation._adLastPlayingEventTimeStamp = this._adInformation._adPlaybackStartWallClockTime = this.getCurrentTimeinMs();
                            this._adInformation._adLastAdEventTimeStamp = this._adInformation._adLastPlayingEventTimeStamp;
                        }

                        break;
                    }

                case MMAdState.AD_CLICKED:
                    {
                        this._adBeforePlayback = true;
                        this.notifyEvent("AD_CLICK", "Ad has been clicked", "AD_CLICK", this.millisecToSec(this._adInformation._adPlaybackTime));
                        this._adInformation._adLastAdEventTimeStamp = now;
                        break;
                    }

                case MMAdState.AD_PAUSED:
                    {
                        this._adPauseStartTime = this.getCurrentTimeinMs();
                        this.notifyEvent("AD_PAUSED", "Ad has been paused", "AD_PAUSED", this.millisecToSec(this._adInformation._adPlaybackTime));
                        this._adInformation._adLastAdEventTimeStamp = now;
                        break;
                    }

                case MMAdState.AD_RESUMED:
                    {
                        if (this._adPauseStartTime > 0) {
                            this._adPauseDuration = now - this._adPauseStartTime;

                            if (this._adPauseDuration < 0) {
                                this._adPauseDuration = 0;
                            }

                            this._adPauseDurationToOffsetFromInterval = this._adPauseDuration;
                        }

                        this.setPBStats(this.attributes.PAUSEDURATION, this._adPauseDuration);
                        this.populateAdRelatedInfo(now);
                        this.notifyEvent("AD_RESUMED", "Ad has been resumed", "AD_RESUMED", this.millisecToSec(this._adInformation._adPlaybackTime));
                        this._adInformation._adLastAdEventTimeStamp = now;
                        this._adPauseStartTime = -1;
                        break;
                    }

                case MMAdState.AD_SKIPPED:
                    {
                        this._adBeforePlayback = true;
                        if (this._adSumBuffWait < 0) this._adSumBuffWait = 0;
                        this._adSumBuffWait += this._adLoadTime * 1.0; //sumbuffwait include with latency

                        this.setBufPBEvent(this.attributes.SUMBUFFERING, this._adSumBuffWait);
                        this.notifyEvent("AD_SKIPPED", "Ad has been skipped", "AD_SKIPPED", this.millisecToSec(this._adInformation._adPlaybackTime));
                        this._adInformation._adLastAdEventTimeStamp = now;

                        if (this._pbTimeBeforeAdStart > 0) {
                            this._pbTime = this._pbTimeBeforeAdStart;
                        }

                        break;
                    }

                case MMAdState.AD_COMPLETED:
                    {
                        this._adBeforePlayback = true;
                        if (this._adSumBuffWait < 0) this._adSumBuffWait = 0;
                        this._adSumBuffWait += this._adLoadTime * 1.0; //sumbuffwait include with latency

                        this.setBufPBEvent(this.attributes.SUMBUFFERING, this._adSumBuffWait);

                        if (this._adInformation._adDuration > 0 && (this._adInformation._adPlaybackTime - 90 * this._adInformation._adDuration / 100 >= 0 || Math.abs(this._adInformation._adPlaybackTime - this._adInformation._adDuration) < 2)) //if 95% of video has been watched the
                        {
                            this.notifyEvent("AD_COMPLETE", "Ad completed playing", "AD_COMPLETE", this.millisecToSec(this._adInformation._adPlaybackTime));
                        } else {
                            this.notifyEvent("AD_ENDED", "Ad ended", "AD_ENDED", this.millisecToSec(this._adInformation._adPlaybackTime));

                            if (this._pbTimeBeforeAdStart > 0) {
                                this._pbTime = this._pbTimeBeforeAdStart;
                            }
                        }

                        this._adInformation._playSent = false;
                        this._adInformation._adLastAdEventTimeStamp = now;
                        break;
                    }

                case MMAdState.AD_ENDED:
                    {
                        this._adBeforePlayback = true;
                        if (this._adSumBuffWait < 0) this._adSumBuffWait = 0;
                        this._adSumBuffWait += this._adLoadTime * 1.0; //sumbuffwait include with latency

                        this.setBufPBEvent(this.attributes.SUMBUFFERING, this._adSumBuffWait);
                        this.notifyEvent("AD_ENDED", "Ad ended", "AD_ENDED", this.millisecToSec(this._adInformation._adPlaybackTime));
                        this._adInformation._playSent = false;
                        this._adInformation._adLastAdEventTimeStamp = now;

                        if (this._pbTimeBeforeAdStart > 0) {
                            this._pbTime = this._pbTimeBeforeAdStart;
                        }

                        break;
                    }

                case MMAdState.AD_ERROR:
                    {
                        this.notifyEvent("AD_ERROR", event.message, "AD_ERROR", this.millisecToSec(this._adInformation._adPlaybackTime));
                        this._adInformation._playSent = false;
                        this._adInformation._adLastAdEventTimeStamp = now;

                        if (this._pbTimeBeforeAdStart > 0) {
                            this._pbTime = this._pbTimeBeforeAdStart;
                        }

                        break;
                    }

                case MMAdState.AD_REQUEST:
                    {
                        this.notifyEvent("AD_REQUEST", "Ad has been requested", "AD_REQUEST", 0);
                        break;
                    }

                case MMAdState.AD_PLAYING:
                    {
                        this.sendAdPlayingEvent(now, false);
                        break;
                    }

                case MMAdState.AD_FIRST_QUARTILE:
                    {
                        this.notifyEvent("AD_PLAYED_FIRST_QUARTILE", "Ad reached first quartile", "AD_PLAYED_FIRST_QUARTILE", this.millisecToSec(this._adInformation._adPlaybackTime));
                        this._adInformation._adLastAdEventTimeStamp = now;
                        break;
                    }

                case MMAdState.AD_MIDPOINT:
                    {
                        this.notifyEvent("AD_PLAYED_SECOND_QUARTILE", "Ad reached midpoint", "AD_PLAYED_SECOND_QUARTILE", this.millisecToSec(this._adInformation._adPlaybackTime));
                        this._adInformation._adLastAdEventTimeStamp = now;
                        break;
                    }

                case MMAdState.AD_THIRD_QUARTILE:
                    {
                        this.notifyEvent("AD_PLAYED_THIRD_QUARTILE", "Ad reached third quartile", "AD_PLAYED_THIRD_QUARTILE", this.millisecToSec(this._adInformation._adPlaybackTime));
                        this._adInformation._adLastAdEventTimeStamp = now;
                        break;
                    }
            }
        }), _defineProperty(_ref, "reportAdError", function reportAdError(error, adPlaybackPosMilliSec) {
            this.populateAdRelatedInfo();
            if (adPlaybackPosMilliSec == undefined) adPlaybackPosMilliSec = this._adInformation._adPlaybackTime;
            if (adPlaybackPosMilliSec === undefined) adPlaybackPosMilliSec = 0;
            this.notifyEvent("AD_ERROR", error, "AD_ERROR", this.millisecToSec(adPlaybackPosMilliSec));
        }), _defineProperty(_ref, "reportAdPlaybackTime", function reportAdPlaybackTime(adPlaybackTime) {
            if (adPlaybackTime >= 0 && this._adInformation) {
                var now = this.getCurrentTimeinMs();
                this._adInformation._adPlaybackTime = adPlaybackTime;
                this.sendAdPlayingEvent(now, false);
            }
        }), _defineProperty(_ref, "reportAdInfo", function reportAdInfo(adInfo) {
            if (!this._adInformation) {
                this._adInformation = new MMAdvertisentInformation();
            }

            if (adInfo) {
                if (adInfo.adClient !== undefined) {
                    this._adInformation._adClient = adInfo.adClient;
                }

                if (adInfo.adId !== undefined) {
                    this._adInformation._adId = adInfo.adId;
                }

                if (adInfo.adDuration !== undefined) {
                    this._adInformation._adDuration = adInfo.adDuration;
                }

                if (adInfo.adPosition !== undefined) {
                    this._adInformation._adPosition = adInfo.adPosition;
                }

                if (adInfo.adIsLinear !== undefined) {
                    if (adInfo.adIsLinear) {
                        this._adInformation._adLinear = "linear";
                    } else {
                        this._adInformation._adLinear = "nonlinear";
                    }
                }

                if (adInfo.adCreativeType !== undefined) {
                    this._adInformation._adCreativeType = adInfo.adCreativeType;
                }

                if (adInfo.adServer !== undefined) {
                    this._adInformation._adServer = adInfo.adServer;
                }

                if (adInfo.adResolution !== undefined) {
                    this._adInformation._adResolution = adInfo.adResolution;
                }

                this._adInformation._isBumper = adInfo.isBumper;

                if (adInfo.adPodIndex >= -1) {
                    this._adInformation._adPodIndex = adInfo.adPodIndex;
                }

                if (adInfo.adPodLength > 0) {
                    this._adInformation._adPodLength = adInfo.adPodLength;
                }

                if (adInfo.adPositionInPod > 0) {
                    this._adInformation._adPositionInPod = adInfo.adPositionInPod;
                }

                if (adInfo.adScheduledTime >= 0) {
                    this._adInformation._adScheduledTime = adInfo.adScheduledTime;
                }

                if (adInfo.adUrl !== undefined) {
                    this._adInformation._adUrl = adInfo.adUrl;
                }

                if (adInfo.adCreativeId !== undefined) {
                    this._adInformation._adCreativeId = adInfo.adCreativeId;
                }

                if (adInfo.adTitle !== undefined) {
                    this._adInformation._adTitle = adInfo.adTitle;
                }

                if (adInfo.adBitrate !== undefined) {
                    this._adInformation._adBitrate = adInfo.adBitrate;
                }
            }
        }), _defineProperty(_ref, "isQBRDisabled", function isQBRDisabled() {
            if (this._mode === null || this._mode == 'QBRDisabled-NoMetafile' || this._mode == MMQBRMode.QBRModeDisabled || this._mode == 'QBRDisabled-QMetric' || this._mode == 'QBRDisabled-NoPresentationInfo' || this._mode == 'QBRDisabled-NoABR' || this._mode == 'QBRDisabled-LiveSessionNotSupported' || this._mode == 'QBRDisabled-ContentNotSupportedForQBR') return true; else return false;
        }), _defineEnumerableProperties(_ref, _mutatorMap), _ref;
};; "use strict";

var HttpUtil = function HttpUtil() {
    var xmlhttp = new XMLHttpRequest();
    var onSuccess = undefined;
    var onErrorCodes = undefined;
    var url = undefined;

    var cleanUp = function cleanUp() {
        if (xmlhttp && xmlhttp.readyState != 4) {
            xmlhttp.abort();
        }
    };

    var doGet = function doGet(url, data) {
        var that = this;
        return new Promise(function (resolve, reject) {
            if (data !== undefined) {
                url = url + jsonToQueryString(data);
            }

            xmlhttp.open('GET', url);
            xmlhttp.timeout = 25000;

            xmlhttp.onload = function () {
                if (xmlhttp.status == 200) {
                    resolve(xmlhttp.response);
                } else {
                    reject(Error(xmlhttp.statusText));
                }
            };

            xmlhttp.onerror = function () {
                reject(Error("Network Error"));
            };

            xmlhttp.abort = function () {
                reject(Error("NetRequest Aborted"));
            };

            xmlhttp.ontimeout = function () {
                reject(Error("NetRequest timeout"));
            };

            xmlhttp.send();
        });
    };

    var loadend = function loadend(event) {
        var xhr = event.currentTarget;
        var status = xhr.status; // don't proceed if xhr has been aborted

        if (status >= 200 && status < 300) {
            this.onSuccess(event);
        } else {
            // error ...
            // console.log(event + "<-- event");
            this.onErrorCodes(event);
        }
    };

    var loadprogress = function loadprogress(event) { };

    var jsonToQueryString = function jsonToQueryString(json) {
        var parameterString = '?' + Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
        }).join('&');
        return parameterString;
    };

    return {
        doGet: doGet,
        cleanUp: cleanUp
    };
};; "use strict";

var MMEXPERIENCEPROBEMETRICS = {
    MMEXP_LATENCY: 0.0,
    MMEXP_STALLCOUNT: 0,
    MMEXP_SUMBUFFWAIT: 0.0,
    MMEXP_PLAYDURATION: 0,
    //in millisec
    MMEXP_PLAYBACKPOSITION: 0,
    //in millisec
    MMEXP_OPERATOR: "Unknown",
    MMEXP_MANIFESTURL: "",
    MMEXP_LASTSTATE: "IDLE",
    MMEXP_STATE: "IDLE",
    MMEXP_FRAMELOSS: 0
};; "use strict";
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module FactoryMaker
 */

var QBRFactoryMaker = function () {
    var instance;
    var extensions = [];
    var singletonContexts = [];

    function extend(name, childInstance, override, context) {
        var extensionContext = getExtensionContext(context);

        if (!extensionContext[name] && childInstance) {
            extensionContext[name] = {
                instance: childInstance,
                override: override
            };
        }
    }
    /**
     * Use this method from your extended object.  this.factory is injected into your object.
     * this.factory.getSingletonInstance(this.context, 'VideoModel')
     * will return the video model for use in the extended object.
     *
     * @param {Object} context - injected into extended object as this.context
     * @param {string} className - string name found in all dash.js objects
     * with name __dashjs_factory_name Will be at the bottom. Will be the same as the object's name.
     * @returns {*} Context aware instance of specified singleton name.
     * @memberof module:FactoryMaker
     * @instance
     */


    function getSingletonInstance(context, className) {
        for (var i in singletonContexts) {
            var obj = singletonContexts[i];

            if (obj.context === context && obj.name === className) {
                return obj.instance;
            }
        }

        return null;
    }
    /**
     * Use this method to add an singleton instance to the system.  Useful for unit testing to mock objects etc.
     *
     * @param {Object} context
     * @param {string} className
     * @param {Object} instance
     * @memberof module:FactoryMaker
     * @instance
     */


    function setSingletonInstance(context, className, instance) {
        for (var i in singletonContexts) {
            var obj = singletonContexts[i];

            if (obj.context === context && obj.name === className) {
                singletonContexts[i].instance = instance;
                return;
            }
        }

        singletonContexts.push({
            name: className,
            context: context,
            instance: instance
        });
    }

    function getClassFactory(classConstructor) {
        return function (context) {
            if (context === undefined) {
                context = {};
            }

            return {
                create: function create() {
                    return merge(classConstructor.__dashjs_factory_name, classConstructor.apply({
                        context: context
                    }, arguments), context, arguments);
                }
            };
        };
    }

    function getSingletonFactory(classConstructor) {
        return function (context) {
            var instance;

            if (context === undefined) {
                context = {};
            }

            return {
                getInstance: function getInstance() {
                    // If we don't have an instance yet check for one on the context
                    if (!instance) {
                        instance = getSingletonInstance(context, classConstructor.__dashjs_factory_name);
                    } // If there's no instance on the context then create one


                    if (!instance) {
                        instance = merge(classConstructor.__dashjs_factory_name, classConstructor.apply({
                            context: context
                        }, arguments), context, arguments);
                        singletonContexts.push({
                            name: classConstructor.__dashjs_factory_name,
                            context: context,
                            instance: instance
                        });
                    }

                    return instance;
                }
            };
        };
    }

    function merge(name, classConstructor, context, args) {
        var extensionContext = getExtensionContext(context);
        var extensionObject = extensionContext[name];

        if (extensionObject) {
            var extension = extensionObject.instance;

            if (extensionObject.override) {
                //Override public methods in parent but keep parent.
                extension = extension.apply({
                    context: context,
                    factory: instance,
                    parent: classConstructor
                }, args);

                for (var prop in extension) {
                    if (classConstructor.hasOwnProperty(prop)) {
                        classConstructor[prop] = extension[prop];
                    }
                }
            } else {
                //replace parent object completely with new object. Same as dijon.
                return extension.apply({
                    context: context,
                    factory: instance
                }, args);
            }
        }

        return classConstructor;
    }

    function getExtensionContext(context) {
        var extensionContext;
        extensions.forEach(function (obj) {
            if (obj === context) {
                extensionContext = obj;
            }
        });

        if (!extensionContext) {
            extensionContext = extensions.push(context);
        }

        return extensionContext;
    }

    instance = {
        extend: extend,
        getSingletonInstance: getSingletonInstance,
        setSingletonInstance: setSingletonInstance,
        getSingletonFactory: getSingletonFactory,
        getClassFactory: getClassFactory
    };
    return instance;
}();; "use strict";

var MMLogger = function () {
    var DEFAULT_LEVEL = 2;
    var LOG_LEVEL = isNaN(MMSTREAMSMARTERCONSTANTS.SDK_CONFIG.log_level) ? DEFAULT_LEVEL : MMSTREAMSMARTERCONSTANTS.SDK_CONFIG.log_level;
    var logLevels = {
        VERBOSE: 6,
        DEBUG: 5,
        INFO: 4,
        ANALYZE: 3,
        WARN: 2,
        ERROR: 1,
        OFF: 0
    };

    var textToLevel = function textToLevel(levelText) {
        for (var text in logLevels) {
            if (text === levelText) return logLevels[text];
        }

        return logLevels["OFF"];
    };

    var setLogLevel = function setLogLevel(level) {
        if (level < 0) level = 0;
        LOG_LEVEL = level;
    };

    var log = function log(levelText, text) {
        if (textToLevel(levelText) <= LOG_LEVEL) console.log("[" + levelText + "] : " + text);
    };

    return {
        setLogLevel: setLogLevel,
        log: log
    };
}();; "use strict";

var utils = {
    append: function append(dest, source) {
        for (var key in source) {
            //if (source.hasOwnProperty(key))
            {
                dest[key] = source[key];
            }
        }
    }
};;/*jslint es5 */
"use strict";

var MMSmartStreamingImpl = function MMSmartStreamingImpl() {
    var _registered = false;
    var _qbrEngine = undefined;

    var _epObj = new ExperienceProbe();

    var _presentationInformation = null;
    var _statistics = undefined;
    var _getQbrChunkUsed = false;
    var _enableTraceLog = false;
    var _disableManifestFetch = false;
    var _initializeExtPending = false;

    var _qbrInitializePromise, _mode, _manifestURL, _metaURL;

    var _crsPoller = undefined;
    var _custID = undefined;

    var onCreateInstance = function onCreateInstance() {
        if (typeof MMQubitEngineImpl !== 'undefined') {
            _qbrEngine = new MMQubitEngineImpl();
        }

        if (typeof crsPoller !== 'undefined') {
            _crsPoller = new crsPoller();
        }

        if (typeof statistics !== 'undefined') {
            _statistics = new statistics();
        }
    };

    onCreateInstance();

    var mmTraceLogger = function mmTraceLogger(TraceString) {
        if (_enableTraceLog) console.log("mmTrace:" + new Date().getTime() + "::" + TraceString);
    };

    var getSmartRouteUrl = function getSmartRouteUrl(downloadUrl) {
        if (_crsPoller) {
            return _crsPoller.getCRSUrl(downloadUrl);
        }

        return downloadUrl;
    };

    var version = function version() {
        return MMSTREAMSMARTERCONSTANTS.SDK_CONFIG.sdkVersion;
    };

    var getRegistrationStatus = function getRegistrationStatus() {
        return _registered;
    };

    var registerMMSmartStreaming = function registerMMSmartStreaming(playerName, customerID, component, subscriberID, domainName, subscriberType, subscriberTag) {
        mmTraceLogger(" registerMMSmartStreaming In " + playerName + " " + customerID + " " + subscriberID + " " + domainName + " " + component, " ", +subscriberType + " " + subscriberTag);

        _epObj.reset();

        if (MMSTREAMSMARTERCONSTANTS.SDK_CONFIG.statistics && _statistics) {
            _statistics.setExpProbe(_epObj);
        }

        _epObj.registerMMSmartStreaming(playerName, customerID, subscriberID, domainName, subscriberType, subscriberTag);

        _epObj.reportSDKVersion(MMSTREAMSMARTERCONSTANTS.SDK_CONFIG.sdkVersion);

        _epObj.reportHintFileVersion(MMSTREAMSMARTERCONSTANTS.SDK_CONFIG.hintFileVersion);

        _epObj.reportComponent(component);

        _registered = true;
        _custID = customerID;
    };

    var updateSubscriberID = function updateSubscriberID(subscriberID) {
        _epObj.updateSubscriberID(subscriberID);
    };

    var updateSubscriber = function updateSubscriber(subscriberID, subscriberType, subscriberTag) {
        _epObj.updateSubscriber(subscriberID, subscriberType, subscriberTag);
    };

    function qbrInitializePromise() {
        var res, rej;
        var promise = new Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });
        promise.resolve = res;
        promise.reject = rej;
        return promise;
    }

    var initializeSession = function initializeSession(mode, manifestURL, metaURL, contentMetadata) {
        mmTraceLogger(" initializeSession In mode: " + mode + " url:" + manifestURL + " metaurl: " + metaURL + " contentMetadata:" + contentMetadata);
        _presentationInformation = null;

        _epObj.reset();

        if (MMSTREAMSMARTERCONSTANTS.SDK_CONFIG.statistics && _statistics) {
            _statistics.resetStatistics();
        }

        if (_qbrEngine) {
            _qbrEngine.reset();

            _qbrEngine.setInitialParameter(_epObj, MMQBRMode.QBRModeDisabled);
        }

        var init = _epObj.initializeSession(mode, manifestURL, metaURL, contentMetadata);

        return init.then(function (dataraw) {
            var data = JSON.parse(dataraw);

            if (_custID !== undefined && data.crsUrl !== undefined && data.crsEnabled !== undefined && data.crsInterval !== undefined) {
                if (_crsPoller) {
                    _crsPoller.initialize(_custID, data.crsUrl, data.crsEnabled, data.crsInterval, _epObj);
                }
            }

            if (data.producerURL !== undefined) {
                _epObj.reportRegistrationSuccess(data);

                _epObj.reportAssetID(contentMetadata.assetID, contentMetadata.assetName, contentMetadata.videoId);

                if (_qbrEngine) {
                    _qbrEngine.setInitialParameter(_epObj, data.mode);

                    metaURL = _qbrEngine.getHintFileUrlFromResponse(manifestURL, metaURL, data, contentMetadata.assetID, contentMetadata.assetName);
                }

                setPresentationInformation(_presentationInformation);
                MMLogger.log("VERBOSE", " initializing QEngine");

                if (_qbrEngine) {
                    if (!_disableManifestFetch) {
                        var qbrPromise = _qbrEngine.initialize(_epObj, data.mode, manifestURL, metaURL);

                        _qbrEngine.setPresentationInformation(_presentationInformation);

                        return qbrPromise;
                    } else {
                        if (_qbrEngine) {
                            _initializeExtPending = true;
                            _mode = data.mode;
                            _metaURL = metaURL;
                            _manifestURL = manifestURL;
                            _qbrInitializePromise = qbrInitializePromise();
                            return _qbrInitializePromise;
                        }
                    }
                } else {
                    // Note: Analytics Only SDK
                    return new Promise(function (resolve, reject) {
                        MMLogger.log("VERBOSE", "InitializeSession Success"); //console.log("InitializeSession.");

                        resolve("InitializeSession success");
                    });
                }
            } else {
                _epObj.reportRegistrationFailure();

                _epObj.reset();

                return new Promise(function (resolve, reject) {
                    MMLogger.log("VERBOSE", "Playback Registration Failed"); //console.log("Playback Registration Failed.");

                    reject("Playback Registration Failed.");
                });
            }
        })["catch"](function (status) {
            if (status != "QBRSDK : QEngine cannot be initialized....") {
                status = "Experience Probe Initialisation Failed.";

                _epObj.reportRegistrationFailure();

                _epObj.reset();

                if (_qbrEngine) _qbrEngine.setInitialParameter(_epObj, "QBRDisabled");
            } else {
                status = "MMSmartStreaming :  QBR component cannot be initialized...";
                if (_qbrEngine) _qbrEngine.setInitialParameter(_epObj, "QBRDisabled");
            }

            setPresentationInformation(_presentationInformation);
            return new Promise(function (resolve, reject) {
                MMLogger.log("VERBOSE", status);
                reject(status);
            });
        });
    };

    var setPresentationInformation = function setPresentationInformation(presentationInfo) {
        if (presentationInfo === null || presentationInfo === undefined) return;
        mmTraceLogger(" setPresentationInformation In - live?" + presentationInfo.isLive + " duration:" + presentationInfo.duration + " repsCnt:" + presentationInfo.representationArray.length);
        _presentationInformation = presentationInfo;

        if (_presentationInformation.isLive === 1) {
            _presentationInformation.isLive = true;
        }

        if (_presentationInformation.isLive === 0) {
            _presentationInformation.isLive = false;
        }

        if (!_registered) return;

        if (_qbrEngine) {
            _qbrEngine.setPresentationInformation(_presentationInformation);

            if (_disableManifestFetch && _initializeExtPending) {
                _initializeExtPending = false;

                _qbrEngine.initializeDisableManifestFetch(_epObj, _mode, _manifestURL, _metaURL, _presentationInformation).then(function (status) {
                    //console.log("MMSmartStreaming - Initialization success with status ... " + status);
                    _qbrInitializePromise.resolve(status);
                })['catch'](function (error) {
                    //console.log("MMSmartStreaming - Initialization failed with status ... " + error);
                    _qbrInitializePromise.reject(error);
                });
            }
        } else {
            _epObj.reportMode("QBRDisabled"); // Analytics Only SDK

        }

        var totalDuration = _presentationInformation.isLive ? -1 : _presentationInformation.duration / 1000; // To Seconds

        _epObj.setVideoDuration(totalDuration);

        _epObj.setPresentationType(_presentationInformation.isLive);

        var maxres = "";
        var minres = "";
        var minfps = 0.0;
        var maxfps = 0.0;
        var minResolution = 0;
        var maxResolution = 0;
        var totalProfile = _presentationInformation.representationArray.length;
        var contentType = _presentationInformation.contentType;

        if (totalProfile) {
            for (var i = 0; i < totalProfile; i++) {
                if (_presentationInformation.representationArray[i].width && _presentationInformation.representationArray[i].height && _presentationInformation.representationArray[i].width > 0 && _presentationInformation.representationArray[i].height > 0) {
                    if (minResolution === 0 || minResolution > _presentationInformation.representationArray[i].width * _presentationInformation.representationArray[i].height) {
                        minres = _presentationInformation.representationArray[i].width + 'x' + _presentationInformation.representationArray[i].height;
                        minResolution = _presentationInformation.representationArray[i].width * _presentationInformation.representationArray[i].height;
                    }

                    if (maxResolution === 0 || maxResolution < _presentationInformation.representationArray[i].width * _presentationInformation.representationArray[i].height) {
                        maxres = _presentationInformation.representationArray[i].width + 'x' + _presentationInformation.representationArray[i].height;
                        maxResolution = _presentationInformation.representationArray[i].width * _presentationInformation.representationArray[i].height;
                    }
                }
            }
        }

        _epObj.setPresentationStreamInfo(maxres, minres, maxfps, minfps, totalProfile, contentType);
    };

    var blacklistRepresentation = function blacklistRepresentation(representationIdx, blacklist) {
        mmTraceLogger(" blacklistRepresentation In blacklist:" + representationIdx + "=" + blacklist);

        if (_qbrEngine) {
            _qbrEngine.blacklistRepresentation(representationIdx, blacklist);
        }
    };

    var getQBRBandwidth = function getQBRBandwidth(qbrRepresentationTrackIdx, downloadRate, bufferLength, playbackPos) {
        mmTraceLogger(" getQBRBandwidth In trackIdx:" + qbrRepresentationTrackIdx + " downloadRate:" + downloadRate + " buffLength:" + bufferLength + " playbackPos:" + playbackPos);
        this.reportBufferLength(bufferLength);

        if (_qbrEngine) {
            return _qbrEngine.getQBRBandwidth(qbrRepresentationTrackIdx, downloadRate, bufferLength, playbackPos);
        }

        return downloadRate;
    };

    var getQBRChunk = function getQBRChunk(cbrChunk) {
        mmTraceLogger(" getQBRChunk In");
        var retchunk = cbrChunk;

        if (_qbrEngine) {
            _getQbrChunkUsed = true;

            var _retchunk = _qbrEngine.getQBRChunk(cbrChunk);

            var lastSegInfo = _qbrEngine.getLastUpdateSegmentInfo();

            if (_statistics && lastSegInfo.valid === true && MMSTREAMSMARTERCONSTANTS.SDK_CONFIG.statistics) {
                _statistics.updateStatistics(lastSegInfo, false, _qbrEngine.getDownloadRate(), lastSegInfo.totalSegments);
            }
        }

        return retchunk;
    };

    var reportChunkRequest = function reportChunkRequest(chunkInfo) {
        if (!_registered || _getQbrChunkUsed) return;
        mmTraceLogger("reportChunkRequest In");

        if (_epObj.isQBRDisabled() && MMSTREAMSMARTERCONSTANTS.SDK_CONFIG.qmetric && _qbrEngine) {
            // In case of Qmetric Call GetQbrChunk to update QbrInfo to EP
            var retchunk = _qbrEngine.getQBRChunk(chunkInfo);
        } else {
            var segInfo = getSegmentFromChunk(chunkInfo);

            _epObj.addSegInfo(segInfo);
        }
    };

    var getSegmentFromChunk = function getSegmentFromChunk(cbrChunkInfo) {
        var cbrSize = cbrChunkInfo.endByte > 0 ? cbrChunkInfo.endByte - cbrChunkInfo.startByte : -1;
        var res = undefined;
        var codec = undefined;
        var segDur = cbrChunkInfo.duration > 0 ? parseInt(cbrChunkInfo.duration / 1000) : -1;
        var segSrtTime = cbrChunkInfo.startTime > 0 ? cbrChunkInfo.startTime / 1000 : -1;

        if (cbrChunkInfo.trackIdx == -1) {
            if (cbrChunkInfo.bitrate != -1) {
                res = getResolutionFromPresentationUsingBitrate(cbrChunkInfo.bitrate);
                codec = getCodecFromPresentationUsingBitrate(cbrChunkInfo.bitrate);
            }
        } else {
            res = getResolutionFromPresentation(cbrChunkInfo.trackIdx);
            codec = getCodecFromPresentation(cbrChunkInfo.trackIdx);
        }

        return _epObj.SegmentInfo(res, cbrChunkInfo.bitrate, cbrChunkInfo.bitrate, undefined, undefined, segDur, cbrChunkInfo.sequence, segSrtTime, undefined, cbrChunkInfo.trackIdx, cbrChunkInfo.trackIdx, cbrSize, undefined, codec, undefined);
    };

    var getResolutionFromPresentationUsingBitrate = function getResolutionFromPresentationUsingBitrate(bitrate) {
        var presentation = getPresentationByBitrate(bitrate);
        var resolution = undefined;

        if (presentation !== undefined && presentation.width !== undefined && presentation.height !== undefined && presentation.width > 0 && presentation.height > 0) {
            resolution = presentation.width + 'x' + presentation.height;
        }

        return resolution;
    };

    var getCodecFromPresentationUsingBitrate = function getCodecFromPresentationUsingBitrate(bitrate) {
        var presentation = getPresentationByBitrate(bitrate);
        var codec = undefined;

        if (presentation) {
            codec = presentation.codecIdentifier;
        }

        return codec;
    };

    var getResolutionFromPresentation = function getResolutionFromPresentation(trackIdx) {
        var presentation = getPresentation(trackIdx);
        var resolution = undefined;

        if (presentation !== undefined && presentation.width !== undefined && presentation.height !== undefined && presentation.width > 0 && presentation.height > 0) {
            resolution = presentation.width + 'x' + presentation.height;
        }

        return resolution;
    };

    var getCodecFromPresentation = function getCodecFromPresentation(trackIdx) {
        var presentation = getPresentation(trackIdx);
        var codec = undefined;

        if (presentation) {
            codec = presentation.codecIdentifier;
        }

        return codec;
    };

    var getPresentationByBitrate = function getPresentationByBitrate(bitrate) {
        var presentation = undefined;

        if (_presentationInformation) {
            for (var i = 0; i < _presentationInformation.representationArray.length; i++) {
                if (_presentationInformation.representationArray[i].bitrate === bitrate) {
                    presentation = _presentationInformation.representationArray[i];
                    break;
                }
            }
        }

        return presentation;
    };

    var getPresentation = function getPresentation(trackIdx) {
        var presentation = undefined;

        if (_presentationInformation) {
            for (var i = 0; i < _presentationInformation.representationArray.length; i++) {
                if (_presentationInformation.representationArray[i].trackIdx === trackIdx) {
                    presentation = _presentationInformation.representationArray[i];
                    break;
                }
            }
        }

        return presentation;
    };

    var reportQBRChunkRequest = function reportQBRChunkRequest(qbrSegInfo) {
        if (!_registered) return;
        mmTraceLogger(" reportQBRChunkRequest In");

        _epObj.addSegInfo(qbrSegInfo);
    };

    var reportDownloadRate = function reportDownloadRate(downloadRate) {
        if (!_registered) return;
        mmTraceLogger(" reportDownloadRate In :" + downloadRate);
        if (_qbrEngine) _qbrEngine.setDownloadRate(downloadRate);

        _epObj.setBandwidth(downloadRate);
    };

    var reportBufferLength = function reportBufferLength(bufferLength) {
        if (!_registered) return;
        mmTraceLogger(" reportBufferLength In :" + bufferLength);
        if (_qbrEngine) _qbrEngine.reportBufferLength(bufferLength);

        _epObj.reportBufferLength(bufferLength);
    };

    var reportCustomMetadata = function reportCustomMetadata(key, value) {
        if (!_registered) return;
        mmTraceLogger(" reportCustomMetadata In");

        _epObj.setCustomTag(key, value);
    };

    var reportPlaybackPosition = function reportPlaybackPosition(playbackPos) {
        if (!_registered) return;
        mmTraceLogger(" reportPlaybackPosition In :" + playbackPos);
        if (_qbrEngine) _qbrEngine.setPlaybackPos(playbackPos);

        _epObj.setPlaybackPos(playbackPos);
    };

    var reportNetworkType = function reportNetworkType(networkType) {
        if (!_registered) return;
        mmTraceLogger(" reportNetworkType In");

        _epObj.reportNetworkType(networkType);
    };

    var reportMetricValue = function reportMetricValue(metric, value) {
        if (!_registered) return;
        mmTraceLogger(" reportMetricValue In");

        _epObj.reportMetricValue(metric, value);
    };

    var reportDeviceInfo = function reportDeviceInfo(brand, deviceModel, os, osVersion, operator, deviceMarketingName, screenWidth, screenHeight) {
        mmTraceLogger(" reportDeviceInfo In ");

        _epObj.reportDeviceInfo(brand, deviceModel, os, osVersion, operator, deviceMarketingName, screenWidth, screenHeight);

        if (deviceModel === "CHROMECAST") {
            _epObj.reportDeviceType("ChromeCast");
        } else if (deviceModel === "SMARTTV") {
            _epObj.reportDeviceType("SmartTV");
        }
    };

    var reportPlayerInfo = function reportPlayerInfo(brand, model, version) {
        mmTraceLogger(" reportPlayerInfo In");

        _epObj.reportPlayerInfo(brand, model, version);
    };

    var reportAppInfo = function reportAppInfo(appName, appVersion) {
        mmTraceLogger(" reportAppInfo In");

        _epObj.reportAppInfo(appName, appVersion);
    };

    var reportVideoQuality = function reportVideoQuality(videoQuality) {
        mmTraceLogger(" reportVideoQuality In");

        _epObj.reportVideoQuality(videoQuality);
    };

    var reportBufferingStarted = function reportBufferingStarted() {
        //if(!_registered) return;
        mmTraceLogger(" reportBufferingStarted In ");

        _epObj.reportBufferingStarted();
    };

    var reportBufferingCompleted = function reportBufferingCompleted() {
        //if(!_registered) return;
        mmTraceLogger(" reportBufferingCompleted In ");

        _epObj.reportBufferingCompleted();
    };

    var reportUserInitiatedPlayback = function reportUserInitiatedPlayback() {
        //if(!_registered) return;
        mmTraceLogger(" reportUserInitiatedPlayback In ");

        _epObj.reportUserInitiatedPlayback();
    };

    var reportPlayerState = function reportPlayerState(playerState) {
        //if(!_registered) return;
        mmTraceLogger(" reportPlayerState In " + playerState);

        _epObj.reportPlayerState(playerState);
    };

    var reportTrackinfo = function reportTrackinfo(videoTrack, subtitleTrack, audioTrack, isVDSActive, isSubtitleActive) {
        _epObj.reportTrackinfo(videoTrack, subtitleTrack, audioTrack, isVDSActive, isSubtitleActive);
    };

    var reportABRSwitch = function reportABRSwitch(prevBitrate, newBitrate) {
        if (!_registered || !_epObj.isQBRDisabled()) return;
        mmTraceLogger(" reportABRSwitch " + prevBitrate + "->" + newBitrate);

        _epObj.reportABRSwitch(prevBitrate, newBitrate);
    };

    var reportFrameLoss = function reportFrameLoss(lossCnt) {
        if (!_registered) return;
        mmTraceLogger(" reportFrameLoss In " + lossCnt);

        _epObj.reportFrameLoss(lossCnt);
    };

    var reportPresentationSize = function reportPresentationSize(width, height) {
        mmTraceLogger("reportPresentationSize w:" + width + " h:" + height);

        _epObj.reportPresentationSize(width, height);
    };

    var reportError = function reportError(error, playbackPosMilliSec) {
        if (!_registered) return;
        mmTraceLogger(" reportError In " + error);

        _epObj.reportError(error, playbackPosMilliSec);
    };

    var reportPlayerSeekCompleted = function reportPlayerSeekCompleted(seekEndPos) {
        if (!_registered) return;
        mmTraceLogger(" reportPlayerSeekCompleted In");

        _epObj.reportPlayerSeekCompleted(seekEndPos);
    };

    var reportWifiSSID = function reportWifiSSID(ssid) {
        if (!_registered) return;
        mmTraceLogger(" reportWifiSSID In");

        _epObj.reportWifiSSID(ssid);
    };

    var reportWifiSignalStrenthPercentage = function reportWifiSignalStrenthPercentage(strength) {
        if (!_registered) return;
        mmTraceLogger(" reportWifiSignalStrenthPercentage In");

        _epObj.reportWifiSignalStrenthPercentage(strength);
    };

    var reportWifiDataRate = function reportWifiDataRate(datarate) {
        if (!_registered) return;
        mmTraceLogger(" reportWifiDataRate In");

        _epObj.reportWifiDataRate(datarate);
    }; //Ad related implementation


    var reportAdInfo = function reportAdInfo(adInfo) {
        if (!_registered) return;
        mmTraceLogger(" reportAdInfo ");

        if (adInfo) {
            _epObj.reportAdInfo(adInfo);
        }
    };

    var reportAdState = function reportAdState(adState) {
        if (!_registered) return;
        mmTraceLogger(" reportAdState " + adState);

        _epObj.reportAdState(adState);
    };

    var reportAdPlaybackTime = function reportAdPlaybackTime(pAdvertisementPlaybackTime) {
        if (!_registered) return;
        mmTraceLogger(" reportAdPlaybackTime " + pAdvertisementPlaybackTime);

        _epObj.reportAdPlaybackTime(pAdvertisementPlaybackTime);
    };

    var reportAdError = function reportAdError(error, adPlaybackPosMilliSec) {
        mmTraceLogger(" reportAdError " + error);

        _epObj.reportAdError(error, adPlaybackPosMilliSec);
    };

    var reportAdBufferingStarted = function reportAdBufferingStarted() {
        //if(!_registered) return;
        mmTraceLogger(" reportAdBufferingStarted In ");

        _epObj.reportAdBufferingStarted();
    };

    var reportAdBufferingCompleted = function reportAdBufferingCompleted() {
        //if(!_registered) return;
        mmTraceLogger(" reportAdBufferingCompleted In ");

        _epObj.reportAdBufferingCompleted();
    };

    var reportComponent = function reportComponent(component) {
        if (!_registered) return;
        mmTraceLogger(" reportComponent " + component);

        _epObj.reportComponent(component);
    };

    var enableLogTrace = function enableLogTrace(value) {
        _enableTraceLog = value;
    };

    var getPanelStats = function getPanelStats() {
        var panelStats = _statistics.getPanelStats();

        return panelStats;
    };

    var getProfileProperties = function getProfileProperties() {
        if (!_registered || !_qbrEngine) return null;
        return _qbrEngine.getProfileProperties();
    };

    var setRegistrationStatus = function setRegistrationStatus(registered) {
        _registered = registered;
    };

    var setCfValue = function setCfValue(val) {
        if (!_registered || !_qbrEngine) return;

        _qbrEngine.setCfKonstant(val);
    };

    var getSessionId = function getSessionId() {
        if (!_registered) return;
        return _epObj.sessionId;
    };

    var getPresentationInfoInternal = function getPresentationInfoInternal() {
        if (!_registered || !_qbrEngine) return;
        return _qbrEngine.getPresentationInfoInternal();
    };

    var disableManifestsFetch = function disableManifestsFetch(disable) {
        if (!_registered) return;
        _disableManifestFetch = disable;
    };

    return {
        getSmartRouteUrl: getSmartRouteUrl,
        version: version,
        enableLogTrace: enableLogTrace,
        updateSubscriberID: updateSubscriberID,
        updateSubscriber: updateSubscriber,
        getRegistrationStatus: getRegistrationStatus,
        registerMMSmartStreaming: registerMMSmartStreaming,
        initializeSession: initializeSession,
        setPresentationInformation: setPresentationInformation,
        blacklistRepresentation: blacklistRepresentation,
        getQBRBandwidth: getQBRBandwidth,
        getQBRChunk: getQBRChunk,
        reportChunkRequest: reportChunkRequest,
        reportDownloadRate: reportDownloadRate,
        reportBufferLength: reportBufferLength,
        reportCustomMetadata: reportCustomMetadata,
        reportPlaybackPosition: reportPlaybackPosition,
        reportNetworkType: reportNetworkType,
        reportMetricValue: reportMetricValue,
        reportDeviceInfo: reportDeviceInfo,
        reportPlayerInfo: reportPlayerInfo,
        reportAppInfo: reportAppInfo,
        reportVideoQuality: reportVideoQuality,
        reportPlayerState: reportPlayerState,
        reportTrackinfo: reportTrackinfo,
        reportUserInitiatedPlayback: reportUserInitiatedPlayback,
        reportBufferingStarted: reportBufferingStarted,
        reportBufferingCompleted: reportBufferingCompleted,
        reportABRSwitch: reportABRSwitch,
        reportFrameLoss: reportFrameLoss,
        reportPresentationSize: reportPresentationSize,
        reportError: reportError,
        reportPlayerSeekCompleted: reportPlayerSeekCompleted,
        reportWifiSSID: reportWifiSSID,
        reportWifiSignalStrenthPercentage: reportWifiSignalStrenthPercentage,
        reportWifiDataRate: reportWifiDataRate,
        reportAdInfo: reportAdInfo,
        reportAdError: reportAdError,
        reportAdBufferingStarted: reportAdBufferingStarted,
        reportAdBufferingCompleted: reportAdBufferingCompleted,
        reportAdPlaybackTime: reportAdPlaybackTime,
        reportAdState: reportAdState,
        reportComponent: reportComponent,
        getPanelStats: getPanelStats,
        getProfileProperties: getProfileProperties,
        setRegistrationStatus: setRegistrationStatus,
        setCfValue: setCfValue,
        getSessionId: getSessionId,
        getPresentationInfoInternal: getPresentationInfoInternal,
        disableManifestsFetch: disableManifestsFetch
    };
};; "use strict";

var MMSmartStreaming = function () {
    // Instance stores a reference to the Singleton
    var instance;

    function init() {
        var internalInstance = new MMSmartStreamingImpl();
        return {
            /**
            * Gets the SmartRoute recommended URL
            * @returns {String} The download url recommended by SmartRoute
            *
            */
            getSmartRouteUrl: function getSmartRouteUrl(downloadUrl) {
                return internalInstance.getSmartRouteUrl(downloadUrl);
            },

            /**
             * Gets the version of the SDK
             * @returns {String} Format of version - major.minor.patch
             *
             */
            getVersion: function getVersion() {
                return internalInstance.version();
            },

            /**
             * Tells the status of the registration done via registerMMSmartStreaming API
             * @return {Bool}  true, If player is registered, false otherwise
             *
             */
            getRegistrationStatus: function getRegistrationStatus() {
                return internalInstance.getRegistrationStatus();
            },

            /**
             * Registers the player with instance of MMSmartStreaming.
             * Please note that, no verification of the information is done on registeration. Information provided here is used to intialize the session later,
             * Call to initializeSession may fail if invalid information is provided here.
             * User of SDK must call this API before initializing the session
             *
             * @param {String} name  Name of the player
             * @param {String} customerID  customer ID of Mediamelon customer
             * @param {String} [component]   MediaMelon assigned SDK component ID. Please contact MediaMelon Support to request component string for your player.
             * @param {String} [subscriberID]  Subscriber ID of the end user using of the player
             * @param {String} [domainName]   Some companies may would like to do analytics grouped by its sub organisations.
             * For example, a Media House may have many divisions, and will like to categorise their analysis based on division
             * or, for example, a content owner has distributed content to various resellers. And the will like to know the reseller from whom the user is playing the content
             * In this case every reseller will have separate application, and will configure the domain name.
             * @param {String} [subscriberType] The subscriber type such as "Free", "Basic" or "Premium" as configured by the customer for the end user of the player.
             * @param {String} [subscriberTag] Viewer's tag using which one can track their pattern
             * @return {void}
             *
             */
            registerMMSmartStreaming: function registerMMSmartStreaming(playerName, customerID, component, subscriberID, domainName, subscriberType, subscriberTag) {
                return internalInstance.registerMMSmartStreaming(playerName, customerID, component, subscriberID, domainName, subscriberType, subscriberTag);
            },

            /**
            * @Deprecated since 4.0.0. Please use companion function updateSubscriber instead.
            * After the registration, user may will like to update the subscriber ID, for example -user logged off from the Video service website and logs in again with different user.
            * @param {String} [subscriberID]  Subscriber ID of the end user using of the player
            * @return {void}
            */
            updateSubscriberID: function updateSubscriberID(subscriberID) {
                return internalInstance.updateSubscriberID(subscriberID);
            },

            /**
            * After the registration, user may like to block SDK to fetch manifest.
            * @param {Boolean} [disable] Disable manifest fetch from sdk
            * @return {void}
            */
            disableManifestsFetch: function disableManifestsFetch(disable) {
                internalInstance.disableManifestsFetch(disable);
            },

            /**
             * Reports the physical device characteristics to analytics. All values are optional; use an empty string if the value is unknown or inapplicable.
             * If screen width and height are not provided, then window.innerWidth and window.innerHeigh will be used as defaults
             *
             * @param {String} [deviceBrand]  Brand of the device
             * @param {String} [deviceModel]  Model of the device
             * @param {String} [deviceOS]  Device operating system version
             * @param {String} [deviceOsVersion]  Version of operating system running on device
             * @param {String} [telecomOperator]  Device mobile network operator
             * @param {Number} [screenWidth]  Device screen / display window horizontal resolution (in integer pixels)
             * @param {Number} [screenHeight]  Device screen / display window vertical resolution (in integer pixels)
             * @return {void}
             */
            reportDeviceInfo: function reportDeviceInfo(brand, deviceModel, deviceOS, deviceOsVersion, telecomOperator, deviceMarketingName, screenWidth, screenHeight) {
                internalInstance.reportDeviceInfo(brand, deviceModel, deviceOS, deviceOsVersion, telecomOperator, deviceMarketingName, screenWidth, screenHeight);
            },

            /**
             * Reports the media player characteristics to analytics.
             *
             * @param {String} brand  Brand of the player
             * @param {String} model  Model of the player
             * @param {String} version  Version of the player
             * @return {void}
             */
            reportPlayerInfo: function reportPlayerInfo(brand, model, version) {
                internalInstance.reportPlayerInfo(brand, model, version);
            },

            reportAppInfo: function reportAppInfo(appName, appVersion) {
                internalInstance.reportAppInfo(appName, appVersion);
            },

            reportVideoQuality: function reportVideoQuality(videoQuality) {
                internalInstance.reportVideoQuality(videoQuality);
            },

            /**
             * Initializes the session for the playback with the SDK. This API should be called once for every playback session done by the player
             *
             * @param {MMQBRMode} mode  mode of operation.
             * @param {String} manifestURL  Url of the manifest for which playback is to be optimized
             * @param {String} [metaURL]  This is used only when mode suggests to use QBR Technology. MetaUrl represents the metadata file for the session to be optimized.
             * If mode is not QBRModeDisabled, and metaURL is set to null, then meta file at default location will be looked up. If meta file does not exist at default location as well,
             * then initilisation will fail.
             * @return {Promise} This API is asynchronous, and returns a promise that will resolved/rejected asynchronously with the user friendly description
             * Caller of this API is not expected to wait for the completion of this API asynchronously, and should procced with its tasks, as waiting might impact time to first frame rendition 
             */
            initializeSession: function initializeSession(mode, manifestURL, metaURL, contentMetadata) {
                return internalInstance.initializeSession(mode, manifestURL, metaURL, contentMetadata);
            },

            /**
             * Sets the presentation information of the session to be QBRified.
             *
             * It may happen that due to various constraints of devices (capability to playback the various decoders, device resolutions etc), not all the representations are playable.
             * Therefore, player may opt to filter out few representation from set of representations.
             * Representations mentioned in the presentationinfo are the representations that player has selected for the playback session based on its capability and filtering rules.
             *
             * @param {MMPresentationInfo} presentationInfo  PresentationInformation specifying the representations selected by the user for playback
             * @return {void}
             *
             * User must provide information on the representations in the presentation if Qubitisation of the content is needed, else user can just set the duration attribute of MMCPresentationInfo
             */
            setPresentationInformation: function setPresentationInformation(presentationInfo) {
                internalInstance.setPresentationInformation(presentationInfo);
            },

            /**
            * This API is used only if Qubitisation of content is to be achieved.
             * During playback session, it may happen that the representation among the array of representations provided in the setPresentationInformation is invalidated (for various reason, say chunks from representation not reachable, decoder not suporting playback of representation etc.)
             * This API allows player to invalidate a representation with the SDK
             *
             * @param {Number} representationIdx  Representation index to be blacklisted
             * @param {Bool} blacklistRepresentation Boolean to indicate if we want to blacklist the representation, or revert the previous blacklisting of a representation.
             *
             * @return {void}
             */
            blacklistRepresentation: function blacklistRepresentation(representationIdx, _blacklistRepresentation) {
                internalInstance.blacklistRepresentation(representationIdx, _blacklistRepresentation);
            },

            /**
                * Mediamelon's SDK aims to provide best optimised experience of video, that provides not just bandwidth savings but also improvements in the quality where it really matters
                * Due to the way SDK governs the playback session, the profile chosen by regular ABR algorithm for playback serves as the reference to decide the target quality that SDK will aim at
                * During actual playback, SDK will provide segments from different representations whose quality would be similar to target quality.
                * This leads to difference in the bandwidth requirements needed to playback a session whose quality is equitable to the chosen reprepsention by regular ABR algo
                * Following method gives the bandwidth needed to playback a representation so that quality remains similar across the session
                * In player, at the point where ABR rules are evaluated, one of the common rules evaluated is to compare the download rate with the bitrate of the representations (sorted highest to lowest bitrate)
                * And choose the best representation for playback. But because SDK tweaks the playback session. The bitrate of representation cannot be used as-is in evaluation of algorithm
                * This API is used to get correct value of bandwidth needed to playback a constant quality track corresponding to input track identified by representationIdx
                * Retval of the following method should be chosen for the bitrate of the representation in the ABR rule.
                * This API is used only if Qubitisation of content is to be achieved.
                *
                * @param {Number} representationTrackIdx Track Index of the representation whose corresponding quality bitrate is to be evaluated.
                * @param {Number} defaultBitrate bitrate of CBR representation as advertised in the manifest in bps
                * @param {Number} bufferLength Amount of media (in millisec) buffered in player ahead of current playback position in millisec
                * @param {Number} playbackPos Current playback position in millisec
                * @return {Number} bandwidth in bps that is needed to playback a representation indentiifed by representationTrackIdx
                 */
            getQBRBandwidth: function getQBRBandwidth(representationTrackIdx, defaultBitrate, bufferLength, playbackPos) {
                return internalInstance.getQBRBandwidth(representationTrackIdx, defaultBitrate, bufferLength, playbackPos);
            },

            /**
             * During the playback session, player is expected to query the constant quality chunk that it should request from server instead of the chunk selected purely based on regular ABR algorithm
             * @param {MMChunkInformation} cbrChunk Chunk information identifying the chunk selected by ABR algorithm.
             * For referencing the chunk there are two option :
             * (a) Caller of API may specify resourceURL
             * (b) Caller of API may specify combination of sequence id and track id. 
             * Option b) results is improving the performace of this API and is therefore the recommended way of referencing a chunk
             * @return {MMChunkInformation} qbrChunk Chunk information identifying the chunk selected by Mediamelon's algorithm
             *
             * This API is used only if Qubitisation of content is to be achieved.
             */
            getQBRChunk: function getQBRChunk(cbrChunk) {
                return internalInstance.getQBRChunk(cbrChunk);
            },

            /**
             * When QBR is not supported for a content or customer, then integrated player may provide information of the chunks being playbacked for rich experience analysis via smartsight
             * Note - Call to this API is not needed if application is making call to getQBRChunk for every segment it requests from the server.
             * @param {MMChunkInformation} chunkInfo Chunk being playbacked by the player
             * @return {void}
             *
             */
            reportChunkRequest: function reportChunkRequest(chunkInfo) {
                internalInstance.reportChunkRequest(chunkInfo);
            },

            /**
             * Player is expected to report download rate in bits per second periodically (say every 2 seconds).
             *
             * @param {Number} downloadRate DownloadRate experienced by the player in bps
             * @return {void}
             */
            reportDownloadRate: function reportDownloadRate(downloadRate) {
                internalInstance.reportDownloadRate(downloadRate);
            },

            /**
                * Player is expected to report buffer length in milli second periodically (say every 2 seconds or at every segment).
                *
                * @param {Number} bufferLength bufferLength in milliseconds
                * @return {void}
                */
            reportBufferLength: function reportBufferLength(bufferLength) {
                internalInstance.reportBufferLength(bufferLength);
            },

            /**
             * Player may provide custom metadata that can be analysed later in smartsight to aggregate.
             * This metric is used as opaque data by smartsight, and user of analytics is expected to make sense out of it.
             *
             * @param {String} key Key for the custom metadata
             * @param {String} attributeValue Value corresponding to the key
             * @return {void}
             */
            reportCustomMetadata: function reportCustomMetadata(key, attributeValue) {
                internalInstance.reportCustomMetadata(key, attributeValue);
            },

            /**
             * Reports current playback position in media to analytics. This should be reported every two seconds if possible.
             *
             * @param {Number} playbackPosition Current playback position in millisec
             * @return {void}
             */
            reportPlaybackPosition: function reportPlaybackPosition(playbackPos) {
                internalInstance.reportPlaybackPosition(playbackPos);
            },

            /**
             * Reports the communications network type to analytics.
             *
             * @param {MMConnectionInfo} networkType Connection Info
             * @return {void}
             */
            reportNetworkType: function reportNetworkType(networkType) {
                internalInstance.reportNetworkType(networkType);
            },

            /**
             * Player may would like to override the value of certain computed metrics by SmartSight, this API gives the facility to override those well known metics
             * For example few players might provide the precise value if latency aka startup delay.
             *
             * @param {MMOverridableMetric} metric Metric to be overriden.
             * @param {String} value value of the metric. Even if the value of metric is int (for example in case of latency), user is expected to provide its string representation
             * @return {void}
             *
             */
            reportMetricValue: function reportMetricValue(metric, value) {
                internalInstance.reportMetricValue(metric, value);
            },

            /**
             * Reports the current player buffering started event.
             *
             * @param {void}
             * @return {void}
             */
            reportBufferingStarted: function reportBufferingStarted() {
                internalInstance.reportBufferingStarted();
            },

            /**
                * Reports the current player buffering state to analytics.
                *
                * @param {void}
                * @return {void}
                */
            reportBufferingCompleted: function reportBufferingCompleted() {
                internalInstance.reportBufferingCompleted();
            },

            /**
            * Reports user initiated the playback session.
            * This should be called at different instants depending on the mode of operation of player.
            * In Auto Play Mode: This should be the called when payer is fed with the manifest url for playback
            * In non auto play mode : This should be called when the user presses the play button on the
            * player
            *
            * @param {void}
            * @return {void}
            */
            reportUserInitiatedPlayback: function reportUserInitiatedPlayback() {
                internalInstance.reportUserInitiatedPlayback();
            },

            /**
             * Reports the current player state to analytics.
             *
             * @param {MMPlayerState} playerState Player State
             * @return {void}
             */
            reportPlayerState: function reportPlayerState(playerState) {
                internalInstance.reportPlayerState(playerState);
            },

            /**
             * Reports the ABR switch to analytics.
             * This API should be called when neither getQBRChunk nor reportChunkRequest is called by the player.  
             *
             * @param {Number} prevBitrate Ongoing bitrate in bps
             * @param {Number} newBitrate New ABR bitrate selected by the ABR Algo
             */
            reportABRSwitch: function reportABRSwitch(prevBitrate, newBitrate) {
                internalInstance.reportABRSwitch(prevBitrate, newBitrate);
            },

            /**
             * Reports the information on frameloss.
             *
             * @param {Number} lossCnt Cumulative count of the frames lost in playback session
             * @return {void}
             */
            reportFrameLoss: function reportFrameLoss(lossCnt) {
                internalInstance.reportFrameLoss(lossCnt);
            },

            /**
             * Reports the presentationSize.
             *
             * @param {Number} width Width of the presentation
             * @param {Number} height Height of the presentation
             * @return {void}
             */
            reportPresentationSize: function reportPresentationSize(width, height) {
                internalInstance.reportPresentationSize(width, height);
            },

            /**
             * Reports the error encountered during playback.
             *
             * @param {String} error Error encountered during playback session
             * @param {Number} pos Playback position in millisec when error occurred
             * @return {void}
             */
            reportError: function reportError(error, playbackPosMilliSec) {
                internalInstance.reportError(error, playbackPosMilliSec);
            },

            /**
             * This will notify that user has triggered the seek event on player. This may result in player moving to BUFFERING immediately, if seek happened in region for which media is not available within the player buffer
             *
             * @param {Number} seekEndPos playback position(in millisec) when seek completed. This is point from where playback will start after seek
             * @return {void}
             */
            reportPlayerSeekCompleted: function reportPlayerSeekCompleted(seekEndPos) {
                internalInstance.reportPlayerSeekCompleted(seekEndPos);
            },

            /**
             * This report the WIFI Access Point's SSID
             *
             * @param {String} ssid SSID name
             * @return {void}
             */
            reportWifiSSID: function reportWifiSSID(ssid) {
                internalInstance.reportWifiSSID(ssid);
            },

            /**
             * This report the WifiSignal strength to the SDK. This may be useful, if someone is analyzing a back playback session using smartsight's microscope feature, and wants to know if Wifi signal strength is the cause fo poor performance of that session
             * This API is relevant if Wifi is used for the playback sesssion
             *
             * @param {Double} strength Strength of Wifi signal in %
             * @return {void}
             */
            reportWifiSignalStrengthPercentage: function reportWifiSignalStrengthPercentage(strength) {
                internalInstance.reportWifiSignalStrenthPercentage(strength);
            },

            /**
             * This report the Wifi data rate
             *
             * @param {Number} datarate Wifi's data rate in kbps
             * @return {void}
             */
            reportWifiDataRate: function reportWifiDataRate(datarate) {
                internalInstance.reportWifiDataRate(datarate);
            },

            /**
             * This will report ad-related information from the player to sdk.
             *
             * @param {MMAdState} adState State of the advertisement
             * @return {void}
             */
            reportAdState: function reportAdState(adState) {
                internalInstance.reportAdState(adState);
            },

            /**
                * This will report ad-related information from the player to sdk.
                *
                * @param {String} adClient - the client used to play the ad, eg: VAST
                * @param {String} adId - the tag represented by the ad
                * @param {Number} adDuration - the length of the video ad
                * @param {Number} adPosition - the position of the ad in the video  playback, one of "pre", "post" or "mid" that represents that the ad played before, after or during playback respectively
                * @param {Bool} adLinear - indicates that the ad played was a linear or non-linear ad
                * @param {String} adCreativeType - MIME type of the ad
                * @param {String} adServer - the ad server For example - DoubleClick, YuMe, AdTech, Brightroll etc.
                * @param {String} adResolution - resolution of the advertisement
                * @return {void}
                */
            reportAdInfo1: function reportAdInfo1(adClient, adId, adDuration, adPosition, adLinear, adCreatureType, adServer, adResolution) {
                internalInstance.reportAdInfo(adClient, adId, adDuration, adPosition, adLinear, adCreatureType, adServer, adResolution);
            },

            /**
            * This will report ad-related information from the player to sdk.
            *
            * @param {MMAdInfo} adInfo
            * @return {void}
            */
            reportAdInfo: function reportAdInfo(adInfo) {
                internalInstance.reportAdInfo(adInfo);
            },

            /**
             * This will report ad-related information from the player to sdk.
             *
             * @param {Number} pAdvertisementPlaybackTime - current playback position in the Ad
             * @return {void}
             */
            reportAdPlaybackTime: function reportAdPlaybackTime(pAdvertisementPlaybackTime) {
                internalInstance.reportAdPlaybackTime(pAdvertisementPlaybackTime);
            },

            /**
             * Reports the error encountered during advertisement playback.
                      *
                      * @param {String} error Error encountered during playback session
                      * @param {Number} pos Playback position of advertisement when error occurred
                      * @return {void}
                      */
            reportAdError: function reportAdError(error, playbackPosMilliSec) {
                internalInstance.reportAdError(error, playbackPosMilliSec);
            },

            /**
                * Reports the current Ad buffering started event.
                *
                * @param {void}
                * @return {void}
                */
            reportAdBufferingStarted: function reportAdBufferingStarted() {
                internalInstance.reportAdBufferingStarted();
            },

            /**
                * Reports the current Ad buffering state to analytics.
                *
                * @param {void}
                * @return {void}
                */
            reportAdBufferingCompleted: function reportAdBufferingCompleted() {
                internalInstance.reportAdBufferingCompleted();
            },

            /**
             * Enable the Trace logs for all the Interface APIs. This is to debug and test player to sdk integration.  
                      * Should not be used for release builds.
                      *
                      * @param {bool} isEnable - true to enable and false to disable. (isEnable=false by default)
                      * @return {void}
                      */
            enableLogTrace: function enableLogTrace(isEnable) {
                internalInstance.enableLogTrace(isEnable);
            },

            /**
            * After the registration, user may like to update the subscriber information, for example -user logged off from the Video service website and logs in again with different user.
                     * @param {String} [subscriberID]  Subscriber ID of the end user using of the player
                     * @param {String} [subscriberType] Subscriber type of the end user using of the player
                     * @param {String} [subscriberTag] Viewer's tag using which one can track their pattern
                     * @return {void}
            */
            updateSubscriber: function updateSubscriber(subscriberID, subscriberType, subscriberTag) {
                return internalInstance.updateSubscriber(subscriberID, subscriberType, subscriberTag);
            },
            // Function mentioned below are just to make the demo interactive, and should not be used
            getPanelStats: function getPanelStats() {
                return internalInstance.getPanelStats();
            },
            getProfileProperties: function getProfileProperties() {
                return internalInstance.getProfileProperties();
            },
            setCfValue: function setCfValue(val) {
                internalInstance.setCfValue(val);
            },
            setRegistrationStatus: function setRegistrationStatus(registered) {
                internalInstance.setRegistrationStatus(registered);
            },
            getSessionId: function getSessionId() {
                return internalInstance.getSessionId();
            },
            getPresentationInfoInternal: function getPresentationInfoInternal() {
                return internalInstance.getPresentationInfoInternal();
            },
            reportTrackinfo: function reportTrackinfo(videoTrack, subtitleTrack, audioTrack, isVDSActive, isSubtitleActive) {
                return internalInstance.reportTrackinfo(videoTrack, subtitleTrack, audioTrack, isVDSActive, isSubtitleActive);
            }
        };
    }

    return {
        /**
        * Creates new MMSmartstreaming SDK instance for the input context.
            * This should be called for every player instance.
            *
            * @param {Object} context - To bind player instace with SDK
            * @return {Object} new MMSmartstreaming SDK instace
            */
        createInstance: function createInstance(context) {
            var newInstance = Object.create(init());
            newInstance.__dashjs_factory_name = 'MMSmartStreamingSdk';
            QBRFactoryMaker.setSingletonInstance(context, 'MMSmartStreamingSdk', newInstance);
            return newInstance;
        },

        /**
         * Gets the MMSmartstreaming SDK instance for the input context.
         * Always check for return value as API returns null if input context not match with context used in createInstance.
               *
               * @param {Object} context - which was used to bind the player instace with new SDK instance while creation.
               * @return {Object}  if valid context return valid MMSmartstreaming SDK instace else return null 
               */
        getInstance: function getInstance(context) {
            if (context === undefined) {
                if (instance) return instance;
                instance = this.createInstance(this);
                return instance;
            }

            var facInstance = QBRFactoryMaker.getSingletonInstance(context, 'MMSmartStreamingSdk');

            if (!facInstance) {
                console.log("ERROR MMSDK Instance not created!");
            }

            return facInstance;
        }
    };
}();
;
var mmStreamType = Object.freeze({
    DASH: 'dash',
    HLS: 'hls',
    MSS: 'mss',
    MP4: 'mp4'
});

var CastRecvAdapter = function () {

    let PLAYERCTL = Object.freeze({
        READY: 0,
        PLAYING: 1,
        PAUSED: 2,
        STOPPED: 3
    });

    let BUFFERCTL = Object.freeze({
        READY: 1,
        WAITING: 2
    });

    var _prevBitrate;
    var _prevState;
    var _bufferState;
    var _mmSmartStreaming;
    var castPlayer;
    var _autoplay;
    var _contentType;
    var _firstPlay;
    var _isSeeking;
    var _internalPresentationInfo;

    function generateInstanceId() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    var getAssetInfo = function (_mmVideoAssetInfo) {

        var customMeta = [];
        // var assetInfo = { assetId: null, assetName: null, videoId: null, contentType: null, metaUrl: null, serverAddress: undefined };
        var contentMetadata = { assetId: null, assetName: null, contentType: null, drmProtection: null, episodeNumber: null, genre: null, season: null, seriesTitle: null, videoId: null, videoType: null, title: null };
        if (_mmVideoAssetInfo != undefined) {
            if (_mmVideoAssetInfo.assetId)
                contentMetadata.assetId = _mmVideoAssetInfo.assetId;
            if (_mmVideoAssetInfo.assetName)
                contentMetadata.assetName = _mmVideoAssetInfo.assetName;
            if (_mmVideoAssetInfo.videoId)
                contentMetadata.videoId = _mmVideoAssetInfo.videoId;
            if (_mmVideoAssetInfo.contentType)
                contentMetadata.contentType = _mmVideoAssetInfo.contentType;
            if (_mmVideoAssetInfo.drmProtection)
                contentMetadata.drmProtection = _mmVideoAssetInfo.drmProtection;
            if (_mmVideoAssetInfo.episodeNumber)
                contentMetadata.episodeNumber = _mmVideoAssetInfo.episodeNumber;
            if (_mmVideoAssetInfo.genre)
                contentMetadata.genre = _mmVideoAssetInfo.genre;
            if (_mmVideoAssetInfo.season)
                contentMetadata.season = _mmVideoAssetInfo.season;
            if (_mmVideoAssetInfo.seriesTitle)
                contentMetadata.seriesTitle = _mmVideoAssetInfo.seriesTitle;
            if (_mmVideoAssetInfo.title)
                contentMetadata.title = _mmVideoAssetInfo.title;
            if (_mmVideoAssetInfo.videoType)
                contentMetadata.videoType = _mmVideoAssetInfo.videoType;

            if (_mmVideoAssetInfo.customTags) {
                for (let aInfo in _mmVideoAssetInfo.customTags) {
                    customMeta.push({
                        key: aInfo,
                        attributeValue: _mmVideoAssetInfo.customTags[aInfo]
                    });
                }
            }
        }


        return {
            customMeta: customMeta,
            contentMetadata: contentMetadata

        };
    }

    var initializeMMSDK = function (event) {

        let mmAssetInfo = getAssetInfo(event.requestData.media.mmVideoAssetInfo);
        let contentMetadata = mmAssetInfo.contentMetadata;

        var sourceUrl = null;
        // var assetID = null;
        // var assetName = null;

        try {
            if (event.requestData.media !== undefined) {
                if (event.requestData.media.contentId !== undefined) {
                    sourceUrl = event.requestData.media.contentId;
                }

                if (event.requestData.media.contentType !== undefined) {
                    _contentType = event.requestData.media.contentType;
                }

                //   if (event.requestData.media.metadata !== undefined) {
                //     if (event.requestData.media.metadata.title !== undefined) {
                //       assetName = event.requestData.media.metadata.title;
                //     }
                //   }
                // }
                // if (assetName) {
                //   assetID = assetName;
                // }

                if (sourceUrl) {
                    _prevState = undefined;
                    _bufferState = undefined;
                    _mmSmartStreaming.initializeSession(MMQBRMode.QBRModeDisabled,
                        sourceUrl,
                        undefined,
                        contentMetadata).catch(function (error) {
                            console.log("MMSmartStreaming - Initialization failed with status ... " + error);
                        });


                    // Set Custom Metadata 
                    if (mmAssetInfo.customMeta && mmAssetInfo.customMeta.length) {
                        for (var i = 0; i < mmAssetInfo.customMeta.length; i++) {
                            _mmSmartStreaming.reportCustomMetadata(mmAssetInfo.customMeta[i].key, mmAssetInfo.customMeta[i].attributeValue);
                        }
                    }
                }
            }
        }
        catch (err) {
            console.log("MMError:" + err.message);
        }
    }

    let getContentType = function (mimeType) {
        let contentType;
        if (mimeType === "application/dash+xml") {
            contentType = 'DASH';
        } else if (mimeType === "application/vnd.ms-sstr+xml") {
            contentType = 'MSS';
        } else if ((mimeType === "application/vnd.apple.mpegurl") || (mimeType == "application/x-mpegurl")) {
            contentType = 'HLS';
        } else if (mimeType === "video/mp4") {
            contentType = 'MP4';
        } else {
            contentType = 'MP4';
        }
        return contentType;
    }

    let updatePresentationInfo = function (event) {
        var _presentationInfo = new Object;
        var durationInSec = castPlayer.getDurationSec();
        _presentationInfo.duration = durationInSec ? parseInt(durationInSec * 1000) : parseInt(-1);
        _presentationInfo.isLive = (_presentationInfo.duration > -1) ? false : true;

        if (event.media.contentType !== undefined) {
            _contentType = event.media.contentType;
        }
        _presentationInfo.contentType = getContentType(_contentType);
        _presentationInfo.representationArray = [];
        // NOTE: Representations/vTracks info is not available        
        _mmSmartStreaming.setPresentationInformation(_presentationInfo);
    }

    var unregisteEvents = function () {

    }

    var registerEvents = function (castPlayer) {

        if (castPlayer) {

            castPlayer.addEventListener(cast.framework.events.category.CORE, castEventHandler);
            castPlayer.addEventListener(cast.framework.events.category.REQUEST, castEventHandler);
            castPlayer.addEventListener(cast.framework.events.category.FINE, castEventHandler);
            castPlayer.addEventListener(cast.framework.events.category.DEBUG, castEventHandler);
            castPlayer.addEventListener(cast.framework.events.EventType.MEDIA_STATUS, castEventHandler);
        }

        function getMMChunkBitrate(inBitrate) {
            if (!_internalPresentationInfo || !_internalPresentationInfo.ready) {
                if (typeof _mmSmartStreaming.getPresentationInfoInternal !== 'undefined' &&
                    typeof _mmSmartStreaming.getPresentationInfoInternal === 'function')
                    _internalPresentationInfo = _mmSmartStreaming.getPresentationInfoInternal();
            }
            if (_internalPresentationInfo &&
                _internalPresentationInfo.ready &&
                _internalPresentationInfo.vRepresentation_array &&
                _internalPresentationInfo.vRepresentation_array.length &&
                _internalPresentationInfo.aRepresentation_array &&
                _internalPresentationInfo.aRepresentation_array.length
            ) {
                for (let i = 0; i < _internalPresentationInfo.vRepresentation_array.length; i++) {
                    for (let j = 0; j < _internalPresentationInfo.aRepresentation_array.length; j++) {
                        var mmBitrate = parseInt(_internalPresentationInfo.vRepresentation_array[i].bitrate) + parseInt(_internalPresentationInfo.aRepresentation_array[j].bitrate);
                        if (mmBitrate === inBitrate) {
                            let bitrate = parseInt(_internalPresentationInfo.vRepresentation_array[i].bitrate);
                            let vcodec = _internalPresentationInfo.vRepresentation_array[i].videoCodec;
                            let acodec = _internalPresentationInfo.aRepresentation_array[j].audioCodec;
                            let trackId = i;
                            return {
                                bitrate: bitrate,
                                vcodec: vcodec,
                                acodec: acodec,
                                trackId: trackId
                            };
                        }
                    }
                }
            }
            return {
                bitrate: inBitrate,
                vcodec: undefined,
                acodec: undefined,
                trackId: -1
            };
        }

        function castEventHandler(event) {
            //console.log(event);
            let currentPlayPosInMS = parseInt(castPlayer.getCurrentTimeSec() * 1000);
            //console.log("cast: " + event.type + ", currentTime: " + currentPlayPosInMS);
            switch (event.type) {
                case cast.framework.events.EventType.REQUEST_LOAD:
                    initializeMMSDK(event);

                    if (event.requestData.autoplay !== undefined) {
                        _autoplay = event.requestData.autoplay;
                    }

                    if (_firstPlay) {
                        _firstPlay = false;
                    }
                    break;
                case cast.framework.events.EventType.DURATION_CHANGE:
                    var evt = event;
                    break;
                case cast.framework.events.EventType.PLAYER_LOAD_COMPLETE:
                    updatePresentationInfo(event);
                    break;
                case cast.framework.events.EventType.MEDIA_FINISHED:
                case cast.framework.events.EventType.LIVE_ENDED:
                case cast.framework.events.EventType.REQUEST_STOP:
                    if (_prevState !== undefined && _prevState !== PLAYERCTL.STOPPED) {
                        _mmSmartStreaming.reportPlayerState(MMPlayerState.STOPPED);
                        _prevState = PLAYERCTL.STOPPED;
                    }
                    break;
                case cast.framework.events.MediaInformationChangedEvent:
                    var minfo = event;
                    break;
                case cast.framework.events.EventType.MEDIA_STATUS:
                    if (event.mediaStatus.videoInfo !== undefined) {
                        // Note: it appears the videoInfo field is always undefined
                        let videoSourceWidth = event.mediaStatus.videoInfo.width;
                        let videoSourceHeight = event.mediaStatus.videoInfo.height;
                        _mmSmartStreaming.reportPresentationSize(videoSourceWidth, videoSourceHeight);
                    }
                    if (event.mediaStatus.media !== undefined &&
                        event.mediaStatus.media.duration !== undefined) {
                        let duration = event.mediaStatus.media.duration;
                        //updatePresentationInfo(event);
                    }
                    break;
                case cast.framework.events.EventType.SEEKING:
                    _isSeeking = true;
                    break;
                case cast.framework.events.EventType.SEEKED:
                    _mmSmartStreaming.reportPlayerSeekCompleted(currentPlayPosInMS);
                    break;
                case cast.framework.events.EventType.PAUSE:
                    if (!_isSeeking) {
                        // Note:
                        // When a seek happens, cast sdk sends the `cast.framework.events.EventType.PAUSE`.
                        // We need to suppress the player.mux.emit('pause') call, because if it goes out, in our data view, seek
                        // events will become pause event
                        if (_prevState !== undefined && _prevState === PLAYERCTL.PLAYING && _bufferState !== BUFFERCTL.WAITING) {
                            _mmSmartStreaming.reportPlayerState(MMPlayerState.PAUSED);
                            _prevState = PLAYERCTL.PAUSED;
                        }
                    }
                    break;
                case cast.framework.events.EventType.PLAY:
                    if (_prevState === undefined) {
                        _mmSmartStreaming.reportUserInitiatedPlayback();
                        _prevState = PLAYERCTL.READY;
                    }
                    break;
                case cast.framework.events.EventType.PLAYING:
                    if (_prevState !== undefined && _prevState !== PLAYERCTL.PLAYING) {
                        _mmSmartStreaming.reportPlayerState(MMPlayerState.PLAYING);
                        _prevState = PLAYERCTL.PLAYING;
                    }
                    if (_bufferState === BUFFERCTL.WAITING) {
                        _mmSmartStreaming.reportBufferingCompleted();
                        _bufferState = BUFFERCTL.READY;
                    }
                    if (_isSeeking) {
                        _isSeeking = false;
                    }
                    break;
                case cast.framework.events.EventType.ERROR:
                    let error = event.error;
                    let code = event.detailedErrorCode;
                    if (error) {
                        if (error.type) error = error.type;
                    } else {
                        error = "Unknown Error";
                    }
                    let ErrorStr = code + " " + error;
                    _mmSmartStreaming.reportError(ErrorStr, currentPlayPosInMS);
                    if (error === "LOAD_CANCELLED") {
                        if (_prevState !== undefined && _prevState !== PLAYERCTL.STOPPED) {
                            _mmSmartStreaming.reportPlayerState(MMPlayerState.STOPPED);
                            _prevState = PLAYERCTL.STOPPED;
                        }
                    }
                    break;
                case cast.framework.events.EventType.TIME_UPDATE:
                    _mmSmartStreaming.reportPlaybackPosition(currentPlayPosInMS);
                    break;
                case cast.framework.events.EventType.BUFFERING:
                    if (_prevState === 'undefined' || _bufferState === BUFFERCTL.WAITING || _prevState === PLAYERCTL.STOPPED) {
                        break;
                    }
                    _mmSmartStreaming.reportBufferingStarted();
                    _bufferState = BUFFERCTL.WAITING;
                    break;

                case cast.framework.events.EventType.BITRATE_CHANGED:
                    _prevBitrate = event.totalBitrate;

                    break;
                case cast.framework.events.EventType.SEGMENT_DOWNLOADED:

                    let downloadBitrate = event.size / (event.downloadTime / 1000);
                    _mmSmartStreaming.reportDownloadRate(downloadBitrate);
                    var castStats = castPlayer.getStats();
                    var currentPlaybackBitrate = castStats.streamBandwidth;

                    if (currentPlaybackBitrate) {
                        var mmRepInfo = getMMChunkBitrate(currentPlaybackBitrate);
                        var chunkInfo = MMChunkInformation(-1, mmRepInfo.bitrate, undefined,
                            undefined, undefined, undefined, undefined, undefined);
                        _mmSmartStreaming.reportChunkRequest(chunkInfo);
                    }
                    break;
            }

        }

    }

    let initialize = function (castplayerManager) {
        if (castplayerManager) {
            castPlayer = castplayerManager;
        }
        else {
            return;
        }

        getMmSmartStreamingSDK();

        var sdkVer = _mmSmartStreaming.getVersion();
        registerEvents(castPlayer);
    }

    let getMmSmartStreamingSDK = function () {
        if (!_mmSmartStreaming) {
            _mmSmartStreaming = MMSmartStreaming.getInstance()
        }
        return _mmSmartStreaming;
    }
    let getRegistrationStatus = function () {
        return getMmSmartStreamingSDK().getRegistrationStatus();
    }
    let registerMMSmartStreaming = function (playerName, customerID, subscriberID, domainName, subscriberType) {
        return getMmSmartStreamingSDK().registerMMSmartStreaming(playerName, customerID, "CHROMECASTSDK", subscriberID, domainName, subscriberType);
    }
    let reportPlayerInfo = function (brand, model, version) {
        return getMmSmartStreamingSDK().reportPlayerInfo(brand, model, version);
    }

    return {
        initialize: initialize,
        reportPlayerInfo: reportPlayerInfo,
        registerMMSmartStreaming: registerMMSmartStreaming,
        getRegistrationStatus: getRegistrationStatus
    };
};

