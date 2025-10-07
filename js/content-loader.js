// content-loader.js - Content loading module
// Fetches and parses JSON content data

/**
 * Load content from JSON file
 * @returns {Promise<Object>} - Content data object
 */
export async function loadContent() {
  try {
    const response = await fetch('/data/content.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading content:', error);
    throw error;
  }
}

export default { loadContent };
