import { Colors } from "../../../constants/Colors";

function ViewDetailUser() {

    return (
        <div style={styles.container}>
            <main style={styles.main}>
                
            </main>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    background: Colors.background,
  },
  main: {
    flex: 1,
    padding: "24px",
  },
};

export default ViewDetailUser;