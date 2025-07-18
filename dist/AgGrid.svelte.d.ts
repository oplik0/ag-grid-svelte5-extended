import { type GridOptions, type Module, type Theme } from "ag-grid-community";
declare function $$render<TData>(): {
    props: {
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
        theme?: Theme;
    };
    exports: {};
    bindings: "";
    slots: {};
    events: {};
};
declare class __sveltets_Render<TData> {
    props(): ReturnType<typeof $$render<TData>>['props'];
    events(): ReturnType<typeof $$render<TData>>['events'];
    slots(): ReturnType<typeof $$render<TData>>['slots'];
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <TData>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<TData>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<TData>['props']>, ReturnType<__sveltets_Render<TData>['events']>, ReturnType<__sveltets_Render<TData>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<TData>['bindings']>;
    } & ReturnType<__sveltets_Render<TData>['exports']>;
    <TData>(internal: unknown, props: ReturnType<__sveltets_Render<TData>['props']> & {}): ReturnType<__sveltets_Render<TData>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const AgGrid: $$IsomorphicComponent;
type AgGrid<TData> = InstanceType<typeof AgGrid<TData>>;
export default AgGrid;
