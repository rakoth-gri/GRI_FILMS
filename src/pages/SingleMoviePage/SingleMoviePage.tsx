import { useEffect, useState, ReactNode } from "react";
import { useParams, useNavigate } from "react-router-dom";
// createAsyncThunks
import { movieByIdThunk } from "../../store/movieThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { cleanUpSingleMovieInfo } from "../../store/movieSlice";
// components:
import {
  Box,
  Button,
  CardMedia,
  styled,
  Typography,
  Divider,
} from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Link } from "react-router-dom";
import { MyTitle } from "../../components/MyTitle";
import { MyLoader } from "../../components/MyLoader";
import { MyTrailer } from "../../components/MyTrailer";
import { MoviePersonsCard } from "../../components/MoviePersonsCard";
import { SimilarMoviesCard } from "../../components/SimilarMoviesCard";
import { LinkButton } from "../../components/LinkButton";
import { SingleMoviePropsList } from "../../components/SingleMoviePropsList";
import { MyLabel } from "../../components/MyLabel";
import { Back } from "../../components/Back";
import { MyFacts } from "../../components/MyFacts";
// consts
import { END_POINTS } from "../../consts/api";
// types
import { RootState } from "../../store/store";
import { I_MOVIE, I_SIMILAR_MOVIES_PROP, E_ROUTES } from "../../types/types";
import { MyFlexContainer } from "../../components/MyFlexContainer";
// utils:
import { movieLengthFormat, getBoxStyles } from "../../services/utils";

const MyTrailerTrigger = styled(Button)(({ theme }) => ({
  textTransform: "uppercase",
  letterSpacing: "0.7px",
  backgroundColor: theme.palette.warning.main,
  borderRadius: "12px",
  color: "white",
}));

const cardMediaStyles = {
  width: "100%",
  objectFit: "cover",
  filter: "grayscale(50%)",
  "&:hover": { filter: "none" },
};

const prepareToRender = <T extends object>(
  l: T[],
  title: string,
  cb: (item: T) => ReactNode
) =>
  l.length ? <SingleMoviePropsList list={l} title={title} cb={cb} /> : null;

