import React, { useState, useEffect } from "react";
import DragDropFile from "../components/DragDropFile";
import UploadedFileList from "../components/UploadedFileList";
import { storage } from "../Firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useSnackbar } from "notistack";

function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileProgress, setFileProgress] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Upload file to storage
  const uploadFile = async (file, index) => {
    const storageRef = ref(storage, `files/${file.name}`);
    uploadBytesResumable(storageRef, file).on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileProgress((prevFileProgress) => {
          const updatedProgress = [...prevFileProgress];
          updatedProgress[index] = progress;
          return updatedProgress;
        });
      },
      (error) => {
        enqueueSnackbar("Uh-oh, an error occurred!", {
          variant: "error",
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        console.log(error);
      },
      () => {
        enqueueSnackbar("Upload Completed", {
          variant: "success",
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    );
  };
  const handleUpload = async () => {
    setUploading(true);

    for (let i = 0; i < selectedFiles.length; i++) {
      await uploadFile(selectedFiles[i], i);
    }

    setUploading(false);
  };

  const listAllFiles = (file) => {
    const itemsArr = [...file];
    setSelectedFiles(itemsArr);
    setFileProgress(new Array(itemsArr.length).fill(0));
  };

  useEffect(() => {
    handleUpload();
  }, [selectedFiles]);


  return (
    <div className="flex flex-col mx-auto my-10 min-h-fit w-full lg:w-1/2 p-10 rounded-xl opacity-100 items-center justify-center bg-white">
      <div>
        <h1 className="text-2xl text-black font-bold">UPLOAD FILES</h1>
      </div>
      <div className=" flex flex-col w-full h-full justify-center items-center">
        <DragDropFile listAllFiles={listAllFiles} />
        <UploadedFileList files={selectedFiles} progress={fileProgress} />
      </div>
    </div>
  );
}
export default FileUpload;
