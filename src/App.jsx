import { useState } from 'react'



function App() {
  return (
    <BrowserRouter>
      {/* We can add components before and after <routes /> */}
      {/* They are shown for all pages */}
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/*" element={<MissingPage />} />
        </Routes>
      </main>
      
    </BrowserRouter>
  );
}

export default App;
