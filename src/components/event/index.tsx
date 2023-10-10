import { component$ } from "@builder.io/qwik";
import { EventItem } from "~/types";
import styles from "./event.module.css";

interface EventProps {
  event: EventItem;
}

export const Event = component$<EventProps>(({ event }) => {
  const date = new Intl.DateTimeFormat("en-GB").format(
    new Date(event.startDate)
  );
  return (
    <div class={styles.eventContainer}>
      <div class={styles.event}>
        <div>{event.name}</div>
        <div class={styles.info}>
          {event.city} - {date}
        </div>
      </div>
    </div>
  );
});
