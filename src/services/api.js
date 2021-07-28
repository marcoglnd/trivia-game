const TOKEN = 'https://opentdb.com/api_token.php?command=request';
const CATEGORIES = 'https://opentdb.com/api_category.php';

export async function fetchToken() {
  try {
    const response = await fetch(TOKEN);
    const data = await response.json();
    return data.token;
  } catch (error) {
    return error;
  }
}

export async function fetchQuestions(difficulty, category) {
  try {
    const token = await fetchToken();
    const response = await fetch(`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&category=${category}&token=${token}`);
    const data = await response.json();
    localStorage.setItem('token', token);
    return data;
  } catch (error) {
    return error;
  }
}

export async function fetchCategory() {
  try {
    const response = await fetch(CATEGORIES);
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    return error;
  }
}
