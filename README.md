# AG-Grid for Svelte 5

This uses the interface [IFrameworkOverrides](https://github.com/ag-grid/ag-grid/blob/424be7dcadf9b964056ee8c451af9b041ce8877a/packages/ag-grid-community/src/interfaces/iFrameworkOverrides.ts#L7) to create an adaptor for svelte 5. 

This is based off a fork of [JohnMaher1/ag-grid-svelte5](https://github.com/JohnMaher1/ag-grid-svelte5). I do not know the adaptor works as there's no documentation for it and I don't feel like going through the source code.

This is the entirety of the adaptor that makes ag-grid work with svelte 5:

[.src/lib/SvelteFrameworkComponentWrapper.svelte.ts](src/lib/SvelteFrameworkComponentWrapper.svelte.ts)

<!-- SNIP START -->

```typescript
import {
    AgPromise,
    type FrameworkOverridesIncomingSource,
    type IFrameworkOverrides,
} from "@ag-grid-community/core";

export default class SvelteFrameworkOverrides implements IFrameworkOverrides {
    setInterval(action: any, interval?: any): AgPromise<number> {
        return new AgPromise<number>((resolve) => {
            const id = window.setInterval(action, interval);
            resolve(id);
        });
    }

    addEventListener(
        element: HTMLElement,
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
    ): void {
        element.addEventListener(type, listener, options);
    }

    wrapIncoming: <T>(
        callback: () => T,
        source?: FrameworkOverridesIncomingSource,
    ) => T = (callback, source) => {
        // Implement any specific logic needed for incoming callbacks
        return callback();
    };

    wrapOutgoing: <T>(callback: () => T) => T = (callback) => {
        // Implement any specific logic needed for outgoing callbacks
        return callback();
    };

    shouldWrapOutgoing?: boolean | undefined = false;

    frameworkComponent(name: string, components?: any) {
        // Implement logic to return the framework component
        if (components && components[name]) {
            return components[name];
        }
    }

    renderingEngine: "vanilla" | "react" = "vanilla";

    getDocLink(path?: string): string {
        const baseUrl = "https://www.npmjs.com/package/ag-grid-svelte5";
        return path ? `${baseUrl}/${path}` : baseUrl;
    }

    getLockOnRefresh?(): void {
        // Implement logic to lock on refresh if needed
        //console.log('Lock on refresh acquired');
    }

    releaseLockOnRefresh?(): void {
        // Implement logic to release lock on refresh if needed
        //console.log('Lock on refresh released');
    }

    runWhenReadyAsync?(): boolean {
        // Implement logic to determine if async operations should run when ready
        return true;
    }

    isFrameworkComponent(comp: any): boolean {
        // Implement logic to determine if the component is a framework component
        return !!comp && typeof comp === "object" && "render" in comp;
    }
}

```

<!-- SNIP END -->