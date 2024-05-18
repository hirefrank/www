import {formatDate} from "#utils";
import type {PageData} from "#types";

export const layout = "layouts/root.tsx";

export default (
  params: PageData,
) => {
  const {
    comp,
    header,
    headerChild,
    children
  } = params;

  return (
    <div className="sm:px-8 mt-16 lg:mt-32">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <div className="xl:relative">
              <comp.cards.intro intro={header}/>

              {headerChild}

              <div className="mt-16 sm:mt-20">
                {children}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
