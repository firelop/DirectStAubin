import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
	/*server: {
		https: {
			key: fs.readFileSync('localhost-key.pem'),
			cert: fs.readFileSync('localhost.pem')
		}
	},*/
	server: {
		host: "0.0.0.0"
	},
	plugins: [sveltekit()]
});
