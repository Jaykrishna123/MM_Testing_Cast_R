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

export {
  CastRecvAdapter
}
