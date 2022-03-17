import styles from "./Styles.module.scss";
import Title from "./Components/Title/Title";
import Header from "./Components/Header/Header";
import Group from "./Components/Group/Group";
import BreadCrumbs from "./Components/BreadCrumbs/BreadCrumbs";

function App() {
    return (
        <div className={styles.App}>
            <Header />
            <div className={styles.container}>
                <BreadCrumbs />
                <Title />
                <Group />
            </div>
        </div>
    );
}

export default App;
