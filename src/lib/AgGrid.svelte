<div
    style={gridStyle ?? "height: 100%;"}
    bind:this={divContainerEl}
    class={gridClass ?? "ag-theme-quartz"}
></div>

<script lang="ts" generics="TData">
    import {
        type GridOptions,
        type Module,
        type GridApi,
        type GridParams,
        type GridTheme,
        createGrid,
    } from "@ag-grid-community/core";

    import { onMount } from "svelte";
    import SvelteFrameworkOverrides from "./SvelteFrameworkOverrides.svelte";
    import initialGridOptionsList from "./initialGridOptionsSet";
    interface Props {
        gridOptions: GridOptions<TData>;
        /**
         * Include a id property on row objects you pass to this or a getRowId() function
         * to initialOptions. Can set here or in gridOptions.
         */
        rowData?: TData[];
        modules?: Module[];
        gridClass?: string;
        gridStyle?: string;
        quickFilterText?: string;
        sizeColumnsToFit?: boolean;
        theme?: GridTheme;
    }

    let {
        gridOptions,
        rowData,
        modules,
        gridClass,
        gridStyle,
        quickFilterText,
        sizeColumnsToFit = true,
    }: Props = $props();

    let api: GridApi<TData> | undefined = $state(undefined);
    let divContainerEl: HTMLDivElement | undefined = $state();

    const gridParams: GridParams = {
        modules: modules ?? [],
        frameworkOverrides: new SvelteFrameworkOverrides(),
    };

    $effect(() => {
        // prettier-ignore
        const updatedOptions: GridOptions<TData> = {};
        for (const key in gridOptions) {
            if (!initialGridOptionsList.has(key)) {
                // @ts-expect-error
                updatedOptions[key] = gridOptions[key];
            }
        }

        api?.updateGridOptions(updatedOptions);
    });

    // Update grid on data change + init
    $effect(() => {
        api?.setGridOption("rowData", rowData);
        // if (sizeColumnsToFit) api?.sizeColumnsToFit();
    });

    $effect(() => {
        if (quickFilterText !== undefined) {
            api?.setGridOption("quickFilterText", quickFilterText);
        }
    });

    onMount(() => {
        api = createGrid(divContainerEl!, gridOptions, gridParams);
        if (sizeColumnsToFit) api.sizeColumnsToFit();

        return () => {
            api?.destroy();
        };
    });
</script>
