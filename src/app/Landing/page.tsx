import Header from "../components/(Landing)/Header";
import Content from "../components/(Landing)/Content";
import Features from "../components/(Landing)/Features";
import  Footer  from "../components/(Landing)/Footer";
import { Github } from "lucide-react";


const Landing = ()=>{
  return (
    <>
    <div className="flex flex-col bg-black  h-full">
       <div className="flex justify-center items-center gap-4 mt-8 mr-2 mt-10">
          <a 
            href="https://www.loom.com/share/e403483408204d4b99d5e6139174b254?sid=ce6c86e9-1cd3-406f-8bb3-4557601cdde9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-gray-600 rounded-xl px-4 py-1  transition-colors flex items-center gap-2"
          >
            <span className="text-xl font-sans">Demo Video</span>
          </a>
          <a 
            href="https://github.com/0xEgao/CarbonX" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-gray-600 rounded-xl px-4 py-1 hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Github className="w-5 h-5" />
            <span className="text-xl font-sans">GitHub</span>
          </a>
        </div>




        {/* <div className="py-5 flex justify-center">
          <Header />
        </div> */}
        <div className="py-20">
          <Content />
        </div>

        <div className="py-20">
          <Features id="features" />
        </div>

        <div className="flex justify-center items-center gap-4 mt-16 mb-8">
        <div className="border border-gray-700 rounded-xl px-8 py-6 bg-black/70 flex flex-col items-center w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Ready to make an impact?</h2>
          <p className="text-gray-300 text-center mb-4">Join our community or explore NFTs now and be part of the change for a greener planet.</p>
          <div className="flex gap-4 mt-2">
            <a 
              href="/register" 
              className="border border-green-600 rounded-lg px-5 py-2 text-green-400 hover:bg-green-900/30 transition-colors font-semibold"
            >
              Enroll Your Org
            </a>
            <a 
              href="/marketplace" 
              className="border border-purple-600 rounded-lg px-5 py-2 text-purple-400 hover:bg-purple-900/30 transition-colors font-semibold"
            >
              Explore NFTs
            </a>
          </div>
        </div>
      </div>

        <div>
          <Footer />
        </div>
    </div>
    </>
  )
}

export default Landing;

