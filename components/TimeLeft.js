import {motion} from 'framer-motion'
import {Box} from 'rebass'
const TimeLeft = () => {
    return (
        <motion.div
        initial=
        {{
          width: "100vw",
          backgroundColor: 'limegreen'
         }}
        animate=
         {{
           width: "0vw"
          }}
         transition={{
             delay: 1,
             duration: 10
         }} 
        >
            <Box height={10} position={'absolute'} sx={{
                top: 0,
                left: 0
            }}>

            </Box>
        </motion.div>
    )
}

export default TimeLeft;