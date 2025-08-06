import { Loader } from "@/components/progress";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Typewriter } from "react-simple-typewriter";

export const GeneratingLoader = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white/70 flex items-center justify-center z-50">
      <Loader
        customLoader={
          <>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-40 h-40"
            >
              <DotLottieReact
                src={"./lotties/AI_loading.lottie"}
                loop
                autoplay
              />
            </motion.div>
          </>
        }
        className="bg-[#ffffffe0] rounded-md"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm italic bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          <Typewriter
            words={[
              "Your knowledge base is on the way...💫💫",
              "Our system is working on it...🧠",
            ]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={1000}
          />
        </motion.p>
      </Loader>
    </div>
  );
};
