import Header from "./Header";
import Content from "./Content";

const ThreeCards = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 bg-gray-900 py-20">
      <Header />
      <div className="bg-black text-white rounded-2xl p-10 w-[300px] relative">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-700 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-700 rounded-full blur-3xl opacity-50"></div>
        <h1 className="text-2xl font-bold mb-5">Track Your Impact</h1>
        <p className="text-sm text-gray-400 mb-8">
          Monitor the environmental impact of your contributions.
        </p>
        <button className="bg-green-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition">
          Learn more
        </button>
      </div>
      <Content />

      {/* Third Card */}
      <div className="bg-black text-white rounded-2xl p-10 w-[300px] relative">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-700 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-700 rounded-full blur-3xl opacity-50"></div>
        <h1 className="text-2xl font-bold mb-5">Earn Rewards</h1>
        <p className="text-sm text-gray-400 mb-8">
          Get rewarded for your contributions to sustainability.
        </p>
        <button className="bg-green-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition">
          Start now
        </button>
      </div>
    </div>
  );
};

export default ThreeCards;