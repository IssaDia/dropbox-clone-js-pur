export interface CreateElementOptions {
  classes?: string[];
  attributes?: { [key: string]: string };
  content?: string | HTMLElement | HTMLElement[];
}
