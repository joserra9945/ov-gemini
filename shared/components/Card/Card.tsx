import { FC } from 'react';
import { Skeleton } from 'primereact/skeleton';
import { nanoid } from 'nanoid';

interface ICardProps {
  title: string;
  data: {
    name: string;
    value: number | string;
  }[];
  isLoading?: boolean;
  maxSkeletons?: number;
}

const Card: FC<ICardProps> = ({ title, data, isLoading, maxSkeletons = 4 }) => {
  const renderSkeleton = () => {
    const response: JSX.Element[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < maxSkeletons; i++) {
      response.push(
        <div className="flex flex-col items-center border-b-2 border-gray-200 p-4 last:border-none justify-center">
          <Skeleton width="6rem" borderRadius="8px" className="mb-2 mt-2" />
          <Skeleton width="10rem" borderRadius="8px" />
        </div>
      );
    }
    return response;
  };

  return (
    <div className="flex-col bg-white rounded-lg min-w-52 shadow-md pb-2">
      <h1 className="text-primary text-lg uppercase font-bold whitespace-nowrap p-5">
        {title}
      </h1>
      <div className="flex flex-col gap-3">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={`${item.value}-${nanoid()}`}
              className="flex-col items-center border-b-2 border-gray-200 pb-2 last:border-none"
            >
              <div className="flex justify-center  w-full items-center">
                {item.name}
              </div>
              <div className="flex justify-center w-full items-center">
                {isLoading ? (
                  <Skeleton width="10rem" borderRadius="8px" />
                ) : (
                  <span className="text-xl font-bold">{item.value}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col">{renderSkeleton()}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
