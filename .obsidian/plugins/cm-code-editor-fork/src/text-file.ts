import type { App, TFile } from 'obsidian';

const SNIFF_BYTES = 8192;
const MAX_BYTES = 10 * 1024 * 1024;

/** True if the bytes look like UTF-8 text: no NUL bytes and valid UTF-8. */
export function looksLikeText(bytes: Uint8Array, truncated: boolean): boolean {
	if (bytes.includes(0)) return false;
	try {
		// `stream` tolerates a multi-byte character cut off at the sniff boundary.
		new TextDecoder('utf-8', { fatal: true }).decode(bytes, { stream: truncated });
		return true;
	} catch {
		return false;
	}
}

/** Returns null if the file can be edited as text, or a reason it can't. */
export async function checkTextFile(app: App, file: TFile): Promise<string | null> {
	if (file.stat.size === 0) return null;
	if (file.stat.size > MAX_BYTES) return 'is larger than 10 MB';
	const bytes = new Uint8Array(await app.vault.readBinary(file));
	return looksLikeText(bytes.subarray(0, SNIFF_BYTES), bytes.length > SNIFF_BYTES) ? null : "isn't a text file";
}
