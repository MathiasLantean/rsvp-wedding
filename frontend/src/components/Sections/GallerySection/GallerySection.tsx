import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import images
import img1 from "../../../assets/gallery/1-2403.jpg";
import img2 from "../../../assets/gallery/1-2408.jpg";
import img3 from "../../../assets/gallery/1-2424.jpg";
import img4 from "../../../assets/gallery/1-2441.jpg";
import img5 from "../../../assets/gallery/1-2475.jpg";
import img6 from "../../../assets/gallery/1-2489.jpg";
import img7 from "../../../assets/gallery/1-2495.jpg";
import img8 from "../../../assets/gallery/1-2498.jpg";
import img9 from "../../../assets/gallery/1-2500.jpg";
import img10 from "../../../assets/gallery/1-2512.jpg";
import img11 from "../../../assets/gallery/1-2513.jpg";
import img12 from "../../../assets/gallery/1-2521.jpg";

const photos = [
    { src: img1, width: 4000, height: 6000 },
    { src: img2, width: 3742, height: 6000 },
    { src: img3, width: 5723, height: 3406 },
    { src: img4, width: 6000, height: 4000 },
    { src: img5, width: 5765, height: 3843 },
    { src: img6, width: 5931, height: 3618 },
    { src: img7, width: 3949, height: 5923 },
    { src: img8, width: 5379, height: 3153 },
    { src: img9, width: 5523, height: 3448 },
    { src: img10, width: 5449, height: 3486 },
    { src: img11, width: 3934, height: 5901 },
    { src: img12, width: 3947, height: 5920 },
];

const GallerySection = () => {
    const [index, setIndex] = useState(-1);

    return (
        <section className="py-20 px-4 bg-stone-50">
            <div className="max-w-6xl mx-auto">
                <PhotoAlbum
                    layout="rows"
                    photos={photos}
                    onClick={({ index }) => setIndex(index)}
                    rowConstraints={{ maxPhotos: 3 }}
                />

                <Lightbox
                    open={index >= 0}
                    index={index}
                    close={() => setIndex(-1)}
                    styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .8)", "backdropFilter": "blur(10px)" } }}
                    slides={photos}
                />
            </div>
        </section>
    );
};

export default GallerySection;
