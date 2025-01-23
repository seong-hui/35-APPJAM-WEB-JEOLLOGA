import { useGetTempleImages } from '@apis/templeInfo';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import useCarousel from '@hooks/useCarousel';
import registDragEvent from '@utils/registDragEvent';
import { useParams } from 'react-router-dom';

import * as styles from './detailCarousel.css';
import ImageItem from './DetailImage';

const DetailCarousel = () => {
  const { templestayId } = useParams();
  const { data, isLoading, isError } = useGetTempleImages(String(templestayId));

  const { carouselRef, transformStyle, handleDragChange, handleDragEnd } = useCarousel({
    itemCount: data?.total || 0,
    moveDistance: 355,
  });

  if (isLoading) {
    return <ExceptLayout type="loading" />;
  }

  if (isError) {
    return <ExceptLayout type="networkError" />;
  }

  if (!data) {
    return <p>No user information available</p>;
  }

  return (
    <section ref={carouselRef} className={styles.imageWrapper}>
      <div
        className={styles.imageContainer}
        style={transformStyle}
        {...registDragEvent({
          onDragChange: handleDragChange,
          onDragEnd: handleDragEnd,
        })}>
        {data.templestayImgs.map((image, index) => (
          <ImageItem
            key={image.imageUrlId}
            id={image.imageUrlId}
            imgUrl={image.imgUrl}
            currentNum={index + 1}
            totalNum={data.total}
          />
        ))}
      </div>
    </section>
  );
};

export default DetailCarousel;
