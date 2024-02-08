export async function fetchDataFromAPI() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data from the API');
    }
  }


 