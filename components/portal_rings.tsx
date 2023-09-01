import { Flex, Box, Text } from '@chakra-ui/react'
import Image from 'next/image'

const PortalRings = () => {
    return (
        <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} pb={5}>
            <Flex wrap={"wrap"} justifyContent={"space-around"} w={"100%"}>
                <Box position="relative" w={{ base: "300px", md: "400px" }} my={50}>
                    <Image
                        src="public/BluePortal.png" alt={"splash image"} width="350" height="100"
                    />
                    <Text
                        position="absolute"
                        textAlign={"center"}
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        fontWeight="light"
                    >
                        The Future is here...
                    </Text>
                </Box>
                <Box position="relative" w={{ base: "300px", md: "400px" }} my={50}>
                    <Image
                        src="public/OrangePortal.png" alt={"splash image"} width="350" height="100"
                    />
                    <Text
                        position="absolute"
                        textAlign={"center"}
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        fontWeight="light"
                    >
                        ...it&apos;s just not evenly distributed
                    </Text>
                </Box>
            </Flex>
        </Flex>
    )
}

export { PortalRings }