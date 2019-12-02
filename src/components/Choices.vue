<template>
  <select
    class="form-control"
    data-trigger
    name="choices-multiple-default"
    id="choices-multiple-default"
    multiple
  >
    <option placeholder>Seçim yapınız</option>
    <option v-for="option in options" :value="option.id" :key="option.id">
      {{
      option.name
      }}
    </option>
  </select>
</template>

<script>
import Choices from "choices.js";
var choicesSelect;
export default {
  props: {
    options: { Type: Array, default: [] },
    maxItem: { Type: Number, default: null },
    value: { Type: Array, default: () => [] }
  },
  watch: {
    value() {
      //sayfa ilk açıldığında choices'in dbden gelen değeri varsa dolmasını sağlar(setChoiceByValue ile gelen değerler set edilir)
      if (this.value.length > 0) {
        this.value.forEach(element => {
          choicesSelect.setChoiceByValue(`${element}`);
        });
      }
    }
  },
  mounted() {
    var that = this;
    this.$nextTick(() => {
      choicesSelect = new Choices("#choices-multiple-default", {
        allowSearch: true,
        removeItemButton: true,
        //   duplicateItemsAllowed: true ,// seçeneklerde 2 tane aynı değer varsa ikisinide seçebilir mi
        maxItemCount: this.maxItem, // max kaç tane seçim yapılabilir
        maxItemText: maxItemCount => {
          return `Sadece ${maxItemCount} tane seçim yapabilirsiniz`;
        },
        noResultsText: "Sonuç bulunamadı",
        noChoicesText: "", //Seçilecek eleman kalmadığında yazılacak text
        itemSelectText: "Seçmek için basınız"
      });

      choicesSelect.passedElement.element.addEventListener(
        "addItem",
        function() {
          //her seçim yapıldığında çalışır
          console.log(choicesSelect.getValue(true));
          that.$emit("input", choicesSelect.getValue(true));
          // console.log(event.detail.value);
        }
      );
      choicesSelect.passedElement.element.addEventListener(
        "removeItem",
        function() {
          //her seçilen veri slindiğinde çalışır
          console.log(choicesSelect.getValue(true));
          that.$emit("input", choicesSelect.getValue(true));
          // console.log(event.detail.value);
        }
      );
    });
  }
};
</script>

<style></style>
