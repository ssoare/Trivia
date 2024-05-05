import Cards from "./components/cards";
import Header from "./components/header";

export default function App() {
  return(
    <>
      <Header />
      <main className="mt-12">
        <Cards />
      </main>
    </>
  )
}