import { createEvent, createStore } from "effector";

import { IMessages, IUser } from "./interfaces";

export const $messages = createStore<IMessages>([
  {
    name: "Таракан",
    message: "Я вам сейчас покажу откуда на Беларусь нападение готовилось",
  },
]);

export const setMessage = createEvent<IUser>();

const reset = createEvent();

$messages
  .on(
    setMessage,
    (defaultMessages, user): IMessages => [...defaultMessages, user],
  )
  .reset(reset);
