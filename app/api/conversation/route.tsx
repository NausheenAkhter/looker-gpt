import { NextResponse } from 'next/server';
import Configuration, { OpenAI } from 'openai'
// import { ClientOptions } from 'openai/src/index.js';

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
});

export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        const { message = '' } = body
        if (!process.env.OPEN_AI_KEY) {
            return new NextResponse('Key not present', { status: 400 })
        }
        if (!message) {
            return new NextResponse('Message can\'t be empty', { status: 400 })
        }
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0].message.content, 'completion.choices[0].message.contentcompletion.choices[0].message.content');
        return new NextResponse(completion.choices[0].message.content ?? '', { status: 200 })
    } catch (error) {
        console.log('error from looker gpt', error);
        return new NextResponse('Internal error', { status: 500 })
    }
}

