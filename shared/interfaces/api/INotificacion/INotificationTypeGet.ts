interface INotificationTypeGet {
  currentPage: number;
  items: string[];
  totalCount: number;
}

type INotificationTypeGetP = Promise<INotificationTypeGet>;

export type { INotificationTypeGet, INotificationTypeGetP };
