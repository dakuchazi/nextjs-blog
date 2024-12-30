export function getFullImageUrl(partialUrl: string): string {
    if (!partialUrl) return '';
    if (partialUrl.startsWith('http')) {
        return partialUrl;
    }
    return `${process.env.NEXT_PUBLIC_API_URL}${partialUrl}`;
}