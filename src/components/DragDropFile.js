import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

function DragDropFile({ listAllFiles }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      let filesArr = [];
      Array.from(e.dataTransfer.files).forEach((file) => {
        filesArr.push(file);
      });
      listAllFiles(filesArr);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);;
      let filesArr = [];
      Array.from(e.target.files).forEach((file) => {
        filesArr.push(file);
      });
      listAllFiles(filesArr);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <form
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col justify-center items-center  border-2 border-dashed border-gray-600 rounded-lg h-72 w-full lg:w-4/5 my-4 p-2 bg-slate-200 relative"
      >
        <input
          className="hidden"
          ref={inputRef}
          type="file"
          id="input-file-upload"
          multiple={true}
          onChange={handleChange}
        />
        <label
          htmlFor="input-file-upload"
          className={dragActive ? "bg-slate-400 h-72 w-full" : ""}
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <FontAwesomeIcon icon={faCloudArrowUp} size="4x" />
            <h1 className="texl-2xl font-semibold text-black">
              Drag and drop your file here
            </h1>
            <p className="text-sm text-gray-700">OR</p>
            <button
              className="rounded-xl bg-zinc-700 text-white p-2 my-1 font-semibold"
              onClick={onButtonClick}
            >
              Browse File
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            className="absolute top-0 left-0 h-full w-full rounded-lg"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
    </>
  );
}
export default DragDropFile;
