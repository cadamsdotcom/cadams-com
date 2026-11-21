import { Notice, Plugin, TFile } from 'obsidian';
import { CodeEditorSettingsTab, DEFAULT_SETTINGS } from './settings';
import type { PluginSettings } from './settings';
import { CodeEditorView, VIEW_TYPE } from './view';
import { CreateCodeFileModal } from './create-modal';
import { RenameFileModal } from './rename-modal';

// Internal: Obsidian's map of file extensions to the view types that open them.
interface ViewRegistry {
	getTypeByExtension(extension: string): string | undefined;
	isExtensionRegistered(extension: string): boolean;
	registerExtensions(extensions: string[], type: string): void;
}

export default class CodeEditorPlugin extends Plugin {
	settings: PluginSettings = DEFAULT_SETTINGS;
	registeredExtensions = new Set<string>();

	async onload(): Promise<void> {
		await this.loadSettings();

		this.registerView(VIEW_TYPE, (leaf) => new CodeEditorView(leaf, this));

		const failed: string[] = [];
		for (const ext of this.settings.extensions) {
			if (!this.registerExtension(ext)) failed.push(ext);
		}
		if (failed.length > 0) {
			new Notice(`CM Code Editor: these extensions are already opened by Obsidian or another plugin: ${failed.join(', ')}`);
		}

		this.addSettingTab(new CodeEditorSettingsTab(this.app, this));

		this.claimUnhandledExtensions();

		this.addCommand({
			id: 'create-file',
			name: 'Create code file',
			callback: () => {
				new CreateCodeFileModal(this).open();
			},
		});

		this.addCommand({
			id: 'rename-with-extension',
			name: 'Rename file with extension',
			checkCallback: (checking) => {
				const file = this.app.workspace.getActiveFile();
				if (!file) return false;
				if (!checking) new RenameFileModal(this, file).open();
				return true;
			},
		});

		this.registerEvent(
			this.app.workspace.on('file-menu', (menu, file) => {
				menu.addItem((item) => {
					item.setTitle('Create code file here')
						.setIcon('file-code')
						.onClick(() => {
							new CreateCodeFileModal(this, file).open();
						});
				});
				if (file instanceof TFile) {
					menu.addItem((item) => {
						item.setTitle('Rename with extension')
							.setIcon('pencil')
							.onClick(() => {
								new RenameFileModal(this, file).open();
							});
					});
				}
			}),
		);

	}

	onunload(): void {
		// Cleanup handled automatically by Obsidian
	}

	/** Returns false if another plugin or view already claims the extension. */
	registerExtension(ext: string): boolean {
		if (this.registeredExtensions.has(ext)) return true;
		try {
			this.registerExtensions([ext], VIEW_TYPE);
			this.registeredExtensions.add(ext);
			return true;
		} catch {
			return false;
		}
	}

	// "Open all text files": when no view is registered for an extension
	// (including files with no extension), report this editor as its view, so
	// Obsidian opens the file here instead of handing it to the OS. The view
	// then checks the content and refuses binary files. Uses Obsidian's
	// internal view registry; registrations themselves are left untouched.
	private claimUnhandledExtensions(): void {
		const registry = this.app.viewRegistry as ViewRegistry | undefined;
		if (!registry?.getTypeByExtension || !registry.isExtensionRegistered || !registry.registerExtensions) return;
		const original = {
			getTypeByExtension: registry.getTypeByExtension.bind(registry) as ViewRegistry['getTypeByExtension'],
			isExtensionRegistered: registry.isExtensionRegistered.bind(registry) as ViewRegistry['isExtensionRegistered'],
			registerExtensions: registry.registerExtensions.bind(registry) as ViewRegistry['registerExtensions'],
		};
		const enabled = (): boolean => this.settings.openAllTextFiles;
		// While any plugin registers extensions, answer truthfully so real
		// registrations (ours and other plugins') still work.
		let registering = 0;
		registry.registerExtensions = (extensions: string[], type: string): void => {
			registering++;
			try {
				original.registerExtensions(extensions, type);
			} finally {
				registering--;
			}
		};
		registry.getTypeByExtension = (extension: string): string | undefined => {
			const type = original.getTypeByExtension(extension);
			return type || registering > 0 || !enabled() ? type : VIEW_TYPE;
		};
		registry.isExtensionRegistered = (extension: string): boolean =>
			registering > 0 || !enabled() ? original.isExtensionRegistered(extension) : true;
		this.register(() => Object.assign(registry, original));
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<PluginSettings>);
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	applySettingsToOpenEditors(): void {
		for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE)) {
			if (leaf.view instanceof CodeEditorView) {
				leaf.view.updateSettings(this.settings);
			}
		}
	}
}
