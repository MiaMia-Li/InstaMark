const Divider = ({ text }: { text?: string }) => {
  return (
    <div className="relative flex items-center my-6">
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
      {text && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
          <span className="text-blue-500 text-sm font-medium">{text}</span>
        </div>
      )}
    </div>
  );
};

export default Divider;
