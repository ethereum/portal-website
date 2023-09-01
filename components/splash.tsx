
import { Flex, Box, Text, Heading } from "@chakra-ui/react"
import Image from 'next/image'

const Splash = () => {
    return (
        <>
            <Flex
                className="hero-container"
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={200}
                py={{ base: 10, md: 5 }}
                px={{ base: 10, lg: 10 }}
                mx={50}
                gap={10}
            >

                <Box display="flex" justifyContent="center" alignItems="center" minW={"200px"}>
                    <Image
                        src="/static/EthPortalNetworkLogo.png" alt={"splash image"} width="280" height="100"
                    />
                </Box>

                <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={{ base: 3, md: 10 }}>
                    <Heading as="h1" textAlign={"center"} size='xl' fontWeight={"bold"} fontSize="64">
                        Portal Network
                    </Heading>
                    <br />
                    <Text fontWeight={"bold"} fontSize={{ base: "medium", md: "2xl" }} pt={2} px={5} textAlign={"center"}>
                        Decentralized Ethereum Light Clients
                    </Text>
                </Box>
            </Flex>
        </>
    )
}

export { Splash }