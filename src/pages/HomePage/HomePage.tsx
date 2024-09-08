import React, { Fragment } from "react";
import { MyTitle } from "../../components/MyTitle";
import { Box } from "@mui/material";

const pStyles = {
  p: "0.5rem",
  textIndent: "0.5rem",
  letterSpacing: "0.5px",
  textAlign: "justify",
  lineHeight: "1.5em",
  "&::first-letter": { fontSize: "1.3em", color: "#c62828" },
  "&:last-child": { fontVariant: "small-caps", fontSize: "1.18em" },
};

export const HomePage = () => {
  return (
    <Fragment>
      <MyTitle variant="h4">ГЛАВНАЯ</MyTitle>
      <Box component={"section"} sx={{ p: "1rem" }}>
        <Box component="p" sx={pStyles}>
          Добро пожаловать на наш уникальный сайт, посвященный миру кино и
          блестящим актерам! Здесь, среди ярких постеров и захватывающих
          трейлеров, вы найдете всё, что нужно для истинного ценителя искусства
          седьмого экрана. Мы предлагаем широкий выбор фильмов — от классики до
          современных шедевров, от драм до комедий, от триллеров до анимации.
          Каждый пользователь сможет легко ориентироваться в нашем обширном
          каталоге, где скрыты настоящие киношедевры.
        </Box>
        <Box component="p" sx={pStyles}>
          На нашем сайте также представлено множество увлекательных биографий
          известных актеров и режиссеров, которые вдохнули жизнь в незабываемые
          образы. Узнайте о их карьере. Мы обновляем нашу бибилиотеку мира кино,
          а также рецензии и рекомендации фильмов, чтобы помочь вам выбрать
          идеальное кино для вечернего просмотра.
        </Box>
        <Box component="p" sx={pStyles}>
          Присоединяйтесь к нашему сообществу киноманов, делитесь впечатлениями,
          открывайте новые горизонты и получайте удовольствие от волшебства
          кино! Откройте для себя бесконечные возможности на нашем сайте — вашем
          личном путеводителе в интернете.
        </Box>
      </Box>
    </Fragment>
  );
};
