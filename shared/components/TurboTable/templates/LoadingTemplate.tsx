import { GenericSkeleton } from '@shared/components/GenericSkeleton';

export const ResponsiveSkeletonTemplate = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between px-4 py-4 border-t border-b">
        <GenericSkeleton className="h-2 bg-gray-400 !w-1/2" />
        <GenericSkeleton className="h-2 bg-gray-400 !w-1/4" />
      </div>
      <div className="px-4 py-2">
        {Array.from({ length: 4 }).map(() => (
          <div className="flex flex-row justify-between mb-2">
            <GenericSkeleton className="h-2 !w-1/4" />
            <GenericSkeleton className="h-2 !w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonTemplate = () => {
  return <GenericSkeleton />;
};

export const LoadingTemplate = (responisve?: boolean) =>
  responisve ? ResponsiveSkeletonTemplate : SkeletonTemplate;
