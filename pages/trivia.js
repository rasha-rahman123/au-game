import fetch from "isomorphic-unfetch";
import { Box, Flex } from "rebass";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import TimeLeft from "../components/TimeLeft";
import FailCounter from "../components/FailCounter";

const Trivia = ({ inGame, setInGame, fails, setFails }) => {
  // var filtered = question.filter(x => x.difficult === "easy")
  const router = useRouter();
  //   console.log(router);
  const { id, cat } = router.query;
  //   console.log(id,cat)
  const [pntDisplay, setPntDisplay] = useState(false);
  const [questionObject, setQuestionObject] = useState(null);
  const [data, setData] = useState(null);
  const [endGame, setEndGame] = useState(null);
  const [answerObject, setAnswerObject] = useState(null);
  const [score, setScore] = useState(null);
  const handleClick = (e) => {
    e.target.innerText === data.results[0].correct_answer
      ? setScore("Winner! Keep going and save the room!")
      : setScore("Busted!");
    setPntDisplay(true);
    setInGame(false);
    fails !== 3 && setEndGame(false);
  };
  const handleTimeout = () => {
    setTimeout(() => {
      setScore("Busted!");
      setPntDisplay(true);
      setInGame(false);

      inGame && console.log("ay") && window.location.reload();
    }, 15000);
  };
  useEffect(() => {
    score === "Busted!" && setFails(Math.round(parseInt(fails) + 1));
    score === "Busted!"
      ? parseInt(
          typeof window !== "undefined" && localStorage.getItem("fails")
        ) === 3
        ? setEndGame(true)
        : score && window.location.reload()
      : score && window.location.reload();
  }, [score, setScore]);

  useEffect(() => {
    endGame && router.push("/");
  }, [setEndGame]);
  const answers = [];
  const fetchTrivia = () =>
    fetch(
      id
        ? id === "10"
          ? `https://opentdb.com/api.php?amount=20`
          : `https://opentdb.com/api.php?amount=20&category=${id}`
        : `https://opentdb.com/api.php?amount=20`
    )
      .then((r) => r.json())
      .then((data) => {
        setData(data);
        answers.push(data.results[0].correct_answer);
        data.results[0].incorrect_answers.forEach((x) => {
          answers.push(x);
        });
        setQuestionObject(data);
        setAnswerObject(answers);
        TimeLeft();
        setInGame(true);
        if (fails === 3) {
          router.push("/");
        }
        if (fails === null || fails < 0 || fails >= 3) {
          setFails(0);
        }
        // console.log(data);
      });

  useEffect(handleTimeout, []);

  useEffect(() => {
    fetchTrivia();
  }, id);

  return (
    <Box
      onKeyUp={(e) => {
        e.target === 13 && window.location.reload();
      }}
      color={"#F9FBB2"}
      p={100}
    >
      {questionObject ? (
        <>
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            {" "}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: [1.3, 1],
              }}
              transition={{
                duration: 0.3,
                delay: 1,
              }}
            >
              <Box fontWeight="bold" fontSize={"2em"}>
                <span>
                  {score
                    ? score
                    : questionObject.results[0].question
                        .replace(/&amp;/g, "&")
                        .replace(/&lt;/g, "<")
                        .replace(/&Uuml;/g, "Ü")
                        .replace(/&gt;/g, ">")
                        .replace(/&quot;/g, '"')
                        .replace(/&#039;/g, "'")}
                </span>
              </Box>
            </motion.div>
          </Flex>
          <Box
            mt={10}
            display="grid"
            sx={{
              gridTemplateColumns: "50% auto",
              gridTemplateRows: "50% auto",
            }}
          >
            {answerObject && !score ? (
              answerObject
                .sort(() => Math.random() - 0.5)
                .map((x, i) => (
                  <Box
                    maxHeight="100%"
                    p={10}
                    key={x + i}
                    color={"#E9C3C9"}
                    sx={{
                      ":hover": {
                        fontWeight: "800",
                        cursor: "pointer",
                        color: "#EFD3D7",
                      },
                      justifySelf: "center",
                    }}
                    onClick={handleClick}
                    fontSize={"1em"}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 1.2 + `${i}`,
                        duration: 0.5,
                      }}
                    >
                      {x}
                    </motion.div>
                  </Box>
                ))
            ) : (
              <>
                {pntDisplay && <p>{cat} reactor has (gained/lossed) 25%!</p>}
                {score === "Busted!" && (
                  <p>Correct Answer is: {data.results[0].correct_answer}</p>
                )}
              </>
            )}
          </Box>
        </>
      ) : (
        <>{id ? <>Question Is Loading</> : <>Something Went Wrong</>}</>
      )}{" "}
    </Box>
  );
};
export default Trivia;
