
import { Flex, Box, Text, Heading } from "@chakra-ui/react"
import Image from 'next/image'

const Splash = () => {
    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" minW={"200px"}>
                <Image
                    src="/static/EthPortalNetworkLogo.png" alt={"splash image"} width="220" height="100"
                />
            </Box>

            <Box flex={1} display="flex" flexDirection="column" marginTop={50} justifyContent="center" alignItems="center" gap={{ base: 3, md: 10 }}>
                <Heading as="h1" textAlign={"center"} size='xl' fontWeight={"bold"} fontSize="60">
                    Portal Network
                </Heading>
                <br />
                <Text fontWeight={"bold"} fontSize={24} textAlign={"center"}>
                    Decentralized Ethereum Light Clients
                </Text>
            </Box>
        </>
    )
}

export { Splash }