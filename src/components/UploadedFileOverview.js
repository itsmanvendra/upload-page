import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";

function UploadedFileOverview({ file, progress, index , handleDelete}) {

    // Download file from storage
    const handleDownload = (file) => {
        getDownloadURL(ref(storage, `files/${file.name}`)).then((url) => {
                window.open(url, "_blank");
              })
    };
    

  return (
    <div className="flex justify-center items-center mt-4 bg-red-400 rounded-lg p-2 shadow-lg shadow-gray-700/50 w-full gap-2">
      <div>
        <p className="md:text-lg md:font-semibold pb-2">{file.name}</p>
        <div className="bg-gray-300 h-2 w-full">
          <div
            className="bg-blue-500 h-2"
            style={{ width: `${progress[index]}%` }}
          ></div>
        </div>
        <p className="mt-2 text-center md:text-lg md:font-semibold">
          {progress[index] === 100
            ? "Uploaded"
            : `Upload Progress: ${Math.round(progress[index])}%`}
        </p>
      </div>
      <div
        className="rounded-full px-2 py-1 border-2 cursor-pointer hover:bg-sky-400"
        onClick={() => handleDownload(file)}
      >
        <FontAwesomeIcon icon={faDownload} />
      </div>
      <div
        className="rounded-full px-2 py-1 border-2 cursor-pointer hover:bg-sky-400"
        onClick={() => handleDelete(file)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}
export default UploadedFileOverview;