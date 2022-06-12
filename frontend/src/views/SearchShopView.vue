<template>
  <BaseRowForm @submit.prevent="handleSubmit" button-text="Search" :disableButton="v$.$error || v$.$errors.length > 0">
    <BaseInput v-model="state.shopname" placeholder="Shop Name" :hasError="v$.shopname.$error"
      :errors="v$.shopname.$errors" id="shopname" type="text" @blur="v$.shopname.$touch" />
    <BaseDropDown v-model="state.distance" placeholder="Distance" :hasError="v$.distance.$error"
      :errors="v$.distance.$errors" id="distance" :options="options" @blur="v$.distance.$touch" />
    <BaseInput v-model="state.pricelow" placeholder="Price Low" :hasError="v$.pricelow.$error"
      :errors="v$.pricelow.$errors" id="pricelow" type="text" @blur="v$.pricelow.$touch" />
    <BaseInput v-model="state.pricehigh" placeholder="Price High" :hasError="v$.pricehigh.$error"
      :errors="v$.pricehigh.$errors" id="pricehigh" type="text" @blur="v$.pricehigh.$touch" />
    <BaseInput v-model="state.category" placeholder="Category" :hasError="v$.category.$error"
      :errors="v$.category.$errors" id="category" type="text" @blur="v$.category.$touch" />
    <BaseInput v-model="state.meal" placeholder="Meal" :hasError="v$.meal.$error" :errors="v$.meal.$errors" id="meal"
      type="text" @blur="v$.meal.$touch" />
  </BaseRowForm>

  <b-table :field="field" :items="shops" sort-icon-right></b-table>
</template>

<script setup>
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { numeric, alphaNum, minValue } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import axios from "axios";
import BaseInput from "@/components/BaseInput.vue";
import BaseRowForm from "@/components/BaseRowForm.vue";
import BaseDropDown from "@/components/BaseDropDown.vue";
import { useUserStore } from "@/stores/user";

const router = useRouter();

const options = ['near', 'middle', 'far'];

const state = reactive({
  shopname: '',
  distance: '',
  pricelow: '',
  pricehigh: '',
  category: '',
  meal: '',
  page: 1,
});

const field = [
  { key: 'index', sortable: false },
  { key: 'shop_name', sortable: true },
  { key: 'distance', sortable: true },
  { key: 'category', sortable: true },
  { key: 'action', sortable: false },
]

const shops = reactive([
  { index: 1, shop_name: 'shop1', distance: 345, category: 'category1', action: 'action1' },
  { index: 2, shop_name: 'shop2', distance: 3520, category: 'category2', action: 'action2' },
  { index: 3, shop_name: 'shop3', distance: 1234, category: 'category3', action: 'action3' },
]);

const rules = computed(() => ({
  shopname: {
    alphaNum,
  },
  distance: {},
  pricelow: {
    numeric,
    minValue: minValue(0),
  },
  pricehigh: {
    numeric,
    minValue: minValue(Math.max(0, state.pricelow))
  },
  category: {},
  meal: {},
}));

const v$ = useVuelidate(rules, state);

const store = useUserStore();

const handleSubmit = async () => {
  v$.value.$touch();

  if (v$.value.$error) {
    return;
  }

  try {
    const response = await axios.post('/getshop', {
      ...state,
      longitude: store.longitude,
      latitude: store.latitude,
      order: '',
    });
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped lang="scss">
</style>