"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { deleteTodo, updateTodo } from "@/app/todos/actions"
import { cn } from "@/lib/utils"
import { Todo } from "@/types/custom"
import { Trash2 } from "lucide-react"
import { TodoOptimisticUpdate } from "./todo-list"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent } from "./ui/card"

export function TodoItem({ todo, optimisticUpdate }: { todo: Todo; optimisticUpdate: TodoOptimisticUpdate }) {
 return (
  <form>
   <TodoCard
    todo={todo}
    optimisticUpdate={optimisticUpdate}
   />
  </form>
 )
}

export function TodoCard({ todo, optimisticUpdate }: { todo: Todo; optimisticUpdate: TodoOptimisticUpdate }) {
 const { pending } = useFormStatus()
 const [checked, setChecked] = useState(todo.is_complete)

 return (
  <Card className={cn("w-full", pending && "opacity-50")}>
   <CardContent className="flex items-start gap-3 p-3">
    <span className="size-10 flex items-center justify-center">
     <Checkbox
      checked={Boolean(checked)}
      disabled={pending}
      onCheckedChange={async (val) => {
       if (val === "indeterminate") return
       setChecked(val)
       await updateTodo({ ...todo, is_complete: val })
      }}
     />
    </span>
    <p className={cn("flex-1 pt-2 min-w-0 break-words")}>{todo.task}</p>
    <Button
     variant="ghost"
     size="icon"
     disabled={pending}
     formAction={async (data) => {
      optimisticUpdate({ action: "delete", todo })
      await deleteTodo(todo.id)
     }}
    >
     <Trash2 className="h-5 w-5" />
     <span className="sr-only">Delete Todo</span>
    </Button>
   </CardContent>
  </Card>
 )
}