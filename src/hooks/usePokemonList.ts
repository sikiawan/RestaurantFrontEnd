import React from "react";
import axios from "axios";

export type Pokemon = {
  name: string;
  url: string;
};

export type UsePokemonListProps = {
  /** Delay to wait before fetching more items */
  fetchDelay?: number;
};

export function usePokemonList({ fetchDelay = 0 }: UsePokemonListProps = {}) {
  const [items, setItems] = React.useState<Pokemon[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const limit = 10;

  const loadPokemon = async (currentOffset: number) => {
    const source = axios.CancelToken.source();

    try {
      setIsLoading(true);

      if (offset > 0) {
        // Delay to simulate network latency
        await new Promise((resolve) => setTimeout(resolve, fetchDelay));
      }

      const res = await axios.get(`https://localhost:7160/api/Restaurant/GetRestaurants`, {
        params: { offset: currentOffset, limit },
        cancelToken: source.token,
      });
      debugger;
      setHasMore(res.data.length === limit);
      setItems((prevItems) => [...prevItems, ...res.data]);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled");
      } else {
        console.error("There was an error with the fetch operation:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadPokemon(offset);
    return () => {
      // Cleanup if component unmounts
      setOffset(0);
      setItems([]);
    };
  }, []);

  const onLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    loadPokemon(newOffset);
  };

  return {
    items,
    hasMore,
    isLoading,
    onLoadMore,
  };
}
