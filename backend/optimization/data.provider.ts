export default class DataProvider<T = any> {
   private cursor: number = 0;

   // a stack for pending index (deleted data index will be recycled)
   private pending: number[] = [];

   // using map for faster performance accessing index
   private _data: Map<number, T> = new Map();

   /**
    * @description data id starts from 0. idx appended into payload for better management
    */
   get data() {
      const data = [];

      for (let [i, payload] of Array.from(this._data.entries())) {
         if (!payload) continue;

         (payload as any)["id"] = i;
         data.push(payload);
      }

      return data;
   }

   add(data: T) {
      this._data.set(this.cursor, data);

      if (!this.pending.length) {
         this.cursor = this._data.size;
         return true;
      }

      this.pending.pop();
      this.cursor = this.pending[this.pending.length - 1];

      return true;
   }

   update(idx: number, data: T) {
      this._data.set(idx, data);

      return true;
   }

   delete(idx: number) {
      this._data.delete(idx);
      this.cursor = idx;
      this.pending.push(idx);

      return true;
   }

   check(idx: number) {
      return this._data.has(idx);
   }
}
