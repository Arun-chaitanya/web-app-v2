import { useSelector } from 'react-redux';
import { WebModal } from '@templates/web-modal';
import CategoriesClickable from '@atoms/categories-clickable';
import Card from '@atoms/card';
import Avatar from '@atoms/avatar';
import TextClickableURLs from '@atoms/text-clickable-urls';
import { RootState } from '@store/store';
import { printWhen } from '@core/utils';
import { getFeedList, submitPost, uploadImage } from '../mobile/mobile.service';
import { IdentityReq } from '@core/types';
import { ModalReviewProps } from './modal-review.types';
import css from './modal-review.module.scss';

export const ModalReview: React.FC<ModalReviewProps> = ({
  open,
  onClose,
  imgFile,
  imgUrl,
  text,
  soucialValue,
  setFeedList,
  onDone,
}) => {
  const identity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  async function onSubmit() {
    let imageId: string[] = [];
    if (imgFile) {
      const id = await uploadImage(imgFile).then((resp) => resp.data.id);
      imageId = [id];
    }
    const payload = {
      causes_tags: [soucialValue],
      content: text,
      media: imageId,
    };
    submitPost(payload).then(() => {
      getFeedList({ page: 1 }).then((resp) => {
        setFeedList(resp.items);
        onClose();
        onDone();
      });
    });
  }

  const obj = [
    {
      label: soucialValue,
      value: soucialValue,
    },
  ];

  return (
    <WebModal
      open={open}
      onClose={onClose}
      header="Review Post"
      footerClassName={css.footer}
      buttons={[{ children: 'Post', color: 'blue', onClick: onSubmit, className: css.btn }]}
    >
      <div className={css.main}>
        <div className={css.social}>
          <div className={css.avatar}>
            <Avatar img={avatarImg} type={identity?.type || 'users'} />
            {identity?.meta.name}
          </div>
          <CategoriesClickable list={obj} />
        </div>
        <div className={`${css.text} ${!!imgUrl && css.text__border}`}>
          <TextClickableURLs text={text} />
        </div>
        {printWhen(
          <div className={css.image}>
            <Card>
              <img src={imgUrl} />
            </Card>
          </div>,
          !!imgUrl
        )}
      </div>
    </WebModal>
  );
};
