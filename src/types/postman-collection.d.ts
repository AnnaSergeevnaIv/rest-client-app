/* eslint-disable @typescript-eslint/no-extraneous-class */
declare module 'postman-collection' {
  export class Request {
    constructor(options: {
      url: string;
      method: string;
      header?: Array<{ key: string; value: string }>;
      body?: {
        mode: string;
        raw?: string;
      };
    });
  }
}
