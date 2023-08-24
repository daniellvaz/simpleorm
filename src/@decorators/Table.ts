import { Entity } from "../lib/Entity";

export function Table(table: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      table: string = table;
    };
  };
}