import { CSSProperties } from 'react';

import Avatar from '../avatar';
import ChatBox from '../chat-box';
import css from './message.module.scss';
import { MessageProps } from './message.types';

const Message = (props: MessageProps): JSX.Element => {
  const { text, type, userType, img, ...rest } = props;

  function setStyle(type: MessageProps['type']): CSSProperties {
    switch (type) {
      case 'sender':
        return {
          flexDirection: 'row-reverse',
          alignItems: 'flex-end',
        };
      case 'receiver':
        return {
          flexDirection: 'row',
          alignItems: 'flex-start',
        };
    }
  }

  return (
    <div style={setStyle(type)} className={css.container}>
      <Avatar size="2rem" img={img} type={userType} />
      <ChatBox type={type}>{text}</ChatBox>
    </div>
  );
};

export default Message;
