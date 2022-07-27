$(document).ready(function () {
  let countries = [];
  $.ajax({
    url: "https://restcountries.com/v3.1/all",
    type: "GET",
    dataType: "json",
    success: function (data) {
      countries = data;
      createCountriesCard(data);
    },
  });

  function createCountriesCard(data) {
    $(".main-container").empty();
    for (let i = 0; i < data.length; i++) {
      $(".main-container")
        .append(` <div class="card" style="border-radius: 5px">
              <img src="${data[i].flags.png}" alt="" />
          
              <div class="details-container">
                <p class="name heading">${data[i].name.common}</p>
                <p class="detail">Population : <span>${data[
                  i
                ].population.toLocaleString()}</span>
                <p class="detail">Region : <span>${data[i].region}</span></p>
                <p class="detail">Capital : <span>${data[i].capital}</span></p>
                <!-- Anchor tag with router link -->
          
                </div>
                </div>`);
    }
  }
  function SortByName(a, b) {
    var aName = a.name.common.toLowerCase();
    var bName = b.name.common.toLowerCase();
    return aName < bName ? -1 : aName > bName ? 1 : 0;
  }

  $(".search").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    $(".card").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  $(".region").on("change", function () {
    const value = $(this).val();
    if (value.toLowerCase(0) === "all") {
      $.ajax({
        url: "https://restcountries.com/v3.1/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
          countries = data;
          data.sort(SortByName);
          createCountriesCard(data);
        },
      });
    } else {
      $.ajax({
        url: "https://restcountries.com/v3.1/region/" + value,
        type: "GET",
        dataType: "json",
        success: function (data) {
          countries = data;
          createCountriesCard(data);
        },
      });
    }
  });

  $(".sort").on("change", function () {
    const value = $(this).val();
    console.log(countries);
    if (value !== "None") {
      if (value === "name") {
        countries.sort(SortByName);
      } else if (value === "population") {
        countries.sort(function (a, b) {
          return b.population - a.population;
        });
      } else if (value === "region") {
        countries.sort(function (a, b) {
          return b.region.toLowerCase() < a.region.toLowerCase() ? 1 : -1;
        });
      }

      createCountriesCard(countries);
    }
  });
});
