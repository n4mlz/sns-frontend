import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import PageBackButton from "@/components/elements/pageBackButton";
import { announcements } from "@/constants/announcement";
import { getFormattedDate } from "@/utils/time";

const AnnouncementsPage = () => {
  return (
    <>
      <Box height="30px">
        <PageBackButton />
      </Box>
      <Box>
        <Flex direction="column">
          <Heading as="h2" size="lg" padding="30px" paddingTop="45px">
            過去のお知らせ
          </Heading>
          <Accordion allowToggle>
            {announcements.reverse().map((announcement, index) => (
              <AccordionItem key={index}>
                <Box paddingX="10px" position="relative">
                  <AccordionButton>
                    <Flex flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
                      <Flex flexDirection="column" textAlign="left" gap="4px" paddingY="10px">
                        <Text fontSize="sm" color="gray.500">
                          {getFormattedDate(announcement.createdAt)}
                        </Text>
                        <Heading as="h3" size="md">
                          {announcement.title}
                        </Heading>
                      </Flex>
                      <AccordionIcon />
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel>{announcement.content}</AccordionPanel>
                </Box>
              </AccordionItem>
            ))}
          </Accordion>
        </Flex>
      </Box>
    </>
  );
};

export default AnnouncementsPage;
