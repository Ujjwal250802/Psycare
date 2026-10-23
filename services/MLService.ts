const BASE_URL =
  'http://10.37.67.96:8000';

export const analyzeMentalHealth =
  async (
    text: string
  ) => {
    try {
      const response =
        await fetch(
          `${BASE_URL}/predict`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              text,
            }),
          }
        );

      return await response.json();
    } catch (error) {
      console.log(
        'ML Error:',
        error
      );

      return {
        success: false,
      };
    }
  };