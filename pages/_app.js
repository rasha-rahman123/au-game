import "../styles/globals.css";
import { motion } from "framer-motion";
import { Box } from "rebass";
import TimeLeft from "../components/TimeLeft";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FailCounter from "../components/FailCounter";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathName = router.pathname;
  const [inGame, setInGame] = useState(null);
  const [fails, changeFail] = useState(null);

  const setFails = (fails) => {
    changeFail(fails);
    if (typeof window !== "undefined") {
      localStorage.setItem("fails", fails);
    }
  };
  useEffect(() => {
    pathName === "/trivia"
      ? console.log("in triv")
      : typeof window !== "undefined" && localStorage.setItem("fails", 0);
  }, [pathName]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      {pathName === "/trivia" && !!inGame && <TimeLeft />}
      {pathName === "/trivia" && <FailCounter fails={fails} />}
      <Component
        setInGame={setInGame}
        inGame={inGame}
        setFails={setFails}
        fails={typeof window !== "undefined" && localStorage.getItem("fails")}
        {...pageProps}
      />
    </motion.div>
  );
}

export default MyApp;
