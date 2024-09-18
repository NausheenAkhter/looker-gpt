import Image from "next/image";
'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { json } from "stream/consumers";
import Spinner from "@/components/common/spinner";

export default function Home() {
  const [propmtVal, setPropmt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false);

  const askGpt = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: propmtVal
        })
      });

      const data = await res.text();
      setResponse(data)

    } catch (error) {
      console.log(error);

    }
    finally {
      setLoading(false)
    }
  }

  const handledKeyDown = (key: number) => {
    if (key === 13) {
      askGpt()
    }
  }

  return (
    <main>
      <div className='flex place-content-center m-5'>
        <div className="flex mb-7 w-96 relative">
          <Input placeholder="Ask Looker GPT" onChange={(e) => setPropmt(e.target.value)} onKeyDown={(e) => handledKeyDown(e.keyCode)} />
          <Button className="absolute right-0" onClick={askGpt}>Send</Button>
        </div>
      </div>
      {loading ? <Spinner /> :
        response ? <p className="bg-red-200 rounded-m p-2 m-1">
          {response}</p> : null}
    </main>
  );
}
