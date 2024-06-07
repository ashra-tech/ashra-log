export interface CustomXMLHttpRequest extends XMLHttpRequest {
  _url?: string;
  _method?: string;
}
