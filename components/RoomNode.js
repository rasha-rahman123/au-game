import { Box, Flex } from 'rebass'
import { Label } from '@rebass/forms'

const RoomNode = (room,roomColor, size) => {
    return (
        <Box as={'form'}>
        <Label width={size * 2} height={size * 2} justifyContent="center" textAlign="center" bg={{roomColor}} sx={{
          borderRadius: 99999999,
          ":hover": {
            cursor: 'pointer'
          }
        }}>
         <Flex justifyContent="center" alignItems="center" sx= {{
           textAlign: "center"
         }}>
       
        <Box as={'h5'} fontSize={size / 120 + 'rem'}>{room}</Box>
         </Flex>
       
        </Label>
      </Box>
    )
}


export default RoomNode;