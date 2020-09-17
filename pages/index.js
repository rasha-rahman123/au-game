import Head from "next/head";
import { Box, Flex } from "rebass";
import { Label } from "@rebass/forms";
import styles from "../styles/Home.module.css";
import RoomNode from "../components/RoomNode";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const rooms = [
    {
      roomName: "mythology",
      catNum: 20,
      roomColor: "#cbc0d3",
      size: 70,
    },
    {
      roomName: "film",
      catNum: 11,
      roomColor: "#EFD3D7",
      size: 70,
    },
    {
      roomName: "main",
      catNum: 10,
      roomColor: "#F9FBB2",
      size: 100,
    },
    {
      roomName: "animals",
      catNum: 27,
      roomColor: "#FEEAFA",
      size: 70,
    },
    {
      roomName: "music",
      catNum: 12,
      roomColor: "#E9C3C9",
      size: 70,
    },
  ];

  const constraintsRef = useRef(null);

  return (
    <Box className={styles.container}>
      <Flex>
        <Box width={"50%"} my={-130} ref={constraintsRef}>
          {rooms.map((x, i) => (
            <motion.div
            key={i}
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                x: x.roomName === "main" ? -20 : i % 2 === 0 ? 200 : -200,
                y:
                  x.roomName === "main"
                    ? 0
                    : i % 2 === 0
                    ? i > 1
                      ? -160
                      : 160
                    : 0,
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 1,
              }}
            >
              <Box      key={i} className={"nodes"} m={20}>
                <motion.div
                  key={i}
                  transition={{
                    duration: 0.9,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: "100%",
                  }}
                  whileHover={{ scale: [1, 1.1, 1] }}
                  exit={{ scale: 1.1 }}
                  drag
                  dragConstraints={constraintsRef}
                  dragTransition={{ bounceStiffness: 1, bounceDamping: 50 }}
                >
                  <Link
                    href={{
                      pathname: "/trivia",
                      query: { cat: x.roomName, id: x.catNum },
                    }}
                    // as={"/"}
                  >
                    <a>{RoomNode(x.roomName, x.roomColor, x.size)}</a>
                  </Link>
                </motion.div>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Flex>
    </Box>
  );
}
