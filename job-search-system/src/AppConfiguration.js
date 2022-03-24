class AppConfiguration {
	constructor() {
		this.CONFIGURED_URL = undefined;
	}

	url() {
		const port = process.env.PORT;

		if (port) {
			this.CONFIGURED_URL =
				"https://job-search-system-catarman.herokuapp.com";
		} else {
			this.CONFIGURED_URL = "http://localhost:2000";
		}

		return this.CONFIGURED_URL;
	}
}

export default new AppConfiguration();
