const Footer = () => {
  return (
    <div className="flex w-full h-[5vh] justify-between items-center bg-button text-white">
      <div className="flex w-[90%] items-center justify-center">©Copyright - Weighter™</div>
      <div className="flex w-[10%] h-full flex-row items-center justify-center">
        <button className="flex items-center justify-center w-8 h-8 m-2 bg-menuitem"></button>
        <button className="flex items-center justify-center w-8 h-8 m-2 bg-menuitem"></button>
        <button className="flex items-center justify-center w-8 h-8 m-2 bg-menuitem"></button>
      </div>
    </div>
  );
};

export default Footer;
