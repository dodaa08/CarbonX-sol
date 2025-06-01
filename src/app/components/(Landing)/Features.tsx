"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { UserPlus, FileCheck, Brain, CoinsIcon } from "lucide-react";

interface FeatureI {
  id?: string;
}

const Features: FC<FeatureI> = ({ id }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="relative bg-black text-white w-full max-w-[1600px] rounded-2xl px-4 py-16 mx-auto" id={id}>
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-white">How CarbonX Works</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          From registration to donation, our platform ensures verified environmental impact through AI-powered verification
        </p>
      </motion.div>

      <div className="flex justify-center">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1400px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Step 1 - Registration */}
          <motion.div 
            className="rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all h-full flex flex-col"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-gray-900/50 p-4 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">1. Register</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Create your profile as an environmental organization. Choose your impact category: Solar, Air, Water, Wind, or Forest.
            </p>
            <ul className="space-y-2 text-gray-400 text-sm mt-auto">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <span>Organization Profile</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <span>Select Impact Category</span>
              </li>
            </ul>
          </motion.div>

          {/* Step 2 - Verification */}
          <motion.div 
            className="rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all h-full flex flex-col"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-gray-900/50 p-4 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <FileCheck className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">2. Verify Impact</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Upload certificates and proof of your environmental impact. Our AI verifies your impact claims.
            </p>
            <ul className="space-y-2 text-gray-400 text-sm mt-auto">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <span>Upload Certificates</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <span>Impact Documentation</span>
              </li>
            </ul>
          </motion.div>

          {/* Step 3 - Project Listing */}
          <motion.div 
            className="rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all h-full flex flex-col"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-gray-900/50 p-4 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">3. List Project</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Our AI analyzes your impact and helps set donation goals based on environmental impact metrics.
            </p>
            <ul className="space-y-2 text-gray-400 text-sm mt-auto">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <span>Impact Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <span>Donation Goals</span>
              </li>
            </ul>
          </motion.div>

          {/* Step 4 - Donations */}
          <motion.div 
            className="rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all h-full flex flex-col"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-gray-900/50 p-4 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <CoinsIcon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">4. Receive Donations</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Donors can support your project and receive an Impact NFT as proof of their contribution.
            </p>
            <ul className="space-y-2 text-gray-400 text-sm mt-auto">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <span>Direct Donations</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <span>Impact NFTs</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Categories Section */}
      <motion.div 
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-8 text-white">Impact Categories</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {['Solar', 'Air', 'Water', 'Wind', 'Forest'].map((category) => (
            <motion.div
              key={category}
              className="px-6 py-2 rounded-full border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
            >
              {category}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
