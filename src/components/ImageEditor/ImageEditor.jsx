import { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import PropTypes from 'prop-types';

const ImageEditor = ({ uploadedImage }) => {
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef(null);
  
  const getCropData = () => {
    if (cropperRef.current && typeof cropperRef.current.getCroppedCanvas === 'function') {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      if (croppedCanvas) {
        const dataUrl = croppedCanvas.toDataURL();
        setCropData(dataUrl);
      }
    }
  };
        
  console.log(uploadedImage); 

  return (
    <div>
      <div style={{ width: "100%" }}>
        <Cropper
          ref={cropperRef}
          style={{ width: "100%" }}
          zoomTo={1}
          aspectRatio={1}
          src={uploadedImage}
          viewMode={1}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={false}
          data={{ width: '100%' }}
          crop={getCropData}
        />
      </div>
      <div>
        <div
          className="box"
          style={{ width: "50%", float: "right", height: "300px" }}
        >
          <h1>
            <span>Crop</span>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

ImageEditor.propTypes = {
  uploadedImage:PropTypes.node
}

export default ImageEditor;
