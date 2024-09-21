import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Accordion as PrimeAccordion,
  AccordionTab,
} from 'primereact/accordion';
import { PrimeReactProvider } from 'primereact/api';
import { CSSTransitionProps } from 'primereact/csstransition';
import { nanoid } from 'nanoid';

import { AutoCompletePassThrough } from '@shared/styles/primereact/passThrough';
import {
  AccordionPassThrough,
  AccordionTabPassThrough,
} from '@shared/styles/primereact/passThrough/AccordionPT';

interface ILibraryParams {
  initialStep?: number;
  wrapperClassName?: string;
  contentClassName?: string;
  options: OptionsAccordion[];
}
export interface OptionsAccordion {
  title?: JSX.Element;
  body: JSX.Element;
  isActive?: boolean;
}
const GenericAccordion: FC<ILibraryParams> = ({
  initialStep = 0,
  wrapperClassName = '',
  contentClassName = '',
  options,
}) => {
  const [activeIndex, setActiveIndex] = useState<null | number | number[]>(
    initialStep
  );

  const isMultiple = useMemo(() => {
    let activeCount = 0;
    for (const item of options) {
      if (item.isActive) {
        activeCount += 1;
      }
      if (activeCount > 1) {
        return true;
      }
    }
    return false;
  }, [options]);

  const updateActiveIndex = useCallback(() => {
    const activeIndices = options
      .map((option, index) => (option.isActive ? index : null))
      .filter((index) => index !== null) as number[];

    if (activeIndices.length === 0) {
      setActiveIndex(0);
    } else {
      setActiveIndex(
        activeIndices.length > 1 ? activeIndices : activeIndices[0]
      );
    }
  }, [options]);

  useEffect(() => {
    updateActiveIndex();
  }, [updateActiveIndex]);

  return (
    <PrimeReactProvider
      value={{
        unstyled: true,

        pt: {
          accordion: AccordionPassThrough,
          autocomplete: AutoCompletePassThrough,
          // TODO: CODIGO COMENTADO PORQUE NO FUNCIONA BIEN, SI LE PASAMOS EL PT AL PROVIDER, SI LO PASAMOS DIRECTAMENTE AL COMPONENTE ES OK!!
          // accordiontab: AccordionTabPassThrough,
        },
      }}
    >
      <div className={wrapperClassName}>
        <PrimeAccordion
          multiple={isMultiple}
          activeIndex={activeIndex}
          transitionOptions={{ disabled: true } as CSSTransitionProps}
        >
          {options.map((option: OptionsAccordion) => (
            <AccordionTab
              contentClassName={contentClassName}
              pt={AccordionTabPassThrough}
              headerTemplate={option.title}
              key={nanoid()}
            >
              {option.body}
            </AccordionTab>
          ))}
        </PrimeAccordion>
      </div>
    </PrimeReactProvider>
  );
};

export default GenericAccordion;
