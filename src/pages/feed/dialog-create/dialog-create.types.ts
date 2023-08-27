import { Feed } from "@organisms/feed-list/feed-list.types";

export type DialogCreateProps ={
    onClose: () => void;
    setFeedList: (feed: Feed[]) => void;
}