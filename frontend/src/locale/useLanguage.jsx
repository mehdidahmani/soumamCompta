import fr_fr from './translation/fr_fr'; // Import French translations
import en_us from './translation/en_us'; // Import fallback English translations

// Function to retrieve the label
const getLabel = (lang, key) => {
  try {
    // Normalize the key: Convert to lowercase, replace special characters with '_'
    const lowerCaseKey = key
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/ /g, '_');

    // Check if the translation exists in the selected language
    if (lang[lowerCaseKey]) return lang[lowerCaseKey];

    // Fallback: Generate a human-readable string if no translation is found
    const remove_underscore_fromKey = lowerCaseKey.replace(/_/g, ' ').split(' ');
    const conversionOfAllFirstCharacterofEachWord = remove_underscore_fromKey.map(
      (word) => word[0].toUpperCase() + word.substring(1)
    );

    return conversionOfAllFirstCharacterofEachWord.join(' '); // Return the fallback label
  } catch (error) {
    return 'No translate Found'; // Return default message in case of errors
  }
};

// Function to select the correct language file
const useSelector = (lang = 'en_us') => {
  try {
    // Dynamically return the appropriate language file
    switch (lang) {
      case 'fr_fr':
        return fr_fr;
      case 'en_us':
        return en_us;
      default:
        return en_us; // Default to English if the selected language is not supported
    }
  } catch (error) {
    console.error(`Failed to load language file for ${lang}:`, error);
    return {}; // Return an empty object if an error occurs
  }
};

// Main hook to use language translations
const useLanguage = ({ selectedLang = 'fr_fr' } = {}) => {
  const lang = useSelector(selectedLang); // Load the selected language
  const translate = (value) => {
    const text = getLabel(lang, value); // Retrieve the translated label
    return text;
  };
  return translate; // Return the translation function
};

export default useLanguage;
