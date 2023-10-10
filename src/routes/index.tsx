import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import styles from "./events/events.module.css";
import { EventItem, Metadata } from "~/types";
import { Event } from "~/components/event";

type ORDER_BY = "newestFirst" | "startDate";

const API_URL = "https://dev.events/api/events/search";

export default component$(() => {
  const events = useSignal<EventItem[]>([]);
  const metadata = useSignal<Metadata>();

  const orderBy = useSignal<ORDER_BY>("startDate");
  const start = useSignal<number>(0);

  useTask$(async ({ track }) => {
    const apiUrl = track(
      () => `${API_URL}?sorting=${orderBy.value}&x=true&start=${start.value}`
    );
    const res = await fetch(apiUrl);
    const data = await res.json();
    events.value = !!events.value ? [...events.value, ...data[0]] : data[0];
    metadata.value = data[1];
  });

  return (
    <>
      <div class="container container-center">
        <h1>
          <span class="highlight">Events</span> List
        </h1>
        <select
          name="orderBy"
          id="order-by"
          value={orderBy.value}
          onChange$={(e) => {
            start.value = 0;
            events.value = [];
            orderBy.value = e.target.value as ORDER_BY;
          }}
        >
          <option value="startDate">Start date</option>
          <option value="newestFirst">Newest first</option>
        </select>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        {events.value.length === 0 ? (
          <span class={styles.empty}>No items found</span>
        ) : (
          <div class={styles.list}>
            {events.value.map((event, index) => (
              <Event key={`items-${index}`} event={event} />
            ))}

            <div>
              <button onClick$={() => start.value++} class={styles.button}>
                Load more
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik DevEvents List",
};
