import { nanoid } from 'nanoid';

import { Item } from './Item';

interface IProps<T> {
  data: T[];
  itemTemplate: (data: T) => JSX.Element;
  className?: string;
}

const GenericListItems = <T,>({ data, itemTemplate, className }: IProps<T>) => {
  return (
    <div className={className ?? 'flex flex-col gap-4 mt-4'}>
      {data.map((item) => (
        <Item key={nanoid()} className="w-full">
          {itemTemplate(item)}
        </Item>
      ))}
    </div>
  );
};

export default GenericListItems;
