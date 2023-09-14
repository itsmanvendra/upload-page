import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar } from "notistack";

function ViewOlderUploads() {
    const [olderFiles, setOlderFiles] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    // Download file from storage
    const handleDownload = (file) => {
        getDownloadURL(ref(storage, `files/${file.name}`)).then((url) => {
        window.open(url, "_blank");
        });
    };

    // Delete file from storage
    const handleDelete = (file) => {
        deleteObject(ref(storage, `files/${file.name}`))
        .then(() => {
            setOlderFiles(olderFiles.filter((f) => f.name !== file.name));
            enqueueSnackbar("File deleted successfully", {
            variant: "success",
            autoHideDuration: 1000,
            anchorOrigin: {
                vertical: "top",
                horizontal: "right",
            },
            });
        })
        .catch((error) => {
            enqueueSnackbar("Uh-oh, an error occurred!", {
            variant: "error",
            autoHideDuration: 1000,
            anchorOrigin: {
                vertical: "top",
                horizontal: "right",
            },
            });
            console.log(error);
        });
    };

    useEffect(() => {
        listAll(ref(storage, "files")).then((res) => {
        setOlderFiles(res.items);
        });
    }, []);

    return (
        <div className="flex flex-col justify-center items-center w-full md:w-3/4 mx-auto">
        {olderFiles.length === 0 ? (
            <div className="flex flex-col justify-center items-center w-full my-4 p-2">
            <p className="ont-semibold text-3xl text-white mb-4">
                No files uploaded
            </p>
            </div>
        ) : (
            <div className="flex flex-col justify-center items-center  md:w-3/4 my-4 p-2 relative">
            <p className="font-semibold text-3xl text-white mb-4">
                Uploaded Files
            </p>
            {olderFiles.map((file) => (
                <div
                key={file.name}
                className="flex justify-center items-center mt-4 bg-red-400 rounded-lg p-2 shadow-lg shadow-gray-700/50 w-full gap-2"
                >
                <div className="grow">
                    <p className="md:text-lg md:font-semibold pb-2">{file.name}</p>
                </div>
                <div className=" px-2 py-1  flex gap-4">
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
                </div>
            ))}
            </div>
        )}
        <Link
            className="bg-blue-500 rounded-lg p-2 font-semibold text-white mt-4"
            to="/"
        >
            Upload File
        </Link>
        </div>
    );
}
export default ViewOlderUploads;
