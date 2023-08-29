import { MessageType } from '@atoms/message';
import { CSSProperties } from 'react';

export interface ChatListProps extends CSSProperties {
  list: MessageType[];
  loadMore?: (p: number) => void;
  hasMore?: boolean;
}
