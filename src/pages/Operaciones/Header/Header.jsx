import { SelectButton } from 'primereact/selectbutton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useWindowSize from '@shared/hooks/useWindowsSize';

const Header = ({ efectosSelectButton, setEfectosSelectButton, options }) => {
  const windowSize = useWindowSize();

  const optionsTemplate = (option) => {
    return (
      <div data-id={option.name.toLowerCase()} className="button-select">
        <FontAwesomeIcon
          color={efectosSelectButton === option.value ? '#558DD2' : undefined}
          icon={option.icon}
        />
        <span className="label-select-button bolder">{option.name}</span>
      </div>
    );
  };

  return (
    <div className="header-table">
      <h2 className="title-h2">{options[efectosSelectButton - 1].title}</h2>

      <div className="select-buttton-efectos-wrapper">
        <SelectButton
          value={efectosSelectButton}
          optionValue="value"
          options={options}
          onChange={(e) => {
            setEfectosSelectButton(e.value ? e.value : 1);
          }}
          itemTemplate={optionsTemplate}
        />
      </div>
    </div>
  );
};

export default Header;
