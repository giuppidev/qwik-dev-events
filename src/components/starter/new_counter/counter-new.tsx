import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const count = useSignal(0);
  return (
    <>
      <div>{count}</div>
      <button onClick$={() => count.value++}>Count++</button>
    </>
  );
});
