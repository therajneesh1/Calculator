 // Define the conversion factors for each unit
    const factors = {
      km: {km: 1, m: 1000, cm: 100000, ft: 3280.84, in: 39370.08},
      m: {km: 0.001, m: 1, cm: 100, ft: 3.28084, in: 39.37008},
      cm: {km: 0.00001, m: 0.01, cm: 1, ft: 0.0328084, in: 0.393701},
      ft: {km: 0.0003048, m: 0.3048, cm: 30.48, ft: 1, in: 12},
      in: {km: 0.0000254, m: 0.0254, cm: 2.54, ft: 0.0833333, in: 1}
    };

    // Define a function to convert the input value based on the selected units
    function convert() {
      // Get the input value and the selected units
      let inputValue = document.getElementById("inputValue").value;
      let fromUnit = document.getElementById("fromUnit").value;
      let toUnit = document.getElementById("toUnit").value;

      // Calculate the conversion result using the conversion factors
      let result = inputValue * factors[fromUnit][toUnit];

      // Display the result in the result area
      document.getElementById("result").innerHTML = result.toFixed(2) + " " + toUnit;
    }