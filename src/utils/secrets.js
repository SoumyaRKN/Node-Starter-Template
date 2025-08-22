import vault from "node-vault";
import logger from "./logger.js";

/*======================= Secrets ==========================*/
class EnvSecrets {
	async get(key) {
		return process.env[key];
	}

	async getAll(prefix) {
		const output = {};

		for (const k of Object.keys(process.env)) {
			if (k.startsWith(prefix)) output[k.replace(prefix, "")] = process.env[k];
		}

		return output;
	}
}

class VaultSecrets {
	constructor() {
		this.client = vault({
			endpoint: process.env.VAULT_ADDR,
			token: process.env.VAULT_TOKEN,
		});
	}

	async get(path, key = null) {
		const res = await this.client.read(path);

		const payload = res && res.data && (res.data.data || res.data);

		if (!payload) return null;
		if (key) return payload[key];

		return payload;
	}

	async getKVv2(name) {
		const path = `secret/data/${name}`;
		const res = await this.client.read(path);
		const payload = res && res.data && res.data.data;

		return payload || null;
	}
}

let instance;

if (process.env.VAULT_ADDR && process.env.VAULT_TOKEN) {
	try {
		instance = new VaultSecrets();
		logger.info("Using VaultSecrets");
	} catch (error) {
		logger.warn("Vault init failed, falling back to EnvSecrets", error);
		instance = new EnvSecrets();
	}
} else {
	instance = new EnvSecrets();
	logger.info("Using EnvSecrets");
}

export default instance;
