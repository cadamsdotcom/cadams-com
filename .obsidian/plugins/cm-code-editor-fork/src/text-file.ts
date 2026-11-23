import type { App, TFile } from 'obsidian';

const MAX_BYTES = 10 * 1024 * 1024;

/**
 * True if the whole buffer is valid UTF-8 with no NUL bytes. Obsidian reads
 * and writes files as UTF-8, so anything else would be corrupted on save.
 * Both checks run natively and stop at the first bad byte.
 */
export function isUtf8Text(bytes: Uint8Array): boolean {
	if (bytes.includes(0)) return false;
	try {
		new TextDecoder('utf-8', { fatal: true }).decode(bytes);
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
	return isUtf8Text(bytes) ? null : "isn't a UTF-8 text file";
}

/**
 * The file's line ending: CRLF if most line breaks are CRLF, else LF. A file
 * with mixed endings is saved with the majority style throughout.
 */
export function detectLineEnding(text: string): '\n' | '\r\n' {
	const crlf = text.split('\r\n').length - 1;
	const lf = text.split('\n').length - 1 - crlf;
	return crlf > lf ? '\r\n' : '\n';
}
