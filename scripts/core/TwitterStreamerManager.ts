/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="./StreamClient.ts" />

/**
 * Twitter Streamer Manager.
 *
 * @class TwitterStreamerManager
 */
class TwitterStreamerManager {

	/**
	 * Stream Clients.
	 *
	 * @property streamClients
	 * @type Array<StreamClient>
	 * @static
	 */
	static streamClients : Array<StreamClient> = new Array<StreamClient>();

	/**
	 * Retrieve connection information from file description.
	 *
	 * @method retrieveConnectionInformation
	 * @param {string} oauthkey - oAuthkey string.
	 * @static
	 */
	static findOrCreateStreamClient(oauthkey : string) {
		if(typeof(TwitterStreamerManager.streamClients[oauthkey]) == "undefined") {
			TwitterStreamerManager.streamClients[oauthkey] = new StreamClient(oauthkey);
		}

		return TwitterStreamerManager.streamClients[oauthkey];
	}

	/**
	 * Manage starting search.
	 *
	 * @method startSearch
	 * @param {any} search - JSON representation for Search ({id : string, oauth : string, keywords : Array}).
	 * @static
	 */
	static startSearch(search : any) {
		var streamClient : StreamClient = TwitterStreamerManager.findOrCreateStreamClient(search.oauth);
		streamClient.startSearch(search);
	}
}