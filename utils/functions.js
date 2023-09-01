const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    throw new Error('request failed');
  }
  return json;
};

// const formatDate = (date) => {
//  date = new Date(date);
// };

export {doFetch};
