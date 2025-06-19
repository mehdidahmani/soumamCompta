const getLabel = (lang, key) => {
  try {
    const lowerCaseKey = key
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/ /g, '_'); // Normalize the key

    // Check if the translation exists in the selected language file
    if (lang[lowerCaseKey]) return lang[lowerCaseKey];

    // Fallback: Generate a readable label if no translation is found
    const remove_underscore_fromKey = lowerCaseKey.replace(/_/g, ' ').split(' ');
    const conversionOfAllFirstCharacterofEachWord = remove_underscore_fromKey.map(
      (word) => word[0].toUpperCase() + word.substring(1)
    );
    return conversionOfAllFirstCharacterofEachWord.join(' ');
  } catch (error) {
    return 'No translate Found'; // Return default message in case of errors
  }
};

const useSelector = (lang = 'en_us') => {
  const filePath = `./translation/${lang}`; // Path to the language file
  try {
    const langFile = require(filePath); // Load the language file dynamically
    return langFile; // Return the loaded language file
  } catch (error) {
    console.error(`Failed to load language file for ${lang}:`, error);
    return {}; // Return an empty object if the file is not found
  }
};

const useLanguage = ({ selectedLang = 'fr_fr' }) => {
  const lang = useSelector(selectedLang); // Load the selected language file (`fr_fr`)
  const translate = (value) => {
    const text = getLabel(lang, value); // Get the translated value or fallback
    return text;
  };
  return translate; // Return the translation function
};

module.exports = useLanguage;
