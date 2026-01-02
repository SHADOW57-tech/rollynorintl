import { forwardRef } from "react";

const PageLoader = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0  z-[9999]
                 flex items-center justify-center text-white text-3xl font-bold"
    >
      Loading...
    </div>
  );
});

export default PageLoader;
