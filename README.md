# ag-grid-svelte-5

A Svelte component for integrating AG Grid with Svelte 5

## Installation

```bash
npm install ag-grid-svelte5
```

## Main Processes

- Create grid options which will include the column defs and other information and event handlers (e.g row clicked)
- Create the row data seperate (outside grid options) and pass as a parameter to the ag grid component (this is for change detection)
- Optional: Can create a theme for different modes and pass that in (similar process to row data for change detection, e.g. a light and dark mode switch)
- Please visit the [repo](https://github.com/JohnMaher1/ag-grid-svelte5) for a quick example

## Example Usage

```svelte
// Default Import
import AgGridSvlete5Component from 'ag-grid-svelte5';

interface Car {
	make: string;
	model: string;
	price: number;
	id: number;
}

let rowData: Car[] = $state([
	{ id: 1, make: 'Toyota', model: 'Celica', price: 35000 },
	{ id: 2, make: 'Ford', model: 'Mondeo', price: 32000 },
	{ id: 3, make: 'Porsche', model: 'Boxster', price: 72000 }
]);

let gridOptions: GridOptions<Car> = {
	columnDefs: [{ field: 'id' }, { field: 'make' }, { field: 'model' }, { field: 'price' }],
	// Important for reducing dom updates and improving performance
	getRowId: (params) => params.data.id.toString(),
	domLayout: 'autoHeight'
};

setInterval(() => {
	rowData = [
		{ id: 1, make: 'Ford', model: 'Mondeo', price: 32000 },
		{ id: 2, make: 'Toyota', model: 'Celica', price: 35000 },
		{ id: 3, make: 'Porsche', model: 'Boxster', price: rowData[2].price + 1 } // Example for change detection
	];
}, 200);

const modules: Module[] = [ClientSideRowModelModule];

// E.g. For dark and light mode themes
const theme = $derived(getThemeFromSomeState());
</script>

<div>
	<AgGridSvlete5Component {gridOptions} {rowData} {modules} {theme} />
</div>
```
