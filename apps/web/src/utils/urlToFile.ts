export async function urlToFile(url: string, filename: any, mimeType: any) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
}
