export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type HeaderValue = string | string[] | number;
export type ParamValue = string | number;
export type HeaderCollection = Header[];
export type ParamCollection = Param[];

interface Header {
  name: string;
  value: HeaderValue;
}

interface Param {
  name: string;
  value: ParamValue;
}

export interface RequestBody {
  readonly [index: string]: any;
}

export interface SuccessResponseBody {
  data: any;
}

export interface ErrorResponseBody {
  error: {
    message: string;
  };
}

export type ResponseBody = SuccessResponseBody | ErrorResponseBody;
