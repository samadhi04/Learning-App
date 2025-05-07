import React, { useState, useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
} from "@chakra-ui/react";

import { FaPhotoVideo } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { GrEmoji } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

import { uploadMediaToCloudinary } from "../../Config/UploadVideoToCloudnary";
import { createReel } from "../../Redux/Reel/Action";
import SpinnerCard from "../Spinner/Spinner";

const CreateReelModal = ({ isOpen, onClose }) => {
  const finalRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);

  const [file, setFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // "", "uploading", "uploaded"

  const [postData, setPostData] = useState({
    video: "",
    caption: "",
    location: "",
  });

  const token = localStorage.getItem("token");

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const isValidType =
      selectedFile.type.startsWith("image/") || selectedFile.type.startsWith("video/");
    if (!isValidType) {
      alert("Please select an image or video file.");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => setVideoPreviewUrl(reader.result);

    setUploadStatus("uploading");
    const uploadedUrl = await uploadMediaToCloudinary(selectedFile);
    setPostData((prev) => ({ ...prev, video: uploadedUrl }));
    setUploadStatus("uploaded");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!token || !postData.video) return;

    dispatch(createReel({ jwt: token, reelData: postData }));
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setFile(null);
    setVideoPreviewUrl(null);
    setUploadStatus("");
    setPostData({ video: "", caption: "", location: "" });
  };

  return (
    <Modal
      size="4xl"
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <div className="flex justify-between items-center px-6 py-3 border-b">
          <ModalHeader className="text-lg font-semibold">Create New Reel</ModalHeader>
          <Button
            onClick={handleSubmit}
            colorScheme="blue"
            size="sm"
            isDisabled={!postData.video || uploadStatus !== "uploaded"}
          >
            Share
          </Button>
        </div>

        <ModalBody className="flex h-[70vh] p-4 gap-4">
          {/* Left: Video Upload Area */}
          <div className="w-1/2 flex flex-col justify-center items-center border-r">
            {uploadStatus === "" && (
              <div className="flex flex-col items-center justify-center h-full">
                <FaPhotoVideo className="text-4xl text-gray-500 mb-4" />
                <p className="text-sm text-gray-600 mb-4">Drag & drop or select a video file</p>
                <label htmlFor="file-upload" className="cursor-pointer text-blue-600 font-medium">
                  Select from computer
                </label>
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*, video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}

            {uploadStatus === "uploading" && <SpinnerCard />}

            {uploadStatus === "uploaded" && videoPreviewUrl && (
              <video
                src={videoPreviewUrl}
                width="100%"
                height="auto"
                controls
                className="rounded shadow-md"
              />
            )}
          </div>

          {/* Right: Caption & Location */}
          <div className="w-1/2 px-4 flex flex-col justify-start">
            <div className="flex items-center mb-4">
              <img
                className="w-8 h-8 rounded-full object-cover mr-3"
                src={
                  user?.reqUser?.image ||
                  "https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_640.jpg"
                }
                alt="User profile"
              />
              <span className="font-medium">{user?.reqUser?.username}</span>
            </div>

            <textarea
              name="caption"
              rows="5"
              placeholder="Write a description..."
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 text-sm mb-2 resize-none"
            />
            <div className="flex justify-between items-center mb-4">
              <GrEmoji className="text-xl" />
              <span className="text-sm text-gray-500">
                {postData.caption.length}/2200
              </span>
            </div>

            <input
              type="text"
              name="location"
              placeholder="Add Location"
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 text-sm mb-2"
            />
            <div className="flex items-center text-sm text-gray-600">
              <GoLocation className="mr-2" />
              Location will appear on the reel
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateReelModal;
