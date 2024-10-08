// components:
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  styled,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import { MyLabel } from "../MyLabel";
import { LinkButton } from "../LinkButton";
import { colors } from "@mui/material";
// types:
import { T_MY_MOVIE_CARD, E_ROUTES } from "../../types/types";

const MyCard = styled(Card)(() => ({
  width: "27%",
  height: 470,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  position: "relative",
  background: "inherit",
  color: "inherit",
}));

const MyCardMedia = styled(CardMedia)(() => ({
  height: "59%",
  objectFit: "cover",
  filter: "grayscale(50%)",
  "&:hover": { filter: "none" },
}));

const MyMoviesCardChipStyles = { border: "none", color: 'var(--app-default-color)' }

export const MyMovieCard = ({
  id,
  name,
  enName,
  year,  
  shortDescription,
  ageRating,
  poster,
  movieLength,
  ratingKp,
  ratingImdb,
  top250,
}: T_MY_MOVIE_CARD) => {
  return (
    <MyCard component={"article"}>
      <MyLabel
        sx={{
          top: "2%",
          left: "2%",
          background: "green",
          color: "white",
          padding: "0.25rem",
        }}
      >
        {" "}
        {ageRating}+{" "}
      </MyLabel>
      <MyLabel
        sx={{ top: "2%", right: "2%", backgroundColor: "rgba(0,0,0, .12)" }}
      >
        {" "}
        {movieLength} мин.
      </MyLabel>
      <MyLabel
        sx={{
          top: "10%",
          left: "2%",
          backgroundColor: "rgba(0,0,0, .12)",
          fontFamily: 'SofadiOne',
          transform: 'rotateZ(-6deg)',
          fontWeight: 400
        }}
      >
        {" "}
        {top250 ? `ТОП ${top250}` : null}
      </MyLabel>
      <MyCardMedia
        // image={poster}
        data-src={poster}
        title={enName}
        component={"img"}
        loading="lazy"
        className='cardImage'
      />
      <CardContent sx={{ padding: "0.5rem" }}>
        <Typography gutterBottom variant="subtitle2" component="h3">
          {name}
        </Typography>
        {/* <Divider/> */}
        <Typography
          variant="body2"
          sx={{ color: "secondary", textAlign: "justify" }}
          component="p"
        >
          {shortDescription} ( <strong> {year} г. </strong>)
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-around" }}>
        <LinkButton
          id={`${id}`}
          route={E_ROUTES.movies}
          sx={{ border: "none", fontSize: "9px" }}
        >
          {" "}
          подробнее{" "}
        </LinkButton>
        <Chip
          label={`IMDB ${ratingImdb}`}
          icon={<GradeIcon color="warning" />}
          variant="outlined"
          sx={MyMoviesCardChipStyles}
        />
        <Chip
          label={`KP ${ratingKp}`}
          icon={<GradeIcon color="warning" />}
          variant="outlined"
          sx={MyMoviesCardChipStyles}
        />
      </CardActions>
    </MyCard>
  );
};
