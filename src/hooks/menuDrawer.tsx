"use client";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import useMenu from "@hooks/menu";

const useMenuDrawer = () => {
  const disclosure = useDisclosure();
  const { postModal, signOutDialog, mainMenu, subMenu } = useMenu({
    postModalOpenCallback: disclosure.onClose,
    signOutDialogOpenCallback: disclosure.onClose,
    onMenuClose: disclosure.onClose,
  });

  const menuDrawerOnOpen = () => {
    disclosure.onOpen();
  };

  const menuDrawer = (
    <>
      {postModal.postModal}
      {signOutDialog.signOutDialog}
      <Drawer isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Heading as="h2" size="md">
              メニュー
            </Heading>
          </DrawerHeader>
          <DrawerBody>{mainMenu}</DrawerBody>
          <DrawerFooter>{subMenu}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );

  return { menuDrawer, ...disclosure, onOpen: menuDrawerOnOpen };
};

export default useMenuDrawer;
