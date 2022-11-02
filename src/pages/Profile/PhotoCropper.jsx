import { useRef, useState, useCallback } from 'react';
import { db, upload } from '../../components/firebase'
import Cropper from 'react-easy-crop'
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../../components/contexts/AuthContext'
import getCroppedImg from './cropImage';

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

export default function PhotoCropper(props) {
    console.log('rerendered')
    const { user } = useAuth()
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    
    const [photo, setPhoto] = useState()
    const fileSelectRef = useRef()
    const [loading, setLoading] = useState(false)
    function handleChange(e) {
        if (e.target.files[0]) {
            // setPhoto(e.target.files[0])
            let file = e.target.files[0]
            // console.log('ini file', file)
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.addEventListener("load", ()=>{
                // setFile(reader.result)
                setPhoto(reader.result)
            })
        }
    }
    
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
      }, [])

    async function handleSubmit() {
        const foto = await getCroppedImg(
            photo,
            croppedAreaPixels,
            0
        )
        setPhoto(foto)
        upload(dataURLtoFile(foto, 'a.png'), user, props.setUserInfo, setLoading)
        props.setShow(false)
    }
     
    return (
        <Modal
            show={props.show}
            onHide={() => props.setShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Profile Picture Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{height: 500}}>
            {!photo?<input type='file' ref={fileSelectRef} key={1} onChange={(e) => handleChange(e)}></input>:null}
            {photo?<Cropper
                image={photo}
                crop={crop}
                zoom={zoom}
                cropShape="round"
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
            />:null}
            </Modal.Body>
            <Modal.Footer>
                <input disabled={loading || !photo} type='submit' onClick={handleSubmit} value='Set as Profile Picture'></input>
            </Modal.Footer>
        </Modal>
    )
}