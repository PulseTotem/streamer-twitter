/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */
	
var fs : any = require('fs');

/**
 * Contains Streamer Configuration information.
 *
 * @class StreamerConfig
 */
class StreamerConfig {

    /**
     * Consumer Key.
     *
     * @property consumerKey
     * @type string
     * @static
     */
    static consumerKey : string = "";

	/**
	 * Consumer Secret.
	 *
	 * @property consumerSecret
	 * @type string
	 * @static
	 */
	static consumerSecret : string = "";

    /**
     * Retrieve configuration information from file description.
     *
     * @method retrieveConfigurationInformation
     * @static
     */
    static retrieveConfigurationInformation() {
        if(StreamerConfig.consumerKey == "" && StreamerConfig.consumerSecret == "") {
            var file = __dirname + '/streamer_config.json';
			try {
				var configInfos = JSON.parse(fs.readFileSync(file, 'utf8'));
				StreamerConfig.consumerKey = configInfos.consumerKey;
				StreamerConfig.consumerSecret = configInfos.consumerSecret;
			} catch (e) {
				Logger.error("Streamer configuration file can't be read.");
				Logger.debug(e);
			}
        }
    }

    /**
     * Return Consumer Key.
     *
     * @method getConsumerKey
     * @static
     * @return {string} - Consumer Key.
     */
    static getConsumerKey() : string {
        StreamerConfig.retrieveConfigurationInformation();
        return StreamerConfig.consumerKey;
    }

	/**
	 * Return Consumer Secret.
	 *
	 * @method getConsumerSecret
	 * @static
	 * @return {string} - Consumer Secret.
	 */
	static getConsumerSecret() : string {
		StreamerConfig.retrieveConfigurationInformation();
		return StreamerConfig.consumerSecret;
	}
}