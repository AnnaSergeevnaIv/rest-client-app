export const CODE_LANGUAGES = {
  cURL: 'cURL',
  'JavaScript-fetch': 'JavaScript-fetch',
  'JavaScript-xhr': 'JavaScript-xhr',
  NodeJs: 'NodeJs',
  Python: 'Python',
  Java: 'Java',
  csharp: 'csharp',
  Go: 'Go',
  PHP: 'PHP',
  ruby: 'ruby',
} as const;

export const CODE_VARIANTS = {
  cURL: 'cURL',
  'JavaScript-fetch': 'Fetch',
  'JavaScript-xhr': 'XHR',
  NodeJs: 'Axios',
  Python: 'Requests',
  Java: 'OkHttp',
  csharp: 'restsharp',
  Go: 'Native',
  PHP: 'cURL',
  ruby: 'net::http',
} as const;
