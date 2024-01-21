
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header></header>
      <main>
        {/* sidebar */}
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default Layout;
