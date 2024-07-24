/**
 * Searches and retrieves unique Q&A items containing any of the specified keywords in their title or content.
 *
 * @param {Array<Object>} qas - An array of Q&A objects, each with 'title' and 'content' properties.
 * @param {Array<string>} keywords - An array of keywords to search for in the Q&A data.
 * @returns {Array<Object>} - An array of unique Q&A items containing any of the keywords, sorted by occurrence (most frequent first).
 */
function searchQandA(qas, keywords) {
  // Input validation: Check if qas is an array and keywords is an array of strings
  if (
    !Array.isArray(qas) ||
    !Array.isArray(keywords) ||
    !keywords.every((keyword) => typeof keyword === "string")
  ) {
    return [];
  }

  const keywordMap = {}; // Store keyword occurrences
  const results = [];

  // Normalize keywords to lowercase for case-insensitive search
  const lowerCaseKeywords = keywords.map((keyword) => keyword.toLowerCase());

  // Iterate through each Q&A item
  qas.forEach((qa) => {
    const lowerCaseTitle = qa.title.toLowerCase();
    const lowerCaseContent = qa.content.toLowerCase();

    // Check if any keyword exists in either title or content
    if (
      lowerCaseKeywords.some(
        (keyword) =>
          lowerCaseTitle.includes(keyword) || lowerCaseContent.includes(keyword)
      )
    ) {
      results.push(qa);

      // Update keyword occurrence count
      lowerCaseKeywords.forEach((keyword) => {
        if (
          lowerCaseTitle.includes(keyword) ||
          lowerCaseContent.includes(keyword)
        ) {
          keywordMap[keyword] = (keywordMap[keyword] || 0) + 1;
        }
      });
    }
  });

  // Remove duplicated Q&As, this alterates the order of the Q&As
  const uniqueResults = [...new Set(results)];

  // Sort results based on keyword occurrence (descending)
  const keyValues = Object.entries(keywordMap);
  keyValues.sort((a, b) => b[1] - a[1]);
  const sortedKeywordMap = Object.fromEntries(keyValues);

  // Sort Q&As acording to the sorted keywords
  Object.keys(sortedKeywordMap).forEach((key) => {
    uniqueResults.map((qa) => {
      if (
        qa.title.toLowerCase().includes(key) ||
        qa.content.toLowerCase().includes(key)
      ) {
        if (!qa["order"] || qa["order"] < sortedKeywordMap[key]) {
          return (qa["order"] = sortedKeywordMap[key]);
        }
      }
    });
  });
  const sortedUniqueResults = uniqueResults
    .sort((a, b) => b.order - a.order)
    .map(({ order, ...rest }) => rest);
  return sortedUniqueResults;
}

// Test Cases
const qas = [
  {
    title: "How to change my password?",
    content: "I forgot my password and need to change it.",
  },
  {
    title: "Shipping Information",
    content: "What are the shipping options available?",
  },
  {
    title: "Return Policy",
    content: "What is the return policy for damaged items?",
  },
  { title: "Payment Methods", content: "Can I pay with PayPal?" },
  {
    title: "Password Reset Issue",
    content: "I am having trouble resetting my password.",
  },
  {
    title: "Return an item",
    content: "I don't want it anymore",
  },
  {
    title: "Forgot my password",
    content: "I don't remember my password",
  },
];

console.log(searchQandA(qas, ["return", "shipping", "password"]));
/* Expected output
[
  {
    title: 'How to change my password?',
    content: 'I forgot my password and need to change it.'
  },
  {
    title: 'Password Reset Issue',
    content: 'I am having trouble resetting my password.'
  },
  {
    title: 'Forgot my password',
    content: "I don't remember my password"
  },
  {
    title: 'Return Policy',
    content: 'What is the return policy for damaged items?'
  },
  { title: 'Return an item', content: "I don't want it anymore" },
  {
    title: 'Shipping Information',
    content: 'What are the shipping options available?'
  }
] */

console.log(searchQandA(qas, ["shipping"]));
/* Expected output
[
  {
    title: 'Shipping Information',
    content: 'What are the shipping options available?'
  }
] */

console.log(searchQandA(qas, ["damaged", "paypal"]));
/*Expected output
[
  {
    title: 'Return Policy',
    content: 'What is the return policy for damaged items?'
  },
  { title: 'Payment Methods', content: 'Can I pay with PayPal?' }
] */
console.log(searchQandA(qas, [])); // Expected Output: [] (No keywords provided)

console.log(searchQandA([], ["password"])); // Expected Output: [] (Empty qas array)
