import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const LazyLoadImageHOC = ({ img, s, d }) => {
    return <LazyLoadImage effect="opacity" src={img} threshold={250} delayMethod='false' alt="Post img" wrapperClassName={s}
        afterLoad={() => d(false)} onError={i => i.target.style.display = 'none'} />
}

export default LazyLoadImageHOC;