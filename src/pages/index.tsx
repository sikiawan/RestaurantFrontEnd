import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import React from "react";
import {Select, SelectItem} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import { usePokemonList } from "@/hooks/usePokemonList";

interface HomeProps {
  locale: string;
}

const Home: NextPage<HomeProps> = () => {
  const { t } = useTranslation('dashboard');
  const [isOpen, setIsOpen] = React.useState(false);
  const {items, hasMore, isLoading, onLoadMore} = usePokemonList({fetchDelay: 1500});

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });
  return (
    <div className="px-10">
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">List Of Colors</h1>
        <br />
        <div className="w-40 p-4 mt-2 text-black bg-color-Cyan">
        Cyan = #01c1d2
          {/* <Select
            className=" w-80"
            isLoading={isLoading}
            items={items}
            label="Pick a Pokemon"
            placeholder="Select a Pokemon"
            scrollRef={scrollerRef}
            selectionMode="single"
            onOpenChange={setIsOpen}
          >
            {(item) => (
              <SelectItem key={item.name} className="capitalize">
                {item.name}
              </SelectItem>
            )}
          </Select> */}
        </div>
        <div className="w-40 p-4 mt-2 text-black bg-color-Yellow">
        Yellow = #ffb534
        </div>
        <div className="w-40 p-4 mt-2 bg-color-Red">
        Red = #ff4155
        </div>
        <div className="w-40 p-4 mt-2 bg-color-Green">
        Green = #019706
        </div>
        <div className="w-40 p-4 mt-2 bg-color-Primary">
        Primary = #3471ff
        </div>
        <div className="w-40 p-4 mt-2 bg-color-Gray">
        Gray = #636363
        </div>
        <div className="w-40 p-4 mt-2 text-black bg-color-Light">
        Light = #efefef
        </div>
      </main>
    </div>
  );
};

export default Home;