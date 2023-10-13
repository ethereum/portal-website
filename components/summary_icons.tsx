import { faHouseChimney, faLaptop, faRocket } from "@fortawesome/free-solid-svg-icons"
import { Flex, Card, CardHeader, Heading, VStack, } from "@chakra-ui/react"
import { Home, Laptop, Rocket } from "lucide-react";

const SummaryCard = ({ title, description, icon }: { title: string; description: string; icon: any }) => {
    return (
        <Card borderRadius={200} px={10}>
            <CardHeader>
                <VStack gap={24}>
                    {icon}
                    <Heading size="xl" fontWeight="bold">{title}</Heading>
                </VStack>
            </CardHeader>
        </Card>
    )
}


const SummaryIcons = () => {
    return (

        <Flex gap={150} py={24} wrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
            <SummaryCard
                title={"Fast syncing"}
                description={"View a summary of all your clients over the last month."}
                icon={<Rocket size={96} />}
            />
            <SummaryCard
                title={"Basic hardware"}
                description={"View a summary of all your clients over the last month."}
                icon={<Laptop size={96} />}
            />
            <SummaryCard
                title={"Residential internet"}
                description={"View a summary of all your clients over the last month."}
                icon={<Home size={96} />}
            />
        </Flex>

    )
}

export { SummaryIcons }