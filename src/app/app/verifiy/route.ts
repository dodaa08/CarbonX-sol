import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function POST(request: NextRequest) {
    const data = await request.json();

    try{
    const apiKey = process.env.GEMINI_API_KEY || ""
    console.log(apiKey);
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })


        const prompt = `
        Your job is to verify all these details for an ngo and decide it's imapct percentage, what should be the nft price it shoudl be listed on, total carbon offset and carbon offset value for : 
        ${data.body} `

        const result = await model.generateContent(prompt)
        const response = await result.response;
        const output = await response.text();

        return NextResponse.json({ output }, { status: 200 });

    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to verify email" }, { status: 500 });
    }
}