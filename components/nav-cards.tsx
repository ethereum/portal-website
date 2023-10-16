import { SimpleGrid, Card, Image, Link, Text } from '@chakra-ui/react'

const NavCards = () => {
    return (
        <SimpleGrid columns={3}>
            <Card align='center'>
                <Image src='/static/BluePortal.png' width={120} />
                <Text align='center'><Link href='overview/background' fontSize={16}><b>Background</b></Link></Text>
            </Card>
            <Card align='center'>
                <Image src='/static/BluePortal.png' width={120} />
                <Text align='center'><Link href='overview/what-is-portal' fontSize={16}><b>What is Portal?</b></Link></Text>
            </Card>
            <Card align='center'>
                <Image src='/static/BluePortal.png' width={120} />
                <Text align='center'><Link href='resources' fontSize={16}><b>Resources</b></Link></Text>
            </Card>
        </SimpleGrid>
    )
}


export { NavCards }

