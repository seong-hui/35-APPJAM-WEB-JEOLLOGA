import errorImage from '@assets/images/img_gray_light_leaf_medium.png';
import InfoSection from '@components/card/templeStayCard/InfoSection';
import FlowerIcon from '@components/common/icon/flowerIcon/FlowerIcon';
import { useState } from 'react';

import * as styles from './templeStayCard.css';

interface TempleStayCardProps {
  templestayId: number;
  templeName: string;
  templestayName: string;
  tag: string;
  region: string;
  type: string;
  imgUrl?: string;
  liked: boolean;
  layout: 'vertical' | 'horizontal';
  onToggleWishlist: (templestayId: number, liked: boolean) => void;
  onClick?: (templestayId: number) => void;
  onRequireLogin?: () => void;
}

const TempleStayCard = ({
  templestayId,
  templeName,
  templestayName,
  tag,
  region,
  type,
  imgUrl,
  liked,
  layout,
  onToggleWishlist,
  onClick,
  onRequireLogin,
}: TempleStayCardProps) => {
  const [isWished, setIsWished] = useState(liked);
  const isHorizontal = layout === 'horizontal';

  const onClickWishBtn = (e: React.MouseEvent) => {
    e.stopPropagation();

    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      onRequireLogin?.();
      return;
    }

    setIsWished((prev) => !prev);
    onToggleWishlist(templestayId, isWished);
  };

  return (
    <article
      className={isHorizontal ? styles.horizontalContainer : styles.verticalContainer}
      onClick={() => onClick?.(templestayId)}
      role="presentation">
      {imgUrl ? (
        <section className={isHorizontal ? styles.horizontalImgSection : styles.verticalImgSection}>
          <img
            className={isHorizontal ? styles.horizontalImage : styles.verticalImage}
            src={imgUrl}
            alt={templeName + ' 대표사진'}
          />
          <button className={styles.wishBtn} onClick={onClickWishBtn}>
            <FlowerIcon isActive={isWished} />
          </button>
        </section>
      ) : (
        <div
          className={
            isHorizontal ? styles.horizontalEmptyImgSection : styles.verticalEmptyImgSection
          }>
          <img src={errorImage} alt="빈이미지"></img>
        </div>
      )}

      <InfoSection
        templeName={templeName}
        templestayName={templestayName}
        tag={tag}
        region={region}
        type={type}
      />
    </article>
  );
};

export default TempleStayCard;
