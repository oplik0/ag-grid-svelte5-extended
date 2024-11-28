import fsp from "fs/promises";
import path from "path";

async function updateReadme() {
    try {
        // Read the files
        const readmePath = path.join(process.cwd(), "README.md");
        const wrapperPath = path.join(process.cwd(), "src/lib/SvelteFrameworkOverrides.svelte.ts");

        const readme = await fsp.readFile(readmePath, "utf-8");
        const wrapper = await fsp.readFile(wrapperPath, "utf-8");

        // Create the new content with the wrapper code
        const newContent = `\`\`\`typescript
${wrapper}
\`\`\``;

        // Replace content between SNIP comments
        const updatedReadme = readme.replace(
            /(<!-- SNIP START -->)[\s\S]*(<!-- SNIP END -->)/m,
            `$1\n\n${newContent}\n\n$2`
        );

        // Write the updated content back to README.md
        await fsp.writeFile(readmePath, updatedReadme, "utf-8");
        console.log("README.md has been updated successfully.");
    } catch (error) {
        console.error("Error updating README.md:", error);
        process.exit(1);
    }
}

updateReadme();
