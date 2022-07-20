<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px">

    {{cards}}
  </q-page>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useFind } from "feathers-pinia";

import useCards from "stores/services/cards";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const cardsStore = useCards();

    const cardsParams = computed(() => {
      return {
        query: {}
      };
    });

    const cardsData = useFind({ model: cardsStore.Model, params: cardsParams });
    const cards = cardsData.items || [];

    return {
      cards,
    };
  }
});
</script>
