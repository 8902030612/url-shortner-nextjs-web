import styles from "@/app/styles/index.module.scss";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import UrlForm from "@/components/urlForm";

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div>
          <UrlForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
