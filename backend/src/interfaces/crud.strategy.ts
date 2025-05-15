export interface CRUDStrategy<T, V> {
   add(data: V): Promise<T>;
   get<K>(query?: K): Promise<T[]>;
   update<K>(id: number, data: K): Promise<T>;
   delete(id: number): Promise<T>;
}
