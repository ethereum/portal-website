
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
                mx={100}
                gap={10}
            >

                <Box display="flex" justifyContent="center" alignItems="center" minW={"200px"}>
                    <Image
                        src="/../public/logos/EthPortalNetworkLogo.png" alt={"splash image"} width="200" height="100"
                    />
                </Box>

                <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={{ base: 3, md: 10 }}>
                    <Heading as="h1" textAlign={"center"} size='xl' fontWeight={"bold"} fontSize="32">
                        Ethereum Portal Network
                    </Heading>
                    <Text fontWeight={"bold"} fontSize={{ base: "medium", md: "1xl" }} pt={2} px={5} textAlign={"center"}>
                        A Research and Development Project for Decentralized Ethereum Light Clients
                    </Text>
                </Box>
            </Flex>
        </>
    )
}

export { Splash }