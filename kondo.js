window.onload = () => {
  // document.write('Hello from Kondo content script');
  console.log('The content type is, we think: ' + document.contentType);
  if (document.URL.endsWith('.js')) {
    console.log('Seems like a JS file');
    document.write(`
    <html>
    <head><title>A Kondo Example</title>
    </head>
    <body>
    <script>
    alert(4);
    </script>
    </body>
    </html>
    `);
    // document.write('Kondo processed this file');
    window.charlie = 47;
    alert(window.charlie);
  } else {
    console.log("Doesn't seem like a kondo file");
  }
};
