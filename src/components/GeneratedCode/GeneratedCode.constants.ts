export const CODE_LANGUAGES = {
  cURL: 'cURL',
  'JavaScript-fetch': 'JavaScript-fetch',
  'JavaScript-xhr': 'JavaScript-xhr',
  NodeJs: 'NodeJs',
  Python: 'Python',
  Java: 'Java',
  'C#': 'C#',
  Go: 'Go',
  PHP: 'PHP',
  Ruby: 'Ruby',
} as const;

export const CODE_VARIANTS = {
  cURL: 'cURL',
  'JavaScript-fetch': 'Fetch',
  'JavaScript-xhr': 'XHR',
  NodeJs: 'Axios',
  Python: 'Requests',
  Java: 'OkHttp',
  'C#': 'RestSharp',
  Go: 'Native',
  PHP: 'cURL',
  Ruby: 'Net:HTTP',
} as const;
