import React, { Fragment } from "react";
import { Slot } from "expo-router";
import ModalProvider from "@/providers/modal-provider";
import SongPlayerModal from "@/components/modals/song-player-modal";
import { ModalPortal } from "react-native-modals";
const Layout = () => {
  return (
    <Fragment>
      {/* <ModalPortal> */}
      <ModalProvider>
        <Slot />
        <SongPlayerModal />
      </ModalProvider>
      {/* </ModalPortal> */}
    </Fragment>
  );
};

export default Layout;
