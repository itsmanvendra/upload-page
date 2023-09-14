import React, {useState, useEffect} from "react";
import UploadedFileOverview from "./UploadedFileOverview";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../Firebase";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

function UploadedFileList({ files, progress }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        setUploadedFiles(files);
    }, [files]);

    // Delete file from storage
    const handleDelete = (file) => {
        deleteObject(ref(storage, `files/${file.name}`)).then(() => {
          setUploadedFiles(uploadedFiles.filter((f) => f.name !== file.name));
          enqueueSnackbar("File deleted successfully", {
            variant: "success",
            autoHideDuration: 1000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
            
          }).catch((error) => {
            enqueueSnackbar("Uh-oh, an error occurred!", {
              variant: "error",
              autoHideDuration: 1000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
            console.log(error)
          });
    }

    return (
      <div className="bg-blue-300 w-full rounded-lg p-2">
        {uploadedFiles.length === 0 ? (
          <div className="flex flex-col justify-center items-center w-full my-4 p-2">
            <p className="text-2xl text-gray-600">No Recents Uploads</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center  w-full my-4 p-2 relative">
            <p className="font-semibold text-lg">Uploaded Files</p>
            {uploadedFiles.map((file, index) => (
              <UploadedFileOverview
                file={file}
                index={index}
                progress={progress}
                key={file.name}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
        <Link
          to="/view-older-uploads"
          className="bg-blue-500 rounded-lg p-2 font-semibold w-1/2 text-white mt-4 flex justify-center items-center gap-2 mx-auto"
        >
          View Older Uploads{" "}
        </Link>
      </div>
    );
};
export default UploadedFileList;
