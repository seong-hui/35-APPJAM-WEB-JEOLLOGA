import useGetTempleDetails from '@apis/templeDetail';
import DetailCarousel from '@components/carousel/detailCarousel/DetailCarousel';
import ButtonBar from '@components/common/button/buttonBar/ButtonBar';
import TapBar from '@components/common/tapBar/TapBar';
import ExceptLayout from '@components/except/exceptLayout/ExceptLayout';
import SmallMap from '@components/templeDetail/naverMap/smallMap/SmallMap';
import StickyTapBar from '@components/templeDetail/stickyTapBar/StickyTapBar';
import TempleDetailInfo from '@components/templeDetail/templeDetailInfo/TempleDetailInfo';
import TempleInfo from '@components/templeDetail/templeInfo/templeInfo';
import TemplePrice from '@components/templeDetail/templePrice/TemplePrice';
import TempleReview from '@components/templeDetail/templeReview/TempleReview';
import TempleSchedule from '@components/templeDetail/templeSchedule/TempleSchedule';
import TempleTitle from '@components/templeDetail/templeTitle/TempleTitle';
import TempleTopbar from '@components/templeDetail/templeTopbar/TempleTopbar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as styles from './templeDetailPage.css';

const TempleDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userId = localStorage.getItem('userId');
  const { templestayId } = useParams();
  const { data, isLoading, isError } = useGetTempleDetails(String(templestayId), String(userId));

  if (isLoading) {
    return <ExceptLayout type="loading" />;
  }

  if (isError) {
    return <ExceptLayout type="networkError" />;
  }

  if (!data) {
    return <p>No user information available</p>;
  }

  const handleBottomButtonClick = () => {
    window.open(data.url, '_blank');
  };

  return (
    <div className={styles.templeDetailWrapper}>
      <div className={styles.headerBox}>
        <TempleTopbar templeName={data.templeName} templestayName={data.templestayName} />
      </div>
      <div className={styles.topDetailContainer}>
        <DetailCarousel />
        <div className={styles.templeTitleBox}>
          <TempleTitle
            tag={data.tag}
            templeName={data.templeName}
            templestayName={data.templestayName}
          />
          <TempleDetailInfo address={data.address} phoneNumber={data.phoneNumber} />
        </div>
        <StickyTapBar>
          <TapBar type="detail" />
        </StickyTapBar>
      </div>
      <div className={styles.templeDetailMiddle}>
        <TempleReview />
        <TempleSchedule schedule={data.schedule} />
        <TemplePrice templestayPrice={data.templestayPrice} />
        <TempleInfo introduction={data.introduction} />
      </div>
      <SmallMap
        detailAddress={data.detailAddress}
        latitude={data.latitude}
        longitude={data.longitude}
      />
      <ButtonBar type="wish" label="예약하러 가기" largeBtnClick={handleBottomButtonClick} />
    </div>
  );
};

export default TempleDetailPage;
