import { VanillaFrameworkOverrides } from 'ag-grid-community';

export class SvelteFrameworkOverrides extends VanillaFrameworkOverrides {
	override isFrameworkComponent(): boolean {
		return true;
	}
}
