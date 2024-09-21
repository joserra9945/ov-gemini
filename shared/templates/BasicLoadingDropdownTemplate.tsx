import { Skeleton } from 'primereact/skeleton';
import classNames from 'classnames';

const BasicLoadingDropdownTemplate = (options: any) => {
  const className = classNames('scroll-item ', {
    odd: options.odd,
  });
  return (
    <div className={className} style={{ height: '50px' }}>
      <Skeleton width={options.even ? '60%' : '50%'} height="1.3rem" />
    </div>
  );
};

export default BasicLoadingDropdownTemplate;
