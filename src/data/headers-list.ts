export const HttpRequestHeadersArray = [
  // Standard HTTP/1.1 headers
  'A-IM',
  'Accept',
  'Accept-Charset',
  'Accept-Encoding',
  'Accept-Language',
  'Accept-Datetime',
  'Access-Control-Request-Method',
  'Access-Control-Request-Headers',
  'Authorization',
  'Cache-Control',
  'Connection',
  'Content-Length',
  'Content-Type',
  'Cookie',
  'Date',
  'Expect',
  'Forwarded',
  'From',
  'Host',
  'If-Match',
  'If-Modified-Since',
  'If-None-Match',
  'If-Range',
  'If-Unmodified-Since',
  'Max-Forwards',
  'Origin',
  'Pragma',
  'Proxy-Authorization',
  'Range',
  'Referer',
  'TE',
  'Trailer',
  'Transfer-Encoding',
  'User-Agent',
  'Upgrade',
  'Via',
  'Warning',

  // HTTP/2 specific headers
  ':authority',
  ':method',
  ':path',
  ':scheme',
  ':status',

  // Common non-standard (X-) headers
  'X-Requested-With',
  'X-CSRF-Token',
  'X-CSRFToken',
  'X-Forwarded-For',
  'X-Forwarded-Host',
  'X-Forwarded-Proto',
  'X-Real-IP',
  'X-Request-ID',
  'X-Correlation-ID',
  'X-HTTP-Method-Override',
  'X-Content-Type-Options',
  'X-Frame-Options',
  'X-XSS-Protection',
  'X-Powered-By',
  'X-RateLimit-Limit',
  'X-RateLimit-Remaining',
  'X-RateLimit-Reset',
  'X-UA-Compatible',
  'X-DNS-Prefetch-Control',
  'X-Download-Options',

  // CORS headers
  'Access-Control-Allow-Origin',
  'Access-Control-Allow-Methods',
  'Access-Control-Allow-Headers',
  'Access-Control-Allow-Credentials',
  'Access-Control-Max-Age',
  'Access-Control-Expose-Headers',
  'Access-Control-Request-Method',
  'Access-Control-Request-Headers',

  // Security headers
  'Strict-Transport-Security',
  'Content-Security-Policy',
  'Public-Key-Pins',
  'Expect-CT',
  'Feature-Policy',
  'Permissions-Policy',
  'Referrer-Policy',

  // Authentication headers
  'WWW-Authenticate',
  'Proxy-Authenticate',
  'Authorization',
  'Proxy-Authorization',

  // Cookie headers
  'Set-Cookie',
  'Cookie',

  // Content negotiation
  'Accept',
  'Accept-Charset',
  'Accept-Encoding',
  'Accept-Language',
  'Accept-Patch',
  'Accept-Ranges',

  // Conditional requests
  'If-Match',
  'If-None-Match',
  'If-Modified-Since',
  'If-Unmodified-Since',
  'If-Range',

  // Range requests
  'Range',
  'If-Range',
  'Content-Range',

  // Compression
  'Content-Encoding',
  'Transfer-Encoding',
  'TE',

  // Redirects
  'Location',
  'Refresh',

  // Download headers
  'Content-Disposition',

  // Caching headers
  'Age',
  'Cache-Control',
  'Expires',
  'Date',
  'ETag',
  'Last-Modified',
  'Vary',

  // Do Not Track
  'DNT',
  'Tk',

  // Device/client info
  'User-Agent',
  'Device-Memory',
  'DPR',
  'Viewport-Width',
  'Width',

  // WebSocket headers
  'Sec-WebSocket-Key',
  'Sec-WebSocket-Version',
  'Sec-WebSocket-Extensions',
  'Sec-WebSocket-Protocol',
  'Sec-WebSocket-Accept',

  // Server-sent events
  'Last-Event-ID',

  // Fetch metadata
  'Sec-Fetch-Site',
  'Sec-Fetch-Mode',
  'Sec-Fetch-User',
  'Sec-Fetch-Dest',

  // Client hints
  'Accept-CH',
  'Accept-CH-Lifetime',
  'Device-Memory',
  'DPR',
  'Viewport-Width',
  'Width',
  'Save-Data',

  // Proxy headers
  'Forwarded',
  'X-Forwarded-For',
  'X-Forwarded-Host',
  'X-Forwarded-Proto',
  'Via',

  // Diagnostic headers
  'X-Request-Start',
  'X-Request-ID',
  'X-Correlation-ID',
].sort();
