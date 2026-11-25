
const API_URL = (
  import.meta.env.VITE_API_URL || ""
).replace(/\/+$/, "");

export const getImageUrl = (image) => {
  if (!image) return "";

  // If already a full URL, return it directly
  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  // Remove leading slashes
  let imagePath = image.replace(/^\/+/, "");

  // Add images/ only if it is missing
  if (!imagePath.startsWith("images/")) {
    imagePath = `images/${imagePath}`;
  }

  return `${API_URL}/${imagePath}`;
};
