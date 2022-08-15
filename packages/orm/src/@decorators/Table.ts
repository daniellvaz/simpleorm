export function Table(table: string) {
  return (target: Function) => {
    target.prototype.table = table
  }
}