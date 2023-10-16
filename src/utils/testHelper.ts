export function convertToNumber(value: string) {
    return Number(value.replace('€', ''));
}
