export function cloneData(data: any): any {
  return JSON.parse(JSON.stringify(data));
}