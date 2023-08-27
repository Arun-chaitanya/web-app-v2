import { ModalProps } from "@templates/modal/modal.types";
import { Feed } from "@organisms/feed-list/feed-list.types";

export interface ModalCreateProps extends Omit<ModalProps, 'children'> {
    setFeedList: (feed: Feed[]) => void;
}