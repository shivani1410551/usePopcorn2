const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <button type="button" className="bg-indigo-500 ..." disabled>
        <svg
          className="animate-spin h-20 w-40 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
        Processing...
      </button>
    </div>
  );
};

export default Loader;
