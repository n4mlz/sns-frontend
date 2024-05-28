"use client";

import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  Box,
  Button,
  Center,
  Heading,
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
import getCroppedImgBlob from "@hooks/imageCrop/getCroppedImg";

const useImageCrop = (width: number, height: number) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const [inputImage, setInputImage] = useState("");
  const [croppedImageBlob, setCroppedImageBlob] = useState<Blob>();
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");

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
    const croppedImageBlob = await getCroppedImgBlob(inputImage, croppedAreaPixels, width, height);
    setCroppedImageBlob(croppedImageBlob);
    setCroppedImageUrl(URL.createObjectURL(croppedImageBlob));
  };

  const modalCropper = (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md", lg: "lg" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader margin={1}>
          <Heading size="md">画像をトリミング</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* TODO: モーダルの中にCropperを配置するとなぜかCropperの中の画像がずれる問題を解決する */}
          <Center>
            <Box w={{ base: 336, md: 400, lg: 464 }} h={{ base: 240, md: 286, lg: 331 }} position={"relative"}>
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
          </Center>
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
            backgroundColor="primary.300">
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return { onFileChange, modalCropper, croppedImageBlob, croppedImageUrl };
};

export default useImageCrop;
