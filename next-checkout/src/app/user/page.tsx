"use client"

import React from 'react'
import { userStore } from "@/store/user";

const User = () => {
  const user = userStore((state: any) => state.user)
  const updateUser = userStore((state: any) => state.updateUser)

  const sub = userStore.subscribe(() => {

  })

  sub()

  return (
    <div>
      <div>{user.full_name}</div>
      <input type="text" className="border" onChange={(e) => {
        updateUser({
        full_name: e.target.value
      })}
    }></input>
    </div>
  )
}

export default User