import axios from 'axios';

export const translateToEnglish = async (
  text: string
) => {
  try {
    const response = await axios.post(
      'https://libretranslate.de/translate',
      {
        q: text,
        source: 'auto',
        target: 'en',
        format: 'text',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.translatedText;
  } catch (error) {
    console.log(
      'Translation Error:',
      error
    );

    return text;
  }
};