/**
 */
export interface ITodo {
   id: number;
   title: string;
   completed: boolean;
}

export type IQueryTodo = Partial<ITodo>;
export type IAddTodo = Pick<ITodo, "title">;
export type IEditTodo = Partial<Omit<ITodo, "id">>;
