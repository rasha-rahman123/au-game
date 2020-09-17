import { Box, Flex } from "rebass";

const FailCounter = ({ fails }) => {
  return (
    <Box
      color={
        typeof window !== "undefined" && localStorage.getItem("fails") > 2
          ? "red"
          : typeof window !== "undefined" && localStorage.getItem("fails") > 1
          ? "orange"
          : typeof window !== "undefined" && localStorage.getItem("fails") > 0
          ? "yellow"
          : "white"
      }
      display="grid"
      sx={{
        gridTemplateColumns: "25% 25% 25% 25%",
        bottom: 10,
        left: 10,
        position: "fixed",
      }}
    >
      <Box
        px={10}
        as={"h4"}
        sx={{
          justifySelf: "left",
        }}
      >
        {" "}
        Attempts Left:
      </Box>
      <Box
        as={"h3"}
        sx={{
          justifySelf: "center",
        }}
      >
        {" "}
        {typeof window !== "undefined" &&
          Math.round(3 - localStorage.getItem("fails"))}{" "}
        / 3
      </Box>
      <Box
        px={10}
        as={"h4"}
        sx={{
          justifySelf: "left",
        }}
      >
        {" "}
        {typeof window !== "undefined" && localStorage.getItem("fails") > 2 ? (
          <>Reactor Broke!</>
        ) : (
          <>Reactor Percentage:</>
        )}
      </Box>
      <Box
        as={"h3"}
        sx={{
          justifySelf: "center",
        }}
      >
        {" "}
        {typeof window !== "undefined" && localStorage.getItem("fails") > 2 ? (
          <>Room Disabled</>
        ) : (
          <>100%</>
        )}
      </Box>
    </Box>
  );
};

export default FailCounter;
