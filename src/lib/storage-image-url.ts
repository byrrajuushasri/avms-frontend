const storageKeyPattern =
  /^(members|matrimonial|blog)\/[a-f0-9-]+\.(jpg|png|webp)$/i;

export function getStorageImageUrl(
  photo: string | null | undefined,
  backendUrl: string,
  legacyFolder = "matrimonial"
): string | null {
  const value = photo?.trim();

  if (!value) {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const apiBaseUrl = backendUrl.replace(/\/+$/, "");

  if (storageKeyPattern.test(value)) {
    return `${apiBaseUrl}/storage/image?key=${encodeURIComponent(value)}`;
  }

  if (value.startsWith("/")) {
    return `${apiBaseUrl}${value}`;
  }

  if (value.startsWith("uploads/")) {
    return `${apiBaseUrl}/${value}`;
  }

  return `${apiBaseUrl}/uploads/${legacyFolder}/${value}`;
}
