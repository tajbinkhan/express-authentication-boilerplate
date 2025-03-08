class OriginStore {
	private clientDomain: string | null = null;
	private serverDomain: string | null = null;

	setClientDomain(url: string) {
		this.clientDomain = url;
	}

	getClientDomain(): string | null {
		return this.clientDomain;
	}

	setServerDomain(url: string) {
		this.serverDomain = url;
	}

	getServerDomain(): string | null {
		return this.serverDomain;
	}
}

const originStore = new OriginStore();
export default originStore;
