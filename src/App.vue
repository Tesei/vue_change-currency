
<template>
  <div class="app">

    <div class="wrapper">

      <header class="header">
        <div class="header__content">
          <topAbout />
        </div>
      </header>

      <main class="main" :class="{ main__bgn: !pickedCash }">
        <div class="main__content _container">

          <transition name="fade" mode="out-in">
            <div class="main__row" v-if="pickedCash">
              <div class="main__column">
                <div class="main__pick-cash">
                  <PickCash :cashList="cashItems" @eventPickCash="pickUpCash" />
                </div>
              </div>
              <div class="main__column">
                <InsertForm :nameCurrency="pickedCash" :costOfCurrency="this.cashItems[pickedCashId].cost" />
              </div>
            </div>

            <div class="main__row" v-else>
              <div class="main__column">
                <div class="main__pick-cash">
                  <PickCash :cashList="cashItems" @eventPickCash="pickUpCash" />
                </div>
              </div>
            </div>
          </transition>

        </div>
      </main>

    </div>

  </div>
</template>

<script>
import topAbout from "@/components/topAbout.vue";
import PickCash from "@/components/PickCash.vue";
import InsertForm from "@/components/InsertForm.vue";
import axios from "axios";

export default {
  components: {
    topAbout,
    PickCash,
    InsertForm
  },

  data() {
    return {
      pickedCash: '', // название валюты
      pickedCashId: '',
      response: '',
      cashItems: [
        { name: "Доллары", id: 0, picked: false, shortName: "USD", symbol: '$', cost: '' },
        { name: "Евро", id: 1, picked: false, shortName: "EUR", symbol: '€', cost: '' },
        { name: "Юани", id: 2, picked: false, shortName: "CNY", symbol: '元', cost: '' },
      ]
    }
  },
  methods: {
    pickUpCash(cashItem) {
      this.pickedCash = cashItem.symbol;
      this.pickedCashId = cashItem.id;
      this.cashItems.forEach(element => {
        element.picked = false;
      });
      this.cashItems[cashItem.id].picked = true;
    },

    async loadCashCosts() {
      try {
        this.response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js', {
          params: {}
        });
        this.cashItems.forEach(element => {
          element.cost = this.response.data.Valute[element.shortName].Value;
        });
      } catch (e) {
        console.log(e);
      }
    },

    findBaseCash() {
      const language = window.navigator.userLanguage || window.navigator.language;
      console.log(language);
    }

  },
  mounted() {
    this.loadCashCosts();
    this.findBaseCash();
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
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;

}

h3 {
  font-size: 2.5rem;
  line-height: 1.2;
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
