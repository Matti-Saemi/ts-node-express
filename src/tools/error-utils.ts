export function formatError(stack: string): String {
    return JSON.stringify(stack, null, 2);
}