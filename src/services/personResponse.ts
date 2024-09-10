// types
import { I_PERSON_FULL, I_PERSON_MOVIES } from "../types/types";
// consts:
import FAKE from "../assets/await.jpg";

export const personResponse = (
  docs: unknown[],
  total: number,
  limit: number,
  page: number,
  pages: number
) => {
  const personList: I_PERSON_FULL[] = docs?.map((person: any) => ({
    id: person?.id || 0,
    name: person?.name || "Нет данных",
    enName: person?.enName || "Нет данных",
    photo: person?.photo || FAKE,
    sex: person?.sex || "Нет данных",
    growth: person?.growth || 0,
    birthday: person?.birthday || "Нет данных",
    death: person?.death || "",
    age: person?.age || 0,
    birthPlace: person?.birthPlace?.length
      ? person?.birthPlace[0]?.value
      : "Нет данных",
    deathPlace: person?.deathPlace?.length
      ? person?.deathPlace[0]?.value
      : "Нет данных",
    profession: person?.profession?.length
      ? person?.profession[0]?.value
      : "Нет данных",
    countAwards: person?.countAwards || 0,
    facts: person?.facts?.length
      ? person?.facts?.map((fact: { value: string }) => fact.value)
      : [],
    movies: person?.movies?.length
      ? person?.movies?.map(
          ({
            id,
            name,
            alternativeName,
            rating,
            general,
            description,
            enProfession,
          }: I_PERSON_MOVIES) => ({
            id: id || 0,
            name: name || "Нет данных",
            alternativeName: alternativeName || "Нет данных",
            rating: rating || 0,
            general: general ? "Главная" : "второй план",
            description: description || "Нет данных",
            enProfession: enProfession || "Нет данных",
          })
        )
      : [],
  }));

  return {
    data: personList,
    total,
    limit,
    page,
    pages,
  };
};
