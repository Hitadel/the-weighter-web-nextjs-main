const CountScreen = ({ ready }) => {
  return (
    <div className="absolute w-[500px] h-[500px] text-[300px] z-10 bg-op rounded-full">
      <label className="flex w-full h-full justify-center items-center opacity-100 text-white">{ready}</label>
    </div>
  );
};

export default CountScreen;
