import { Fragment, useState, useEffect, MouseEvent, useMemo } from "react";
// RTK-QUERY
import { useGetTop250MoviesQuery } from "../../store/rtk_query";
// components
import { SimplePagination } from "../../components/SimplePagination";
import { MyTitle } from "../../components/MyTitle";
import { MyLoader } from "../../components/MyLoader";
import { MyFlexContainer } from "../../components/MyFlexContainer";
import { MyMovieCard } from "../../components/MyMovieCard";
import { MyError } from "../../components/MyError/MyError";
// consts
import { END_POINTS, MOVIE_SELECTFIELDS_LIST } from "../../consts/api";
// types
import { I_API_OBJECT, I_MOVIE } from "../../types/types";
// utils
import { observerCB, options } from "../../services/utils";

export const Top250Page = () => {
  const [state, setState] = useState({ page: 1, pages: 0 });

  const {
    data: movies,
    error,
    isLoading,
  } = useGetTop250MoviesQuery({
    endPoint: END_POINTS.movie,
    selectFieldList: MOVIE_SELECTFIELDS_LIST,
    method: "top250",
    page: state.page,
  });

  const Observer = useMemo(
    () => new IntersectionObserver(observerCB, options),
    []
  );

  useEffect(() => {
    if (movies && !state.pages) {
      setState((p) => ({ ...p, pages: movies.pages }));
    }
  }, [movies]);

  useEffect(() => {
    let cardImages = document.querySelectorAll(".cardImage");
    if (cardImages.length)
      cardImages.forEach((cardImage) => Observer.observe(cardImage));
  }, [movies]);

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLButtonElement).closest("#next")) {
      return setState({ ...state, page: state.page + 1 });
    } else if ((e.target as HTMLButtonElement).closest("#prev")) {
      return setState({ ...state, page: state.page - 1 });
    }
    setState({ ...state, page: 1 });
  };

  return (
    <Fragment>
      <MyTitle
        align="center"
        component="h1"
        variant="h4"
        sx={{ textTransform: "capitalize", color: "var(--app-default-color)" }}
      >
        {" "}
        Топ 250 по версии Кинопоиска:{" "}
      </MyTitle>
      <MyLoader color="info" variant="query" loading={isLoading} />
      <MyFlexContainer spacing={4} sx={{ minHeight: "45vh" }}>
        {movies && !error ? (
          <>
            {(movies as I_API_OBJECT<I_MOVIE[]>).data.map((movie) => (
              <MyMovieCard key={movie.id} {...movie} />
            ))}
          </>
        ) : (
          <MyError> {error as string} </MyError>
        )}
      </MyFlexContainer>
      <SimplePagination
        page={state.page}
        pages={state.pages}
        clickHandler={clickHandler}
      />
    </Fragment>
  );
};
