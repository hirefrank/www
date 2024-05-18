import type {PageData} from "#types";

export const title = "404: Page Not Found";
export const layout = "layouts/root.tsx";
export const url = "/404/";

export default (data: PageData) => {
  return (
    <div className="sm:px-8 mt-16 sm:mt-32">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <h1
              className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark-text-zinc-100">
              Sorry, the page you are looking for could not be found.
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
};
