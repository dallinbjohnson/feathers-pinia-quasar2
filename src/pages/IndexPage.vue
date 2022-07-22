<template>
  <q-page>
    <img alt="Quasar logo"
         src="~assets/quasar-logo-vertical.svg"
         style="width: 200px; height: 200px">

    <ol>
      <li v-for="(card, index) in cards" :key="index">{{ card.name }}</li>
    </ol>
    <q-pagination :model-value="currentPage"
                  @update:model-value="toPage"
                  :max="pageCount"
                  :max-pages="6"
                  direction-links
                  boundary-links></q-pagination>

    vuex cards:
    <ol>
      <li v-for="(card, index) in vuexCards" :key="index">{{ card.name }}</li>
    </ol>
  </q-page>
</template>

<script>
  import { defineComponent, computed, reactive, watch, ref } from 'vue';
  import { useFind, usePagination } from 'feathers-pinia';
  import { useFind as useFindVuex, models } from '@feathersjs/vuex';

  import useCards from 'stores/services/cards';

  export default defineComponent({
    name: 'IndexPage',
    setup() {
      const cardsStore = useCards();

      const pagination = reactive({ $limit: 5, $skip: 0 });

      const cardsParams = computed(() => {
        return {
          query: {
            ...pagination
          },
          qid: 'cards',
          paginate: true
        };
      });

      const { items: cards, latestQuery, ...meta } = useFind({
        model: cardsStore.Model,
        params: cardsParams
      });
      const {
        // next,
        // prev,
        // canNext,
        // canPrev,
        currentPage,
        // itemsCount,
        pageCount,
        toPage
        // toStart,
        // toEnd
      } = usePagination(pagination, latestQuery);


      const { Cards } = models.api;

      const todosParams = computed(() => {
        return {
          query: {
            ...pagination
          },
        };
      });

      const { latestQuery: vuexLatestQuery, ...vuexMeta } = useFindVuex({
        model: Cards,
        params: todosParams
      });

      let vuexCards = ref([]);

      watch(vuexLatestQuery, () => {
        vuexCards.value = vuexLatestQuery?.value?.response?.data || [];
      }, {immediate: true, deep: true});

      return {
        vuexMeta,
        vuexCards,
        meta,
        cardsParams,
        pagination,
        latestQuery,
        cards,
        currentPage,
        pageCount,
        toPage
      };
    }
  });
</script>
