$(function() {

  $("#cty").change(function() {
    let el = $(this);
    console.log(el.val());
    switch (el.val()) {
      case "ES":
        addCarrier(el.val());
        break;
      case "FR":
        addCarrier(el.val());
        break;
      case "SK":
        addCarrier(el.val());
        break;
      case "CH":
        addCarrier(el.val());
        break;
      case "UK":
        addCarrier(el.val());
        break;
      default:
        addCarrier("");
        break;
    }
  });

  function addCarrier(country) {
    $("#cari").html("");
    $("#cari").append(`<option value="">Carrier</option>`);
    let data = {
      "ES": ["Orange Espagne S.A. Unipersonal",
        "Orange España Virtual S.L. Unipersonal",
        "Vodafone España S.A. Unipersonal",
        "Vodafone Enabler España S.L.",
        "Lycamobile S.L. Unipersonal",
        "Telefónica Móviles España S.A. Unipersonal",
        "Xfera Móviles S.A. Unipersonal",
        "Digi Spain Telecom S.L.",
        "You Mobile Telecom Spain S.L. Unipersonal",
        "Pepemobile S.L.",
        "Euskaltel S.A.",
        "Procono S.A.",
        "Alai Operador de Telecomunicaciones S.L.",
        "Suma Operador de Telecomunicaciones S.L. Unipersonal"
      ],
      "FR": ["Orange",
        "Free mobile",
        "Bouygues Telecom",
        "Bouygues Telecom Business - Distribution",
        "Lycamobile SARL",
        "Vectone mobile",
        "Société française du radiotéléphone",
        "La poste",
        "Afone participations",
        "e*Message Wireless Information Services France",
        "Lebara France Limited",
        "VA Solutions",
        "CRH",
        "Sewan",
        "Prixtel",
        "Mobiquithings",
        "Onoff telecom"
      ],
      "SK": ["Orange Slovensko  a.s.",
        "O2 Slovakia  s.r.o.",
        "Slovak Telekom  a.s.",
        "Železnice Slovenskej republiky GR",
        "Vonage Business Limited",
        "SWAN (mob)a.s."
      ],
      "CH": ["Swisscom (Schweiz) AG",
        "Sunrise Communications AG",
        "Salt Mobile SA",
        "Lycamobile AG",
      ],
      "UK": ["Lycamobile UK Limited",
        "Vodafone Limited",
        "Hutchison 3G UK Ltd",
        "EE Limited (Orange)",
        "EE Limited ( TM)",
        "Telefonica UK Limited",
      ],
    };

    for (let i = 0; i < data[country].length; i++) {
      $("#cari").append(`<option value="${data[country][i]}">${data[country][i]}</option>`);
    }


  }



})