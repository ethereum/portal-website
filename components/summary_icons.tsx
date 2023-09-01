import { faHouseChimney, faLaptop, faRocket } from "@fortawesome/free-solid-svg-icons"
import { Flex, Card, CardHeader, Heading, VStack, } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"


const SummaryCard = ({ title, description, icon }: { title: string; description: string; icon: IconDefinition }) => {
    return (
        <Card borderRadius={200} px={10}>
            <CardHeader>
                <VStack gap={50}>
                    <FontAwesomeIcon icon={icon} size={"2x"} />
                    <Heading size="xl" fontWeight="bold">{title}</Heading>
                </VStack>
            </CardHeader>
        </Card>
    )
}


const SummaryIcons = () => {
    return (

        <Flex gap={150} py={10} wrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
            <SummaryCard
                title={"Fast syncing"}
                description={"View a summary of all your clients over the last month."}
                icon={faRocket}
            />
            <SummaryCard
                title={"Basic hardware"}
                description={"View a summary of all your clients over the last month."}
                icon={faLaptop}
            />
            <SummaryCard
                title={"Residential internet"}
                description={"View a summary of all your clients over the last month."}
                icon={faHouseChimney}
            />
        </Flex>

    )
}

export { SummaryIcons }