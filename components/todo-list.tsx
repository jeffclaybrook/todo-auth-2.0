"use client"

import { useOptimistic } from "react"
import { Todo } from "@/types/custom"
import { TodoItem } from "./todo-item"
import { TodoForm } from "./todo-form"

export type Action = "delete" | "update" | "create"

export function todoReducer(state: Array<Todo>, { action, todo }: { action: Action; todo: Todo }) {
 switch (action) {
  case "delete":
   return state.filter(({ id }) => id !== todo.id)
  case "update":
   return state.map((t) => (t.id === todo.id ? todo : t))
  case "create":
   return [todo, ...state]
  default:
   return state
 }
}

export type TodoOptimisticUpdate = (action: { action: Action; todo: Todo }) => void

export function TodoList({ todos }: { todos: Array<Todo>}) {
 const [optimisticTodos, optimisticTodosUpdate] = useOptimistic(todos, todoReducer)

 return (
  <>
   <TodoForm optimisticUpdate={optimisticTodosUpdate} />
   <div className="w-full flex flex-col gap-4">
    {optimisticTodos?.map((item) => (
     <TodoItem
      key={item.id}
      optimisticUpdate={optimisticTodosUpdate}
      todo={item}
     />
    ))}
   </div>
  </>
 )
}