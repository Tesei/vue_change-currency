
<template>
  <div class="app">

    <div class="wrapper">

      <header class="header">
        <div class="header__content">
          <topAbout />
        </div>
      </header>

      <main class="main main__bgn">
        <div class="main__content _container">

          <div class="main__row">
            <PickCash :cashList="cashItems" :baseCurrency="baseCurrency" :arrNamesCurrency="arrCurrencyNames" />
          </div>

        </div>
      </main>

    </div>

  </div>
</template>

<script>
import topAbout from "@/components/topAbout.vue";
import PickCash from "@/components/PickCash.vue";
// import InsertForm from "@/components/InsertForm.vue";
import axios from "axios";

export default {
  components: {
    topAbout,
    PickCash,
    // InsertForm
  },

  data() {
    return {
      pickedCash: '', // название валюты
      pickedCashId: '',
      response: '',
      localLang: '',
      baseCurrency: '',
      arrCurrencyNames: [],
      cashItems: [
        { name: 'Рубль', id: "1", picked: false, shortName: "RUB", cost: 1, base: 2, },
      ]
    }
  },
  methods: {
    pickUpCash(cashItem) {
      this.pickedCashId = cashItem.id;
      this.pickedCash = cashItem.name;

      this.cashItems.forEach(element => {
        element.picked = false;
      });
      let indexOfArr = this.cashItems.findIndex(item => item.age === cashItem);
      this.cashItems[indexOfArr].picked = true;
    },

    async loadCashCosts() {
      try {
        this.response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js', {
          params: {}
        });
        // console.log(elementResp);
      } catch (e) {
        console.log(e);
      }
    },

    // Находилокальную валюту
    findBaseCash() {
      const language = window.navigator.userLanguage || window.navigator.language;
      this.localLang = language.slice(-2, language.length).toLowerCase();
    },

    createPullOfCash() {
      setTimeout(() => {
        const mostPopularCurrency = ['USD', 'EUR'];
        const elementResp = this.response.data.Valute;
        // console.log(elementResp);

        // Добавляем базовую локальную валюту в список
        for (const key in this.response.data.Valute) {
          let lowerKey = key.toLowerCase();
          if (lowerKey.includes(this.localLang)) {
            this.cashItems.push({
              name: elementResp[key].Name, id: elementResp[key].ID, picked: false, shortName: elementResp[key].CharCode, cost: elementResp[key].Value, base: true,
            });
            this.baseCurrency = elementResp[key].Name;
          }
        };

        // Проверям наличие основных валют в списке
        mostPopularCurrency.forEach(element => {
          let someElement = this.response.data.Valute[element];
          if (
            !this.cashItems.find(function (item) {
              return item.name === element;
            })
          ) this.cashItems.push({
            name: someElement.Name, id: someElement.ID, picked: false, shortName: someElement.CharCode, cost: someElement.Value, base: false,
          })
        })

        // Создаём массив имён валют списка
        this.cashItems.forEach(item => {
          this.arrCurrencyNames.push(item.name);
        });
        let indexOfBaseCurrencu = this.arrCurrencyNames.findIndex((item, index) => item == this.baseCurrency);
        this.arrCurrencyNames.splice(indexOfBaseCurrencu, 1);
      }, 0)
    },


  },
  mounted() {
    this.findBaseCash();
    this.loadCashCosts();
    this.createPullOfCash();
  }
};
</script>

<style lang="scss">
@import '@/styles/index.scss';

#app {}

* {}

.app {}

.wrapper {}

h1 {
  font-size: 3rem;
  font-weight: 600;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;

}

h3 {
  font-size: 2rem;
  line-height: 1.2;
  color: $accent;
}

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

  // .main__bgn
  &__bgn {
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: -30%;
      right: -40%;
      mask-image: url(../src/images/cashier-svg.svg);
      mask-size: 300px;
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: lighten($fiolet-light, 45%);
      pointer-events: none;
    }
  }

  // .main__content
  &__content {
    width: 100%;
  }

  // .main__row
  &__row {
    display: flex;
    justify-content: space-evenly;

    @media (max-width: $md3) {
      display: block;
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.fade-enter-from {}

.fade-enter-to {}
</style>
