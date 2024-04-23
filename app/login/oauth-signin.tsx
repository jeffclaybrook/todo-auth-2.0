"use client"

import { Provider } from "@supabase/supabase-js"
import { Github } from "lucide-react"
import { oAuthSignIn } from "./actions"
import { Button } from "@/components/ui/button"

type OAuthProvider = {
 name: Provider
 displayName: string
 icon?: JSX.Element
}

export function OAuthButtons() {
 const oAuthProviders: OAuthProvider[] = [
  {
   name: "github",
   displayName: "GitHub",
   icon: <Github className="size-5" />
  }
 ]

 return (
  <>
   {oAuthProviders.map((item, i) => (
    <Button
     key={i}
     className="w-full flex items-center justify-center gap-2"
     variant="outline"
     onClick={async () => {
      await oAuthSignIn(item.name)
     }}
    >
     {item.icon}
     Login with {item.displayName}
    </Button>
   ))}
  </>
 )
}