<template>
  <select
    class="form-control"
    data-trigger
    name="choices-multiple-default"
    id="choices-multiple-default"
    multiple
  >
    <!-- <option placeholder>Seçim yapınız</option>
    <option v-for="option in options" :value="option.id" :key="option.id">
      {{
      option.name
      }}
    </option>-->
  </select>
</template>

<script>
import Choices from "choices.js";
import ApiService from "@/services/api.service";
var choicesSelect;
export default {
  props: {
    // options: { Type: Array, default: [] },
    maxItem: { Type: Number, default: null },
    value: { Type: Array, default: () => [] }
  },
  // watch: {
  //   value() {
  //     //sayfa ilk açıldığında choices'in dbden gelen değeri varsa dolmasını sağlar(setChoiceByValue ile gelen değerler set edilir)
  //     if (this.maxItem > 1 || this.maxItem == null) {
  //       //maxitem verilmezse default multi selectize olur.Max item 1den büyük verilirsede multi olur
  //       if (this.value.length > 1) {
  //         this.value.forEach(element => {
  //           choicesSelect.setChoiceByValue(`${element}`);
  //         });
  //       }
  //     } else if (this.maxItem == 1) {
  //       debugger;
  //       console.log(this.options);
  //       console.log(this.maxItem);
  //       //selectize multi değilse tek değer gelir

  //       choicesSelect.setChoiceByValue(`${this.value}`);
  //     }
  //   }
  // },
  created() {
    debugger;
    console.log(this.options);
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
      })
        .setChoices(function() {
          return ApiService.get("/api/Values/GetAnnualTypes").then(res => {
            debugger;
            return res.data.map(function(d) {
              debugger;
              return { value: d.id, label: d.text };
            });
          });
        })
        .then(function(instance) {
          debugger;
          instance.setChoiceByValue("1");
          instance.passedElement.element.addEventListener(
            "addItem",
            function() {
              //her seçim yapıldığında çalışır
              console.log(choicesSelect.getValue(true));
              that.$emit("input", choicesSelect.getValue(true));
              // console.log(event.detail.value);
            }
          );
          instance.passedElement.element.addEventListener(
            "removeItem",
            function() {
              //her seçilen veri slindiğinde çalışır
              console.log(choicesSelect.getValue(true));
              that.$emit("input", choicesSelect.getValue(true));
              // console.log(event.detail.value);
            }
          );
        });
      debugger;
    });
  }
};
</script>

<style></style>


