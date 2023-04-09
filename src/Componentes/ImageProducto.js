import {React, useState} from "react";

function ImageProducto({src, fallbackSrc, alt}){
    const [imageSrc, setImageSrc] = useState(src);
    const onError = () => {
        setImageSrc(fallbackSrc);
      };

        return (
          <img src={imageSrc} 
                onError={onError} 
                alt={imageSrc === src ? alt : `Imagen desconocida para ${alt}`} 
                className="img-fluid max-width-100"
            />
        );
}

export default ImageProducto;