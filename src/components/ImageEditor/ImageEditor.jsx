import { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import PropTypes from 'prop-types';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import './ImageEditor.scss';

const ImageEditor = ({ uploadedImage, closeModal, setCroppedImage }) => {
    const cropperRef = useRef(null);

    const getCropData = () => {
        if (cropperRef.current) {
            const cropper = cropperRef.current.cropper;
            if (cropper && cropper.getCroppedCanvas) {
                const croppedCanvas = cropper.getCroppedCanvas();
                if (croppedCanvas) {
                    const dataUrl = croppedCanvas.toDataURL();
                    setCroppedImage(dataUrl);
                    closeModal();
                }
            }
        }
    };

    return (
        <Modal closeFn={closeModal}>
            <h2 >이미지 자르기</h2>
            <Modal.Body>
                <div className='cropContainer'>
                    <Cropper
                        ref={cropperRef}
                        style={{ width: '100%' }}
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
                    />
                </div>
            </Modal.Body>
            <Modal.Button>
                <Button type="button" label="자르기" variant="active" onClick={getCropData} />
            </Modal.Button>
        </Modal>
    );
};

ImageEditor.propTypes = {
    uploadedImage: PropTypes.node,
    closeModal: PropTypes.func.isRequired,
    setCroppedImage: PropTypes.func.isRequired
};

export default ImageEditor;
