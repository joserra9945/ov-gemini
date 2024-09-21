

export interface HeaderProps {
  /**
   * User loged
   */
  user?: any;

  /**
   * Logo
   */
  img?: string;

  /**
   * LeftBar components
   */
  buttonLeftBar?: Array<React.ReactNode>;

  /**
   * RightBar components
   */
  buttonRightBar?: Array<React.ReactNode>;
}

export const Header: React.FC<HeaderProps> = ({
  img = null,
  buttonRightBar = [],
  buttonLeftBar = [],
}) => (
  <header className="g-header-wrapper">
    <div className="g-header g-header--left">
      {img && <img alt="Logo" src={img} />}
      {buttonLeftBar &&
        buttonLeftBar.map((element) => {
          return element;
        })}
    </div>
    <div className="g-header g-header--right">
      {buttonRightBar &&
        buttonRightBar.map((element) => {
          return element;
        })}
    </div>
  </header>
);
