"use client";

import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useDisclosure,
} from "@chakra-ui/react";
import getCroppedImg from "@hooks/imageCrop/getCroppedImg";

const useImageCrop = (width: number, height: number) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const [inputImage, setInputImage] = useState("");
  const [croppedImage, setCroppedImage] = useState("");

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0];
    setInputImage(window.URL.createObjectURL(fileObject));
    onOpen();
  };

  const cropImage = async () => {
    if (!croppedAreaPixels) return;
    const croppedImage = await getCroppedImg(inputImage, croppedAreaPixels);
    setCroppedImage(croppedImage);
  };

  const modalCropper = (
    <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader margin={1} />
        <ModalCloseButton />
        <ModalBody>
          {/* TODO: モーダルの中にCropperを配置するとなぜかCropperの中の画像がずれる問題を解決する */}
          <Box w={336} h={240} position={"relative"}>
            <Cropper
              image={inputImage}
              crop={crop}
              zoom={zoom}
              aspect={width / height}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Slider
            aria-label="slider-ex-1"
            defaultValue={1}
            value={zoom}
            onChange={setZoom}
            min={0.1}
            max={3}
            step={0.01}
            marginLeft={2}
            marginRight={4}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Button
            onClick={() => {
              onClose();
              cropImage();
            }}
            color="white"
            backgroundColor="blue.400">
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return { onFileChange, modalCropper, croppedImage };
};

export default useImageCrop;
