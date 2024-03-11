// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useRef } from 'react'
import './App.css'

import { useQuery, useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query"

const POSTS = [
  { id: 1 as string | number, title: "Post 1"},
  { id: 2, title: "Post 2"}
]

function App() {
  const queryClient = useQueryClient()
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: ({queryKey}) => wait(1000).then(() => [...POSTS]),
    // staleTime: 1000
    // refetchInterval: 1000
  })
 


  
  const getPost = (id: number) => {
    return POSTS[id]
  }

  const postQuery = useQuery({
    queryKey: ["posts", 1],
    queryFn: () => getPost(1),
    enabled: postsQuery?.data && postsQuery?.data?.length > 0
    // delays the running of postQuery until postsQuery runs
  })



  
  const newPostContent = useRef<HTMLInputElement | null>(null);

  const newPostMutation = useMutation({
    mutationFn: (title: string) => {
      return wait(1000).then(() =>
      POSTS.push({id: crypto.randomUUID(), title } ))
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["posts"] as InvalidateQueryFilters)
      // keep in mind this will invalidate all queries that start with "posts"
      // add exact: true if you only want a specific one invalidated
      queryClient.setQueryData(["posts"], data)
      // updates the cache immediately so you don't have to wait for the response to come back
    },
    // onError: (error, variables, context)
    // onSettled: (data, error, variables, context) (similar to finally{} block)
    onMutate: () => {
      return {hi: "Bye"} // runs before mutation function, sets 'context' variable
    }
  })

  // same as postsQuery.status === "loading"
  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

  return (
    <div>
      <h1>Welcome :) TanStack Query</h1>
      {postsQuery.data!.map(post => {
        return <h1 key={post.id}>{post.title}</h1>
      })}
      <input className="p-2 m-2 rounded-xl" ref={newPostContent}/>
      <button onClick={() => {
        return newPostMutation.mutate(newPostContent.current!.value)
      }}>
        Add New
      </button>
    </div>
  )
}

function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App
