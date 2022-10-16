
<template>
  <div class="app">
    <div class="wrapper">

      <header class="header">
        <the-top class="header__content" />
      </header>

      <main class="main">
        <div class="main__content _container">
          <div class="main__bgn"> </div>

          <PickCash
              class="main__row"
              v-if="response"
              :cashList="cashItems"
              :baseCurrency="baseCurrency"
              :arrNamesCurrency="arrCurrencyNames"
          />

          <div
              class="main__row"
              v-else-if="errMessage"
          >
            <div class="main__preloader">
              <h2>{{ errMessage }}</h2>
            </div>
          </div>

          <div
              class="main__row"
              v-else
          >
            <div class="main__preloader">
              <h2>Загрузка актуальных курсов валют ..</h2>
              <my-preloader />
            </div>
          </div>

        </div>
      </main>

    </div>

  </div>
</template>

<script>
import TheTop from "@/components/TheTop.vue";
import PickCash from "@/components/PickCash.vue";
import axios from "axios";

export default {
  name: 'App',
  components: {
    TheTop,
    PickCash,
  },

  data() {
    return {
      pickedCash: '', // название валюты
      response: '',
      localLang: '',
      baseCurrency: '',
      errMessage: '',
      arrCurrencyNames: [],
      cashItems: [
        { name: 'Рубль', id: "1", picked: false, shortName: "RUB", cost: 1, base: 2, },
      ]
    }
  },

  methods: {
    pickUpCash(cashItem) {
      this.pickedCash = cashItem.name;

      this.cashItems.forEach(element => {
        element.picked = false;
      });
      let indexOfArr = this.cashItems.findIndex(item => item.age === cashItem);
      this.cashItems[indexOfArr].picked = true;
    },

    async loadCashCosts() {
      try {
        // Вывод сообщения в случае отсутствия ответа сервера
        setTimeout(() => {
          if (!this.response) {
            this.errMessage = "Сервер данных по курсам валют недоступен. Попоробуйтие обновить страницу или зайти на сайт поздее";
            throw "ошибка в загрузке данных у переменной response";
          }
        }, 2000);

        // Запрос на сервер
        this.response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
      } catch (err) {
        console.warn('Error', err.message);
      }
    },

    // Находим локальную валюту
    findBaseCash() {
      const language = window.navigator.userLanguage || window.navigator.language;
      this.localLang = language.slice(-2, language.length).toLowerCase();
    },

    createPullOfCash() {
      const mostPopularCurrency = ['USD', 'EUR'];
      const elementResp = this.response.data.Valute;

      // Добавляем базовую локальную валюту в список
      for (const key in elementResp) {
        let lowerKey = key.toLowerCase();
        if (lowerKey.includes(this.localLang)) {
          this.cashItems.push({
            name: elementResp[key].Name,
            id: elementResp[key].ID,
            picked: false,
            shortName: elementResp[key].CharCode,
            cost: elementResp[key].Value,
            base: true,
          });
          this.baseCurrency = elementResp[key].Name;
        }
      }

      // Проверям наличие основных валют в списке
      mostPopularCurrency.forEach(element => {
        let someElement = this.response.data.Valute[element];
        if (
          !this.cashItems.find(function (item) {
            return item.name === element;
          })
        ) this.cashItems.push({
          name: someElement.Name,
          id: someElement.ID,
          picked: false,
          shortName: someElement.CharCode,
          cost: someElement.Value,
          base: false,
        })
      })

      // Создаём массив имён валют списка
      this.cashItems.forEach(item => {
        this.arrCurrencyNames.push(item.name);
      });
      let indexOfBaseCurrencu = this.arrCurrencyNames.findIndex(item => item == this.baseCurrency);
      this.arrCurrencyNames.splice(indexOfBaseCurrencu, 1);
    },
  },
  async mounted() {
    this.findBaseCash();
    await this.loadCashCosts();
    this.createPullOfCash();
  }
};
</script>

<style lang="scss">
#app {}

.wrapper {}

.header {

  // .header__content
  &__content {
    background-color: $fiolet-light;
  }
}

.main {
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: $md2) {
    height: calc(100vh - 50px);
    align-items: flex-start;
    margin-top: 50px;

  }

  // .main__content
  &__content {
    width: 100%;
  }

  // .main__bgn
  &__bgn {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
    top: 3%;
    right: 2%;
    mask-image: url(@/images/cashier-svg.svg);
    mask-size: 300px;
    mask-repeat: no-repeat;
    mask-position: top right;
    background-color: lighten($fiolet-light, 45%);
  }

  // .main__preloader
  &__preloader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      display: block;
      margin-bottom: 40px;
    }

    img {
      max-width: 100px;
    }
  }

  // .main__row
  &__row {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    z-index: 2;

    @media (max-width: $md3) {
      display: block;
    }

    h2 {
      color: $blue;
    }
  }

  // .main__column
  &__column {
    position: relative;
    z-index: 2;

    @media (max-width: $md2) {
      margin-bottom: 30px;
    }
  }

  // .main__pick-cash
  &__pick-cash {}
}
</style>
