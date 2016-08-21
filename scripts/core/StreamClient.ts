/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="./StreamerConfig.ts" />

var NodeTweetStream : any = require('node-tweet-stream');

/**
 * Stream Client.
 *
 * @class StreamClient
 */
class StreamClient {

	/**
	 * StreamClient's oAuthkey.
	 *
	 * @property _oAuthkey
	 * @type any
	 * @private
	 */
	private _oAuthkey : any;

	/**
	 * StreamClient.
	 *
	 * @property _streamClient
	 * @type any
	 * @private
	 */
	private _streamClient : any;

	/**
	 * StreamClient's initialization boolean.
	 *
	 * @property _initOK
	 * @type boolean
	 * @private
	 */
	private _initOK : boolean;

	/**
	 * StreamClient's searches.
	 *
	 * @property _searches
	 * @type any
	 * @private
	 */
	private _searches : any;


	/**
	 * Constructor.
	 *
	 * @param {string} oAuthkey - OAuthKey string.
	 */
	constructor(oAuthkey : string) {
		this._streamClient = null;
		this._initOK = false;
		this._searches = {};

		this.setOAuthKey(oAuthkey);
		this.init();
	}

	/**
	 * Set OAuthkey variable.
	 *
	 * @method setOAuthKey
	 * @param {any} oAuthKey - New OAuthKey string.
	 */
	setOAuthKey(oAuthkey : any) {
		this._oAuthkey = oAuthkey;
	}

	/**
	 * Method to init Stream Client.
	 *
	 * @method init
	 */
	init() {
		var self = this;

		//TODO : Init MQ structure

		self._initOK = true;

		if(typeof(this._oAuthkey) == "string") {
			this._oAuthkey = JSON.parse(this._oAuthkey);
		}

		var token = this._oAuthkey;
		var tokenKey = token.oauth_token;
		var tokenSecret = token.oauth_token_secret;

		var nodeTweetStreamConfig = {
			consumer_key: StreamerConfig.getConsumerKey(),
			consumer_secret: StreamerConfig.getConsumerSecret(),
			token: tokenKey,
			token_secret: tokenSecret
		};

		Logger.debug(nodeTweetStreamConfig);

		this._streamClient = new NodeTweetStream(nodeTweetStreamConfig);

		this._streamClient.on('tweet', function (tweet) {
			console.log(tweet);
			//TODO
		});

		this._streamClient.on('error', function (err) {
			self._initOK = false;
			Logger.error("StreamClient : Error to init client.", {error : err});
		});
	}

	/**
	 * Method to start search.
	 *
	 * @method startSearch
	 * @param {any} search - JSON representation for Search ({id : string, oauth : string, keywords : Array}).
	 */
	startSearch(search : any) {
		if(this._streamClient != null && this._initOK) {
			if(typeof(this._searches[search.id]) == "undefined") {
				this._searches[search.id] = search;
				this._streamClient.trackMultiple(search.keywords);
			} else {
				Logger.error("Search with id '" + search.id + "' is already started.");
			}
		} else {
			Logger.error("Stream client is not ready to start search.");
		}
	}

	/**
	 * Method to stop search.
	 *
	 * @method stopSearch
	 */
	stopSearch() {
		//TODO
	}
}