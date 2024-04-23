"use client"

import { useRef } from "react"
import { useFormStatus } from "react-dom"
import { addTodo } from "@/app/todos/actions"
import { Send } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Todo } from "@/types/custom"
import { TodoOptimisticUpdate } from "./todo-list"

function FormContent() {
 const { pending } = useFormStatus()

 return (
  <>
   <Textarea
    name="todo"
    placeholder="Add todo"
    disabled={pending}
    minLength={4}
    required
   />
   <Button
    type="submit"
    size="icon"
    disabled={pending}
    className="min-w-10"
   >
    <Send className="h-5 w-5" />
    <span className="sr-only">Submit Todo</span>
   </Button>
  </>
 )
}

export function TodoForm({ optimisticUpdate }: { optimisticUpdate: TodoOptimisticUpdate}) {
 const formRef = useRef<HTMLFormElement>(null)

 return (
  <Card>
   <CardContent className="p-3">
    <form
     ref={formRef}
     className="flex gap-4"
     action={async (data) => {
      const newTodo: Todo = {
       id: -1,
       inserted_at: "",
       user_id: "",
       task: data.get("todo") as string,
       is_complete: false
      }
      optimisticUpdate({ action: "create", todo: newTodo })
      await addTodo(data)
      formRef.current?.reset()
     }}
    >
     <FormContent />
    </form>
   </CardContent>
  </Card>
 )
}