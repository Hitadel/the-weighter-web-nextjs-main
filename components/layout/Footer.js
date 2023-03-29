const Footer = () => {
  return (
    <div className="flex w-full h-[5vh] justify-between items-center bg-button text-white">
      <div className="flex w-[90%] items-center justify-center">©Copyright - Weighter™</div>
      <div className="flex w-[10%] h-full flex-row items-center justify-center">
        <button className="flex w-8 h-8 justify-center items-center bg-menuitem m-2"></button>
        <button className="flex w-8 h-8 justify-center items-center bg-menuitem m-2"></button>
        <button className="flex w-8 h-8 justify-center items-center bg-menuitem m-2"></button>
      </div>
    </div>
  );
};

export default Footer;
