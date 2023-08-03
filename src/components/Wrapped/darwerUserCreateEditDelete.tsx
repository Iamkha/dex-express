import "../styles/style.scss";

interface IProps {
  children?: JSX.Element;
  open?: boolean;
  setOpen?: any;
  classCSS?: string;
  setMessageError?: any;
}

const WrappedDarwerUserUserCreateEditDelete: React.FC<IProps> = ({
  children,
  open,
  setOpen,
  classCSS,
  setMessageError,
}) => {
  const handleClick = () => {
    setOpen(false);
    if (typeof setMessageError === "function") {
      setMessageError("");
    }
  };

  return (
    <>
      {open && (
        <div
          style={{ zIndex: 100000000000000 }}
          className={`fixed ${classCSS} !z-[1000000000000000000000000] top-0 right-0 `}
        >
          <div
            className={`relative  !z-50 bg-bg-rgba(0,0,0,.1) h-screen flex justify-center w-screen `}
          >
            <div className=" top-[20px] wrapper-ced rounded-[5px]  absolute  z-30 bg-white ">
              {children}
            </div>
            <div
              onClick={handleClick}
              className="w-full absolute  wrapper flex justify-center h-full "
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default WrappedDarwerUserUserCreateEditDelete;
