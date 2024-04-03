import RootRoutes from '@/routes/routes.js'
import { useEffect } from 'react';
import autofit from 'autofit.js';

function App() {
  // useEffect(() => {
  //   autofit.init({
  //     dh: 1044,
  //     dw: 3480,
  //     el: '#root',
  //     resize: true,
  //   })
  // }, [])
  return (
    RootRoutes()
  )
}

export default App