export const SingleMoviePage = () => {
  const dispatch = useAppDispatch();
  const [isTrailerModal, setIsTrailerModal] = useState(false);

  const location = useNavigate();

  const { movie, loading } = useAppSelector(
    (s: RootState) => s.movieSliceReducer
  );
  const { movieId } = useParams();

  useEffect(() => {
    movieId &&
      dispatch(
        movieByIdThunk({
          url: `${END_POINTS.movie}/${movieId}`,
          id: 0,
          method: "movieById",
        })
      );
  }, [movieId]);

  useEffect(() => {
    return () => {
      dispatch(cleanUpSingleMovieInfo());
    };
  }, []);

  if (!Object.keys(movie).length) return <MyLoader loading={loading} />;

  const {
    id,
    name,
    enName,
    year,
    type,
    description,
    videos,
    slogan,
    ratingKp,
    ratingImdb,
    ageRating,
    votesKp,
    votesImdb,
    movieLength,
    genres,
    countries,
    persons,
    premiereRussia,
    premiereWorld,
    poster,
    sequelsAndPrequels,
    budget,
    similarMovies,
    feesRussia,
    feesWorld,
    top250,
    facts,
  } = movie as I_MOVIE;

  return (
    <>
      <Back onClick={() => location(-1)}> Назад </Back>
      <MyFlexContainer
        align="start"
        id={`${id}`}
        spacing={1}
        sx={{ m: "1rem" }}
      >
        <Box sx={getBoxStyles({ width: "24%", height: "400px" })}>
          <CardMedia
            component={"img"}
            src={poster}
            title={enName}
            sx={cardMediaStyles}
          />
          <MyLabel sx={{ top: "3%", left: "4%" }}>
            {" "}
            {!!top250 && `ТОП ${top250}`}{" "}
          </MyLabel>
        </Box>
        <Box
          sx={getBoxStyles({
            width: "47%",
            display: "flex",
            justify: "flex-start",
            align: "start",
          })}
        >
          <MyTitle align="left" color="inherit" component="h1" variant="h4">
            {name} ({year})
          </MyTitle>
          <Box
            sx={{
              ...getBoxStyles({ fw: 700, ta: "left" }),
              opacity: "0.84",
            }}
          >
            {" "}
            Рейтинг: {ratingKp}{" "}
          </Box>
          <MyTrailerTrigger
            startIcon={<PlayCircleFilledIcon />}
            onClick={() => setIsTrailerModal(true)}
            variant={"contained"}
          >
            См. Трейлер
          </MyTrailerTrigger>
          <MyTitle variant="h5" component={"h3"} align="left" color="inherit">
            {" "}
            О Фильме:{" "}
          </MyTitle>
          <Box
            sx={getBoxStyles({
              display: "flex",
              direction: "row",
              justify: "space-between",
              mr: "0px",
            })}
          >
            <span className="title">Год производства</span>
            <span className="desc">{year}</span>
            <span className="title"> Страна</span>
            <span className="desc"> {countries.join(", ")}</span>
            <span className="title"> Жанр </span>
            <span className="desc"> {genres.join(", ")}</span>
            <span className="title">Слоган</span>
            <span className="desc">
              {" "}
              <strong>
                {" "}
                <q>{slogan}</q>{" "}
              </strong>
            </span>
            <span className="title">Сборы в России</span>
            <span className="desc"> {feesRussia} </span>
            <span className="title">Сборы в Мире</span>
            <span className="desc"> {feesWorld}</span>
            <span className="title">Премьера в России</span>
            <span className="desc">
              {premiereRussia
                ? new Date(premiereRussia).toLocaleDateString() + " г."
                : "-"}
            </span>
            <span className="title">Премьера в Мире</span>
            <span className="desc">
              {premiereWorld
                ? new Date(premiereWorld).toLocaleDateString() + " г."
                : "-"}
            </span>
            <span className="title">Продолжительность </span>
            <span className="desc"> {movieLengthFormat(movieLength)}</span>
            <span className="title">Возраст </span>
            <span className="desc"> {ageRating}+ </span>
            <span className="title">Рейтинг IMDB </span>
            <span className="desc"> {ratingImdb} </span>
            <span className="title">Бюджет </span>
            <span className="desc"> {budget} </span>
            <span className="title">Тип картины </span>
            <span className="desc"> {type} </span>
          </Box>
        </Box>
        <Box
          sx={{
            ...getBoxStyles({
              width: "24%",
              fs: "0.92em",
              fw: 700,
              pd: "0.5rem",
              display: "flex",
              align: "center",
            }),
            opacity: "0.84",
          }}
        >
          <MyTitle
            variant="subtitle"
            component="h4"
            color="inherit"
            sx={{ m: "0.3rem" }}
          >
            Рейтинг и оценки:
          </MyTitle>
          <span className="rating"> {ratingKp.toFixed(1)} </span>
          <span className="votes"> KP: {votesKp} оценок </span>
          <span className="votes"> IMDB: {votesImdb} оценок </span>          
          <MyTitle
            variant="subtitle"
            component="h4"
            color="inherit"
            sx={{ m: "0.3rem" }}
          >
            В главных ролях:
          </MyTitle>
          <>
            {persons.slice(0, 8).map((p, i) => (
              <Link to={`${E_ROUTES.persons}/${p.id}`} key={p.id}>
                <span className="actors"> {p.name} </span>
              </Link>
            ))}
          </>          
        </Box>
      </MyFlexContainer>
      <Box sx={getBoxStyles({ mr: "0.25rem" })}>
        <MyTitle variant="h5" component={"h3"} align="left" color="inherit">
          Сюжет:
        </MyTitle>
        <Typography
          component={"p"}
          color={"inherit"}
          sx={{
            letterSpacing: "0.7px",
            textAlign: "justify",
            lineHeight: "1.45em",
          }}
        >
          {description}
        </Typography>
      </Box>
      <Divider />
      {prepareToRender(
        similarMovies,
        "Вам также могут понравяться:",
        (movie: I_SIMILAR_MOVIES_PROP) => (
          <SimilarMoviesCard key={movie.id} {...movie} />
        )
      )}
      <Divider />
      {prepareToRender(
        sequelsAndPrequels,
        "Сиквелы и Приквелы:",
        (movie: I_SIMILAR_MOVIES_PROP) => (
          <SimilarMoviesCard key={movie.id} {...movie} />
        )
      )}
      <Divider />
      {prepareToRender(
        persons,
        "Актеры и Создатели:",
        (item: any, i?: number) => (
          <MoviePersonsCard key={i} {...item} />
        )
      )}
      <Divider />
      <Box sx={getBoxStyles({ mr: "0.5rem" })}>
        <MyTitle variant="h6" component={"h3"} align="center" color="inherit">
          Факты и подробности производства:
        </MyTitle>
        <MyFacts facts={facts} />
      </Box>
      <MyFlexContainer justify="flex-start">
        <LinkButton
          route={E_ROUTES.images}
          id={movieId}
          variant="outlined"
          sx={{
            letterSpacing: "0.8px",
            fontFamily: "Montserrat",
            textTransform: "none",
            fontSize: "1.02em",
          }}
        >
          {" "}
          Изображения{" "}
        </LinkButton>
        <Button
          variant="outlined"
          sx={{
            letterSpacing: "0.8px",
            fontFamily: "Montserrat",
            textTransform: "none",
            fontSize: "1.02em",
          }}
          onClick={() => setIsTrailerModal(true)}
        >
          {" "}
          См. Трейлер{" "}
        </Button>
        <LinkButton
          route={E_ROUTES.reviews}
          id={movieId}
          variant="outlined"
          sx={{
            letterSpacing: "0.8px",
            fontFamily: "Montserrat",
            textTransform: "none",
            fontSize: "1.02em",
          }}
          linkProps={name}
        >
          {" "}
          Отзывы{" "}
        </LinkButton>
      </MyFlexContainer>
      {isTrailerModal && (
        <MyTrailer
          url={videos?.url}
          name={videos?.name}
          sx={{ background: "rgba(0,0,0, .85)", m: "0px" }}
          onClick={() => setIsTrailerModal((p) => !p)}
        />
      )}
    </>
  );
};

