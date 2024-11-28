<div
    style="height: 100%;"
    bind:this={eGui}
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
    import SvelteFrameworkOverrides from "./SvelteFrameworkComponentWrapper.svelte.ts";

    interface AgGridComponentProps {
        gridOptions: GridOptions<TData>;
        rowData?: TData[];
        modules?: Module[];
        gridClass?: string;
        sizeColumnsToFit?: boolean;
        theme?: GridTheme;
    }

    let {
        gridOptions,
        rowData,
        modules,
        gridClass,
        theme,
        sizeColumnsToFit = true,
    }: AgGridComponentProps = $props();
    let api: GridApi<TData> | undefined = $state(undefined);
    let eGui: HTMLDivElement | undefined = $state();

    const gridParams: GridParams = {
        modules: modules ?? [],
        frameworkOverrides: new SvelteFrameworkOverrides(),
    };

    $effect(() => {
        api?.setGridOption("theme", theme);
    });

    $effect(() => {
        if (gridOptions && eGui) {
            api?.setGridOption("rowData", rowData);
            if (sizeColumnsToFit) api?.sizeColumnsToFit();
        }
    });

    onMount(() => {
        api = createGrid(eGui!, gridOptions, gridParams);

        return () => {
            api?.destroy();
        };
    });
</script>
