class OriginStore {
	private originUrl: string | null = null;

	setOriginUrl(url: string) {
		this.originUrl = url;
	}

	getOriginUrl(): string | null {
		return this.originUrl;
	}
}

const originStore = new OriginStore();
export default originStore;
