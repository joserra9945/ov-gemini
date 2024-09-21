import { IconDefinition } from '@fortawesome/pro-light-svg-icons';

export interface PathItem {
  key: number;
  path: string;
  title: string;
  icon?: IconDefinition;
  ad: boolean;
  children?: PathItem[];
  hasNotification?: boolean;
}
