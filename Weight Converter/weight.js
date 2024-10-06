 // Define the conversion factors for each unit
    const factors = {
      mg: 1e-6,
      g: 1e-3,
      cg: 1e-5,
      dg: 1e-4,
      dag: 1e-2,
      hg: 1e-1,
      kg: 1,
      t: 1e3,
      mt: 1e6,
      lb: 0.453592
    };

    // Get the elements from the document
    const input = document.getElementById("input");
    const inputUnit = document.getElementById("inputUnit");
    const outputUnit = document.getElementById("outputUnit");
    const result = document.getElementById("result");

    // Define a function to convert the input value to the output unit
    function convert() {
      // Get the input value and units
      let inputValue = parseFloat(input.value);
      let inputFactor = factors[inputUnit.value];
      let outputFactor = factors[outputUnit.value];

      // Calculate the output value
      let outputValue = inputValue * inputFactor / outputFactor;

      // Display the output value
      result.textContent = outputValue.toFixed(5);
    }

    // Add event listeners to the elements to trigger the conversion
    input.addEventListener("input", convert);
    inputUnit.addEventListener("change", convert);
    outputUnit.addEventListener("change", convert);

    // Call the conversion function initially
    convert();
