import Image from "next/image";
'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { json } from "stream/consumers";

export default function Home() {
  const [propmtVal, setPropmt] = useState('')
  const [response, setResponse] = useState('')
  const askGpt = async () => {
    console.log(propmtVal);
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
  }

  return (
    <div className='m-3'>
      <Input className="mb-7" placeholder="Ask Looker GPT" onChange={(e) => setPropmt(e.target.value)} />
      <Button onClick={askGpt}>Proceed</Button>
      {response && <p className="bg-red-200 rounded-m p-2 m-1">
        {response}</p>}
    </div>
  );
}
