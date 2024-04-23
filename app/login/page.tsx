import { redirect } from "next/navigation"
import { emailLogin, signUp } from "./actions"
import { createClient } from "@/utils/supabase/server"
import { OAuthButtons } from "./oauth-signin"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"

export default async function Login({
 searchParams
}: {
 searchParams: {
  message: string
 }
}) {
 const supabase = createClient()

 const {
  data: {
   user
  }
 } = await supabase.auth.getUser()

 if (user) {
  return redirect("/todos")
 }

 return (
  <section className="h-[calc(100vh-57px)] flex justify-center items-center">
   <Card className="mx-auto max-w-sm">
    <CardHeader>
     <CardTitle className="text-2xl">Login</CardTitle>
     <CardDescription>Enter your email below to login to your account</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
     <form id="login-form" className="grid gap-4">
      <div className="grid gap-2">
       <Label htmlFor="email">Email</Label>
       <Input
        type="email"
        id="email"
        name="email"
        placeholder="janedoe@email.com"
        required
       />
      </div>
      <div className="grid gap-2">
       <Label htmlFor="password">Password</Label>
       <Input
        type="password"
        id="password"
        name="password"
        minLength={6}
        required
       />
      </div>
      {searchParams.message && (
       <div className="text-sm font-medium text-destructive">{searchParams.message}</div>
      )}
      <Button formAction={emailLogin} className="w-full">Login</Button>
     </form>
     <OAuthButtons />
     <div className="text-center text-sm">
      Don&apos;t have an account?{" "}
      <button className="underline" form="login-form" formAction={signUp}>Sign up</button>
     </div>
    </CardContent>
   </Card>
  </section>
 )
}